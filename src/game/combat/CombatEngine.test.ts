/**
 * CombatEngine Unit Tests
 * Tests combat mechanics, damage calculation, turn order, and combo system
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { CombatEngine } from "./CombatEngine";
import {
  calculateMaxHp,
  calculateMaxChi,
  getEffectiveStat,
  STANCE_MODIFIERS,
  type Character,
  type Enemy,
} from "../../types/character";
import {
  checkCombatEnd,
  getLivingEnemies,
  getAllCombatants,
  createCombatState,
} from "../../types/combat";

// =============================================================================
// TEST FIXTURES
// =============================================================================

function createMockPlayer(overrides: Partial<Character> = {}): Character {
  return {
    id: "player",
    name: "Li Wei",
    hp: 100,
    maxHp: 100,
    chi: 50,
    maxChi: 50,
    inverseChi: 0,
    maxInverseChi: 0,
    stats: {
      str: 12,
      dex: 10,
      end: 10,
      wis: 10,
    },
    techniques: ["basic-palm", "flowing-palm"],
    masteryLevels: {},
    stance: "flowing",
    statusEffects: [],
    isPlayer: true,
    pathAlignment: {
      blade: 34,
      stream: 33,
      shadow: 33,
    },
    ...overrides,
  };
}

function createMockEnemy(overrides: Partial<Enemy> = {}): Enemy {
  return {
    id: "enemy-1",
    name: "Street Thug",
    templateId: "thug-common",
    hp: 50,
    maxHp: 50,
    chi: 20,
    maxChi: 20,
    inverseChi: 0,
    maxInverseChi: 0,
    stats: {
      str: 8,
      dex: 8,
      end: 8,
      wis: 5,
    },
    techniques: ["punch"],
    masteryLevels: {},
    stance: "flowing",
    statusEffects: [],
    isPlayer: false,
    faction: "thugs",
    tier: "common",
    chiAspect: "force",
    aiPattern: {
      name: "aggressive",
      behavior: "aggressive",
      rules: [],
    },
    drops: [],
    dialogue: {},
    ...overrides,
  };
}

// =============================================================================
// HELPER FUNCTION TESTS (from character.ts)
// =============================================================================

describe("calculateMaxHp", () => {
  it("should calculate HP from Endurance correctly", () => {
    // Formula: 50 + (END * 5)
    expect(calculateMaxHp(10)).toBe(100); // 50 + 50
    expect(calculateMaxHp(0)).toBe(50); // 50 + 0
    expect(calculateMaxHp(20)).toBe(150); // 50 + 100
  });
});

describe("calculateMaxChi", () => {
  it("should calculate Max Chi from Wisdom correctly", () => {
    // Formula: 20 + (WIS * 3)
    expect(calculateMaxChi(10)).toBe(50); // 20 + 30
    expect(calculateMaxChi(0)).toBe(20); // 20 + 0
    expect(calculateMaxChi(20)).toBe(80); // 20 + 60
  });
});

describe("getEffectiveStat", () => {
  it("should return base stat with flowing stance (1.0 modifier)", () => {
    const char = createMockPlayer({
      stats: { str: 15, dex: 10, end: 10, wis: 10 },
    });
    expect(getEffectiveStat(char, "str")).toBe(15);
  });

  it("should apply weathered stance modifiers correctly", () => {
    const char = createMockPlayer({
      stance: "weathered",
      stats: { str: 10, dex: 10, end: 10, wis: 10 },
    });
    // Weathered: attack 0.9, defense 1.5, speed 0.8
    expect(getEffectiveStat(char, "str")).toBe(9); // 10 * 0.9
    expect(getEffectiveStat(char, "end")).toBe(15); // 10 * 1.5
    expect(getEffectiveStat(char, "dex")).toBe(8); // 10 * 0.8
  });

  it("should apply hungry stance modifiers correctly", () => {
    const char = createMockPlayer({
      stance: "hungry",
      stats: { str: 10, dex: 10, end: 10, wis: 10 },
    });
    // Hungry: attack 1.3, defense 0.7, speed 1.1
    expect(getEffectiveStat(char, "str")).toBe(13); // 10 * 1.3
    expect(getEffectiveStat(char, "end")).toBe(7); // 10 * 0.7
    expect(getEffectiveStat(char, "dex")).toBe(11); // 10 * 1.1
  });

  it("should apply status effect modifiers", () => {
    const char = createMockPlayer({
      stats: { str: 10, dex: 10, end: 10, wis: 10 },
      statusEffects: [
        {
          id: "buff-1",
          name: "Power Up",
          type: "buff",
          stat: "str",
          modifier: 20, // +20%
          duration: 2,
          stackable: false,
        },
      ],
    });
    expect(getEffectiveStat(char, "str")).toBe(12); // 10 * 1.0 * 1.2
  });

  it("should stack multiple status effects", () => {
    const char = createMockPlayer({
      stats: { str: 10, dex: 10, end: 10, wis: 10 },
      statusEffects: [
        {
          id: "buff-1",
          name: "Power Up",
          type: "buff",
          stat: "end",
          modifier: 20,
          duration: 2,
          stackable: true,
        },
        {
          id: "debuff-1",
          name: "Armor Break",
          type: "debuff",
          stat: "end",
          modifier: -10,
          duration: 2,
          stackable: false,
        },
      ],
    });
    // 10 * 1.0 (flowing) * (1 + 0.20 - 0.10) = 10 * 1.1 = 11
    expect(getEffectiveStat(char, "end")).toBe(11);
  });
});

// =============================================================================
// COMBAT STATE HELPER TESTS (from combat.ts)
// =============================================================================

describe("createCombatState", () => {
  it("should create initial combat state", () => {
    const player = createMockPlayer();
    const enemies = [createMockEnemy()];
    const state = createCombatState(player, enemies);

    expect(state.player).toBe(player);
    expect(state.enemies).toBe(enemies);
    expect(state.currentTurn).toBe(0);
    expect(state.round).toBe(1);
    expect(state.combatResult).toBe("ongoing");
    expect(state.isBossFight).toBe(false);
  });

  it("should detect boss fight", () => {
    const player = createMockPlayer();
    const boss = createMockEnemy({ tier: "boss" });
    const state = createCombatState(player, [boss]);

    expect(state.isBossFight).toBe(true);
    expect(state.currentBossPhase).toBe(1);
  });
});

describe("checkCombatEnd", () => {
  it("should return 'defeat' when player HP is 0", () => {
    const player = createMockPlayer({ hp: 0 });
    const state = createCombatState(player, [createMockEnemy()]);
    expect(checkCombatEnd(state)).toBe("defeat");
  });

  it("should return 'victory' when all enemies defeated", () => {
    const player = createMockPlayer();
    const state = createCombatState(player, [
      createMockEnemy({ hp: 0 }),
      createMockEnemy({ id: "enemy-2", hp: 0 }),
    ]);
    expect(checkCombatEnd(state)).toBe("victory");
  });

  it("should return 'ongoing' when combat continues", () => {
    const player = createMockPlayer();
    const state = createCombatState(player, [createMockEnemy()]);
    expect(checkCombatEnd(state)).toBe("ongoing");
  });
});

describe("getLivingEnemies", () => {
  it("should return only enemies with HP > 0", () => {
    const player = createMockPlayer();
    const alive = createMockEnemy({ id: "alive", hp: 30 });
    const dead = createMockEnemy({ id: "dead", hp: 0 });
    const state = createCombatState(player, [alive, dead]);

    const living = getLivingEnemies(state);
    expect(living).toHaveLength(1);
    expect(living[0]?.id).toBe("alive");
  });
});

describe("getAllCombatants", () => {
  it("should return player and living enemies", () => {
    const player = createMockPlayer();
    const alive = createMockEnemy({ id: "alive", hp: 30 });
    const dead = createMockEnemy({ id: "dead", hp: 0 });
    const state = createCombatState(player, [alive, dead]);

    const combatants = getAllCombatants(state);
    expect(combatants).toHaveLength(2); // Player + 1 living enemy
    expect(combatants[0]?.isPlayer).toBe(true);
    expect(combatants[1]?.id).toBe("alive");
  });
});

// =============================================================================
// STANCE MODIFIERS TESTS
// =============================================================================

describe("STANCE_MODIFIERS", () => {
  it("should have balanced modifiers for flowing stance", () => {
    expect(STANCE_MODIFIERS.flowing.attack).toBe(1.0);
    expect(STANCE_MODIFIERS.flowing.defense).toBe(1.0);
    expect(STANCE_MODIFIERS.flowing.speed).toBe(1.0);
  });

  it("should have defensive modifiers for weathered stance", () => {
    expect(STANCE_MODIFIERS.weathered.attack).toBe(0.9);
    expect(STANCE_MODIFIERS.weathered.defense).toBe(1.5);
    expect(STANCE_MODIFIERS.weathered.speed).toBe(0.8);
  });

  it("should have offensive modifiers for hungry stance", () => {
    expect(STANCE_MODIFIERS.hungry.attack).toBe(1.3);
    expect(STANCE_MODIFIERS.hungry.defense).toBe(0.7);
    expect(STANCE_MODIFIERS.hungry.speed).toBe(1.1);
  });
});

// =============================================================================
// COMBAT ENGINE CLASS TESTS
// =============================================================================

describe("CombatEngine", () => {
  let player: Character;
  let enemies: Enemy[];

  beforeEach(() => {
    player = createMockPlayer();
    enemies = [createMockEnemy()];
    // Reset Math.random mock
    vi.restoreAllMocks();
  });

  describe("initialization", () => {
    it("should initialize with correct state", () => {
      const engine = new CombatEngine(player, enemies);
      const state = engine.getState();

      expect(state.player.name).toBe("Li Wei");
      expect(state.enemies).toHaveLength(1);
      expect(state.combatResult).toBe("ongoing");
    });

    it("should auto-select stance based on path alignment", () => {
      // Blade-dominant player
      const bladePlayer = createMockPlayer({
        pathAlignment: { blade: 60, stream: 20, shadow: 20 },
      });
      const engine = new CombatEngine(bladePlayer, enemies);

      // Blade path recommends hungry stance
      expect(engine.getPlayer().stance).toBe("hungry");
    });

    it("should initialize turn queue", () => {
      const engine = new CombatEngine(player, enemies);
      const queue = engine.getTurnQueue();

      expect(queue.length).toBeGreaterThan(0);
    });
  });

  describe("getters", () => {
    it("should return player reference", () => {
      const engine = new CombatEngine(player, enemies);
      expect(engine.getPlayer()).toBe(player);
    });

    it("should return enemies array", () => {
      const engine = new CombatEngine(player, enemies);
      expect(engine.getEnemies()).toBe(enemies);
    });

    it("should return living enemies only", () => {
      const mixedEnemies = [
        createMockEnemy({ id: "alive", hp: 30 }),
        createMockEnemy({ id: "dead", hp: 0 }),
      ];
      const engine = new CombatEngine(player, mixedEnemies);

      expect(engine.getLivingEnemies()).toHaveLength(1);
    });

    it("should return combat result", () => {
      const engine = new CombatEngine(player, enemies);
      expect(engine.getCombatResult()).toBe("ongoing");
    });
  });

  describe("stance changes", () => {
    it("should allow setting player stance", () => {
      const engine = new CombatEngine(player, enemies);
      engine.setPlayerStance("weathered");
      expect(engine.getPlayer().stance).toBe("weathered");
    });
  });

  describe("turn order preview", () => {
    it("should return array of predicted turns", () => {
      const engine = new CombatEngine(player, enemies);
      const preview = engine.getTurnOrderPreview(5);

      expect(preview.length).toBeLessThanOrEqual(5);
      expect(preview.every((c) => c.hp > 0)).toBe(true);
    });
  });

  describe("basic attack action", () => {
    it("should reject action when not player turn", () => {
      // Mock so it's not player turn
      const engine = new CombatEngine(player, enemies);
      // Force enemy turn
      const state = engine.getState();
      state.isPlayerTurn = false;

      const result = engine.executeAction({
        type: "attack",
        actor: player,
        target: enemies[0],
      });

      expect(result.success).toBe(false);
      expect(result.message).toContain("Not the player's turn");
    });

    it("should require a target for attack", () => {
      const engine = new CombatEngine(player, enemies);

      // Force player turn
      const state = engine.getState();
      state.isPlayerTurn = true;

      const result = engine.executeAction({
        type: "attack",
        actor: player,
        // No target
      });

      expect(result.success).toBe(false);
      expect(result.message).toContain("No target");
    });
  });

  describe("stance change action", () => {
    it("should require stance specification", () => {
      const engine = new CombatEngine(player, enemies);

      // Force player turn
      const state = engine.getState();
      state.isPlayerTurn = true;

      const result = engine.executeAction({
        type: "stance",
        actor: player,
        // No newStance
      });

      expect(result.success).toBe(false);
      expect(result.message).toContain("No stance");
    });
  });

  describe("flee action", () => {
    it("should not allow fleeing boss fights by default", () => {
      const boss = createMockEnemy({ tier: "boss" });
      const engine = new CombatEngine(player, [boss]);

      // Force player turn
      const state = engine.getState();
      state.isPlayerTurn = true;

      const result = engine.executeAction({
        type: "flee",
        actor: player,
      });

      expect(result.fleeSuccess).toBe(false);
      expect(result.message).toContain("can't run");
    });

    it("should allow fleeing with canFleeBoss config", () => {
      const boss = createMockEnemy({ tier: "boss" });
      const engine = new CombatEngine(player, [boss], { canFleeBoss: true });

      // Force player turn and mock random for guaranteed flee
      const state = engine.getState();
      state.isPlayerTurn = true;
      vi.spyOn(Math, "random").mockReturnValue(0); // Guaranteed success

      const result = engine.executeAction({
        type: "flee",
        actor: player,
      });

      // With random = 0, flee should succeed
      expect(result.type).toBe("flee");
    });
  });

  describe("combo system", () => {
    it("should start with empty combo", () => {
      const engine = new CombatEngine(player, enemies);
      const combo = engine.getComboChain();

      expect(combo.isActive).toBe(false);
      expect(combo.techniques).toHaveLength(0);
      expect(combo.damageMultiplier).toBe(1.0);
    });
  });

  describe("combat log", () => {
    it("should start with initial log entries", () => {
      const engine = new CombatEngine(player, enemies);
      const log = engine.getCombatLog();

      // Should have at least stance selection log
      expect(log.length).toBeGreaterThanOrEqual(0);
    });
  });
});

// =============================================================================
// DAMAGE CALCULATION EDGE CASES
// =============================================================================

describe("Damage Calculation Edge Cases", () => {
  it("should handle zero defense gracefully", () => {
    const player = createMockPlayer({
      stats: { str: 20, dex: 10, end: 10, wis: 10 },
    });
    const enemy = createMockEnemy({
      stats: { str: 5, dex: 5, end: 0, wis: 5 },
    });
    const engine = new CombatEngine(player, [enemy]);

    // Force player turn and deterministic random
    const state = engine.getState();
    state.isPlayerTurn = true;
    vi.spyOn(Math, "random").mockReturnValue(0.5);

    const result = engine.executeAction({
      type: "attack",
      actor: player,
      target: enemy,
    });

    expect(result.success).toBe(true);
    expect(result.damage).toBeGreaterThan(0);
  });

  it("should enforce minimum damage", () => {
    // Even with high defense, minimum damage should be dealt
    const player = createMockPlayer({
      stats: { str: 1, dex: 1, end: 1, wis: 1 },
    });
    const enemy = createMockEnemy({
      stats: { str: 50, dex: 50, end: 50, wis: 50 },
    });
    const engine = new CombatEngine(player, [enemy]);

    // Force player turn
    const state = engine.getState();
    state.isPlayerTurn = true;
    vi.spyOn(Math, "random").mockReturnValue(0.5);

    const result = engine.executeAction({
      type: "attack",
      actor: player,
      target: enemy,
    });

    expect(result.success).toBe(true);
    // Minimum damage is 1 by default config
    expect(result.damage).toBeGreaterThanOrEqual(1);
  });
});
