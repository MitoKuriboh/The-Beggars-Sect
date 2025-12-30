/**
 * Combat Engine
 * Manages ATB (Active Time Battle) turn system and combat flow
 */

import type {
  Character,
  Enemy,
  CombatState,
  CombatAction,
  ActionResult,
  TurnQueueEntry,
  CombatConfig,
  CombatResult,
  ComboChain,
  LogEntry,
  TechniqueEffect,
  StatusEffect,
} from "../../types/index";

import {
  createCombatState,
  DEFAULT_COMBAT_CONFIG,
  EMPTY_COMBO,
  checkCombatEnd,
  getLivingEnemies,
  getAllCombatants,
} from "../../types/combat";

import {
  getEffectiveStat,
  STANCE_MODIFIERS,
  STATUS_EFFECTS,
  type Stance,
} from "../../types/character";
import { AIController } from "./AIController";
import {
  getAttackMessage,
  getTechniqueMessage,
  getStanceMessage,
} from "../../data/combatPhrases";
import { GAME_BALANCE, getRecommendedStance } from "../config/GameBalance";
import {
  tickCharacterStatusEffects,
  tickStatusEffectsForAll,
} from "../utils/StatusEffectUtils";
import { checkHPCondition } from "../utils/ConditionParser";

// =============================================================================
// COMBAT ENGINE
// =============================================================================

export class CombatEngine {
  private state: CombatState;
  private config: CombatConfig;
  private onStateChange?: (state: CombatState) => void;

  constructor(
    player: Character,
    enemies: Enemy[],
    config: Partial<CombatConfig> = {},
    onStateChange?: (state: CombatState) => void,
  ) {
    this.state = createCombatState(player, enemies);
    this.config = { ...DEFAULT_COMBAT_CONFIG, ...config };
    this.onStateChange = onStateChange;

    // Auto-select stance based on path alignment
    this.autoSelectStance();

    // Initialize turn queue
    this.initializeTurnQueue();
  }

  /**
   * Auto-select player's stance based on their dominant path
   * Can be manually overridden by player during combat
   */
  private autoSelectStance(): void {
    // Only auto-select if path alignment exists (player only)
    if (!this.state.player.pathAlignment) {
      return;
    }

    const recommendedStance = getRecommendedStance(
      this.state.player.pathAlignment,
    );
    this.state.player.stance = recommendedStance;

    // Add log entry showing stance selection
    const pathName = this.getDominantPathName();
    this.addLog(
      this.state.player.name,
      `enters ${this.getStanceName(recommendedStance)} (${pathName} path)`,
      "system",
    );
  }

  /**
   * Get human-readable stance name
   */
  private getStanceName(stance: "flowing" | "weathered" | "hungry"): string {
    const names = {
      flowing: "Flowing Stance",
      weathered: "Weathered Stance",
      hungry: "Hungry Stance",
    };
    return names[stance];
  }

  /**
   * Get dominant path name for display
   */
  private getDominantPathName(): string {
    if (!this.state.player.pathAlignment) {
      return "Balanced";
    }
    const { blade, stream, shadow } = this.state.player.pathAlignment;
    if (blade >= stream && blade >= shadow) return "Blade";
    if (stream >= blade && stream >= shadow) return "Stream";
    return "Shadow";
  }

  // ---------------------------------------------------------------------------
  // GETTERS
  // ---------------------------------------------------------------------------

  getState(): CombatState {
    return this.state;
  }

  getPlayer(): Character {
    return this.state.player;
  }

  getEnemies(): Enemy[] {
    return this.state.enemies;
  }

  getLivingEnemies(): Enemy[] {
    return getLivingEnemies(this.state);
  }

  isPlayerTurn(): boolean {
    return this.state.isPlayerTurn;
  }

  getCombatResult(): CombatResult {
    return this.state.combatResult;
  }

  getCombatLog(): LogEntry[] {
    return this.state.combatLog;
  }

  getComboChain(): ComboChain {
    return this.state.comboChain;
  }

  getTurnQueue(): TurnQueueEntry[] {
    return this.state.turnQueue;
  }

  // ---------------------------------------------------------------------------
  // SETTERS
  // ---------------------------------------------------------------------------

  /**
   * Set player stance (used for initial stance selection)
   */
  setPlayerStance(stance: Stance): void {
    this.state.player.stance = stance;
    this.notifyStateChange();
  }

  // ---------------------------------------------------------------------------
  // TURN QUEUE MANAGEMENT (ATB)
  // ---------------------------------------------------------------------------

  /**
   * Initialize turn queue with all combatants
   */
  private initializeTurnQueue(): void {
    const combatants = getAllCombatants(this.state);

    this.state.turnQueue = combatants.map((char) => ({
      character: char,
      turnValue: this.getInitialTurnValue(char),
      isReady: false,
    }));

    // Advance to first ready character
    this.advanceToNextTurn();
  }

  /**
   * Get initial turn value based on DEX (higher DEX = starts closer to acting)
   */
  private getInitialTurnValue(char: Character): number {
    const dex = getEffectiveStat(char, "dex");
    // Random variance + DEX bonus
    return Math.floor(Math.random() * GAME_BALANCE.atb.turnVariance) + dex;
  }

  /**
   * Get turn speed (how fast the character accumulates turn points)
   */
  private getTurnSpeed(char: Character): number {
    const dex = getEffectiveStat(char, "dex");
    // Base tick rate + DEX modifier
    return (
      this.config.baseTickRate +
      Math.floor(dex / GAME_BALANCE.atb.dexSpeedDivisor)
    );
  }

  /**
   * Apply status effect to character, respecting stackable flag
   */
  private applyStatusEffect(target: Character, effect: StatusEffect): boolean {
    // Check if effect is stackable
    if (!effect.stackable) {
      // Check if target already has this effect
      const existing = target.statusEffects.find((e) => e.name === effect.name);
      if (existing) {
        // Refresh duration if new effect has longer duration
        if (effect.duration > existing.duration) {
          existing.duration = effect.duration;
        }
        return false; // Effect not added (already exists)
      }
    }

    // Add the effect
    target.statusEffects.push(effect);
    return true; // Effect added successfully
  }

  /**
   * Advance time until someone is ready to act
   */
  private advanceToNextTurn(): void {
    // Remove dead characters from queue
    this.state.turnQueue = this.state.turnQueue.filter(
      (entry) => entry.character.hp > 0,
    );

    if (this.state.turnQueue.length === 0) return;

    // Find how many ticks until someone is ready
    let ticksNeeded = Infinity;

    for (const entry of this.state.turnQueue) {
      const remaining = this.config.turnThreshold - entry.turnValue;
      const speed = this.getTurnSpeed(entry.character);
      const ticks = Math.ceil(remaining / speed);
      if (ticks < ticksNeeded) {
        ticksNeeded = ticks;
      }
    }

    // Advance all characters
    for (const entry of this.state.turnQueue) {
      const speed = this.getTurnSpeed(entry.character);
      entry.turnValue += speed * ticksNeeded;

      if (entry.turnValue >= this.config.turnThreshold) {
        entry.isReady = true;
      }
    }

    // Find the ready character (first one that hit threshold)
    const readyEntry = this.state.turnQueue.find((e) => e.isReady);

    if (readyEntry) {
      this.state.isPlayerTurn = readyEntry.character.isPlayer;
      this.state.currentTurn++;
    }

    this.notifyStateChange();
  }

  /**
   * Complete current character's turn and advance
   */
  private completeTurn(): void {
    // Reset the current actor's turn value
    const readyEntry = this.state.turnQueue.find((e) => e.isReady);
    if (readyEntry) {
      readyEntry.turnValue = 0;
      readyEntry.isReady = false;
    }

    // Tick down status effects
    this.tickStatusEffects();

    // Check for combat end
    const result = checkCombatEnd(this.state);
    if (result !== "ongoing") {
      this.state.combatResult = result;
      this.notifyStateChange();
      return;
    }

    // Advance to next turn
    this.advanceToNextTurn();
  }

  /**
   * Get predicted turn order (for UI display)
   */
  getTurnOrderPreview(length: number = 7): Character[] {
    // Clone the queue for simulation
    const simQueue = this.state.turnQueue.map((e) => ({
      character: e.character,
      turnValue: e.turnValue,
    }));

    const preview: Character[] = [];

    for (let i = 0; i < length && simQueue.length > 0; i++) {
      // Find next to act
      let ticksNeeded = Infinity;

      for (const entry of simQueue) {
        if (entry.character.hp <= 0) continue;
        const remaining = this.config.turnThreshold - entry.turnValue;
        const speed = this.getTurnSpeed(entry.character);
        const ticks = Math.ceil(remaining / speed);
        if (ticks < ticksNeeded) {
          ticksNeeded = ticks;
        }
      }

      // Advance simulation
      let nextActor: Character | null = null;

      for (const entry of simQueue) {
        if (entry.character.hp <= 0) continue;
        const speed = this.getTurnSpeed(entry.character);
        entry.turnValue += speed * ticksNeeded;

        if (entry.turnValue >= this.config.turnThreshold && !nextActor) {
          nextActor = entry.character;
          entry.turnValue = 0;
        }
      }

      if (nextActor) {
        preview.push(nextActor);
      }
    }

    return preview;
  }

  // ---------------------------------------------------------------------------
  // STATUS EFFECTS
  // ---------------------------------------------------------------------------

  private tickStatusEffects(): void {
    // Tick player effects
    tickCharacterStatusEffects(this.state.player);

    // Tick enemy effects
    tickStatusEffectsForAll(this.state.enemies);
  }

  // ---------------------------------------------------------------------------
  // ACTIONS
  // ---------------------------------------------------------------------------

  /**
   * Execute a player action
   */
  executeAction(action: CombatAction): ActionResult {
    if (!this.state.isPlayerTurn) {
      return {
        type: action.type,
        success: false,
        message: "Not the player's turn!",
      };
    }

    let result: ActionResult;

    switch (action.type) {
      case "attack":
        result = this.executeBasicAttack(action);
        break;
      case "technique":
        result = this.executeTechnique(action);
        break;
      case "flee":
        result = this.executeFlee(action);
        break;
      case "stance":
        result = this.executeStanceChange(action);
        break;
      default:
        result = {
          type: action.type,
          success: false,
          message: "Unknown action type",
        };
    }

    // Log the action (include techniqueId if using technique)
    const techniqueId =
      action.type === "technique" ? action.technique?.id : undefined;
    this.addLog(action.actor.name, result.message, "action", techniqueId);

    // Complete turn if action was successful
    if (result.success) {
      this.completeTurn();
    }

    return result;
  }

  /**
   * Execute enemy AI action
   */
  executeEnemyTurn(enemy: Enemy): ActionResult {
    // Check if stunned
    const isStunned = enemy.statusEffects.some((e) => e.id === "stunned");
    if (isStunned) {
      const result: ActionResult = {
        type: "attack",
        success: true,
        message: `${enemy.name} is stunned and cannot act!`,
      };
      this.addLog(enemy.name, result.message, "status");
      this.completeTurn();
      return result;
    }

    // Get AI decision
    const action = this.getAIAction(enemy);

    let result: ActionResult;

    switch (action.type) {
      case "attack":
        result = this.executeBasicAttack(action);
        break;
      case "technique":
        result = this.executeTechnique(action);
        break;
      default:
        result = this.executeBasicAttack({
          type: "attack",
          actor: enemy,
          target: this.state.player,
        });
    }

    const techniqueId =
      action.type === "technique" ? action.technique?.id : undefined;
    this.addLog(enemy.name, result.message, "action", techniqueId);
    this.completeTurn();

    return result;
  }

  // ---------------------------------------------------------------------------
  // ACTION IMPLEMENTATIONS
  // ---------------------------------------------------------------------------

  private executeBasicAttack(action: CombatAction): ActionResult {
    const { actor, target } = action;

    if (!target) {
      return { type: "attack", success: false, message: "No target specified" };
    }

    // Calculate damage
    const damage = this.calculateDamage(actor, target, 10); // Base power 10

    // Apply damage
    target.hp = Math.max(0, target.hp - damage.total);

    // Break combo if player took damage
    if (target.isPlayer) {
      this.breakCombo();
    }

    return {
      type: "attack",
      success: true,
      message: getAttackMessage(
        actor.name,
        target.name,
        damage.total,
        target.maxHp,
        damage.isCritical,
      ),
      damage: damage.total,
      isCritical: damage.isCritical,
      targetHpAfter: target.hp,
      targetDefeated: target.hp <= 0,
    };
  }

  private executeTechnique(action: CombatAction): ActionResult {
    const { actor, target, technique } = action;

    if (!technique) {
      return {
        type: "technique",
        success: false,
        message: "No technique specified",
      };
    }

    // Check chi cost
    if (actor.chi < technique.chiCost) {
      return {
        type: "technique",
        success: false,
        message: `Not enough chi! Need ${technique.chiCost}, have ${actor.chi}`,
      };
    }

    // Spend chi
    actor.chi -= technique.chiCost;

    // Calculate damage (if damaging technique)
    let damage = { total: 0, isCritical: false };
    if (technique.power > 0 && target) {
      damage = this.calculateDamage(actor, target, technique.power);
      target.hp = Math.max(0, target.hp - damage.total);

      // Update combo for player
      if (actor.isPlayer) {
        this.updateCombo(technique.id, technique.comboRole);
      } else if (target.isPlayer) {
        this.breakCombo();
      }
    }

    // Apply technique effects (buffs, debuffs, heals, multi-hit, etc.)
    let effectMessages: string[] = [];
    if (technique.effects && technique.effects.length > 0) {
      const effectResult = this.applyEffects(
        technique.effects,
        actor,
        target,
        damage.total,
      );
      damage.total = effectResult.totalDamage;
      effectMessages = effectResult.effectMessages;

      // Log effect messages
      for (const msg of effectMessages) {
        this.addLog("System", msg, "status");
      }

      // Check if target defeated after multi-hit
      if (target && target.hp <= 0) {
        // Already defeated
      }
    }

    // Track mastery
    if (actor.isPlayer) {
      actor.masteryLevels[technique.id] =
        (actor.masteryLevels[technique.id] || 0) + 1;
    }

    const message =
      damage.total > 0 && target
        ? `${getTechniqueMessage(actor.name, target.name, technique.name, technique.id)} for ${damage.total} damage!`
        : getTechniqueMessage(
            actor.name,
            target?.name || "",
            technique.name,
            technique.id,
          );

    return {
      type: "technique",
      success: true,
      message,
      damage: damage.total || undefined,
      isCritical: damage.isCritical || undefined,
      chiSpent: technique.chiCost,
      targetHpAfter: target?.hp,
      targetDefeated: target ? target.hp <= 0 : false,
    };
  }

  /**
   * Apply technique effects (buffs, debuffs, heals, multi-hit, etc.)
   */
  private applyEffects(
    effects: TechniqueEffect[],
    actor: Character | Enemy,
    target: Character | Enemy | undefined,
    baseDamage: number,
  ): { totalDamage: number; effectMessages: string[] } {
    let totalDamage = baseDamage;
    const effectMessages: string[] = [];

    for (const effect of effects) {
      const effectTarget = effect.target === "self" ? actor : target;
      if (!effectTarget && effect.target !== "self") continue;

      // Check condition if specified
      if (effect.condition && effectTarget) {
        if (!checkHPCondition(effectTarget, effect.condition)) {
          continue;
        }
      }

      switch (effect.type) {
        case "damage": {
          // Self-damage (recoil) - percentage of max HP
          const selfDamage = Math.floor((actor.maxHp * effect.value) / 100);
          actor.hp = Math.max(
            GAME_BALANCE.combat.minRecoilHp,
            actor.hp - selfDamage,
          ); // Don't kill self
          effectMessages.push(
            `${actor.name} takes ${selfDamage} recoil damage!`,
          );
          break;
        }

        case "heal": {
          if (effectTarget) {
            // Percentage-based healing
            const healAmount = Math.floor(
              (effectTarget.maxHp * effect.value) / 100,
            );
            const actualHeal = Math.min(
              healAmount,
              effectTarget.maxHp - effectTarget.hp,
            );
            effectTarget.hp += actualHeal;
            if (actualHeal > 0) {
              effectMessages.push(
                `${effectTarget.name} heals for ${actualHeal} HP!`,
              );
            }
          }
          break;
        }

        case "chi-restore": {
          if (effectTarget) {
            const restoreAmount = Math.min(
              effect.value,
              effectTarget.maxChi - effectTarget.chi,
            );
            effectTarget.chi += restoreAmount;
            if (restoreAmount > 0) {
              effectMessages.push(
                `${effectTarget.name} restores ${restoreAmount} chi!`,
              );
            }
          }
          break;
        }

        case "buff": {
          if (effectTarget) {
            const buffEffect: StatusEffect = {
              id: `buff-${Date.now()}`,
              name: effect.description,
              type: "buff",
              modifier: effect.value,
              duration: effect.duration || 3,
              stackable: false,
              description: effect.description,
            };
            if (this.applyStatusEffect(effectTarget, buffEffect)) {
              effectMessages.push(
                `${effectTarget.name} gains ${effect.description}!`,
              );
            }
          }
          break;
        }

        case "debuff": {
          if (effectTarget) {
            const debuffEffect: StatusEffect = {
              id: `debuff-${Date.now()}`,
              name: effect.description,
              type: "debuff",
              modifier: effect.value,
              duration: effect.duration || 3,
              stackable: false,
              description: effect.description,
            };
            if (this.applyStatusEffect(effectTarget, debuffEffect)) {
              effectMessages.push(
                `${effectTarget.name} suffers ${effect.description}!`,
              );
            }
          }
          break;
        }

        case "stun": {
          if (effectTarget) {
            // Stun has a chance based on effect value (or default if not specified differently)
            const stunChance =
              effect.value > 1
                ? effect.value / 100
                : GAME_BALANCE.statusEffects.defaultStunChance;
            if (Math.random() < stunChance) {
              if (
                this.applyStatusEffect(effectTarget, {
                  ...STATUS_EFFECTS.STUNNED,
                })
              ) {
                effectMessages.push(`${effectTarget.name} is stunned!`);
              }
            }
          }
          break;
        }

        case "armor-break": {
          if (effectTarget) {
            const armorBreakEffect = {
              ...STATUS_EFFECTS.ARMOR_BROKEN,
              duration: effect.duration || 2,
              modifier: -effect.value,
            };
            if (this.applyStatusEffect(effectTarget, armorBreakEffect)) {
              effectMessages.push(`${effectTarget.name}'s armor is broken!`);
            }
          }
          break;
        }

        case "counter-setup": {
          if (effectTarget) {
            const counterEffect: StatusEffect = {
              id: "counter",
              name: "Counter Stance",
              type: "buff",
              modifier: 0,
              duration: effect.duration || 1,
              stackable: false,
              description: "Will counter next attack",
            };
            if (this.applyStatusEffect(effectTarget, counterEffect)) {
              effectMessages.push(`${effectTarget.name} prepares to counter!`);
            }
          }
          break;
        }

        case "multi-hit": {
          // Multi-hit multiplies damage (effect.value = number of hits)
          // First hit already calculated, add extra hits
          if (target && baseDamage > 0) {
            const extraHits = effect.value - 1;
            for (let i = 0; i < extraHits; i++) {
              const hitDamage = Math.floor(
                baseDamage * GAME_BALANCE.multiHit.damageScale,
              );
              target.hp = Math.max(0, target.hp - hitDamage);
              totalDamage += hitDamage;
            }
            effectMessages.push(`${effect.value} hits!`);
          }
          break;
        }
      }
    }

    return { totalDamage, effectMessages };
  }

  private executeFlee(_action: CombatAction): ActionResult {
    // Can't flee boss fights
    if (this.state.isBossFight && !this.config.canFleeBoss) {
      return {
        type: "flee",
        success: false,
        message: "You can't run from this fight!",
        fleeSuccess: false,
      };
    }

    // Calculate flee chance based on player DEX vs average enemy DEX
    const playerDex = getEffectiveStat(this.state.player, "dex");
    const enemyDexAvg =
      this.getLivingEnemies().reduce(
        (sum, e) => sum + getEffectiveStat(e, "dex"),
        0,
      ) / Math.max(1, this.getLivingEnemies().length);

    const fleeChance = Math.min(
      this.config.maxFleeChance,
      Math.max(
        this.config.minFleeChance,
        GAME_BALANCE.flee.baseChance +
          (playerDex - enemyDexAvg) * GAME_BALANCE.flee.dexAdvantageMultiplier,
      ),
    );

    const success = Math.random() < fleeChance;

    if (success) {
      this.state.combatResult = "fled";
      this.notifyStateChange();
      return {
        type: "flee",
        success: true,
        message: "You escaped!",
        fleeSuccess: true,
      };
    }

    return {
      type: "flee",
      success: true, // Action succeeded, but flee failed
      message: "Couldn't escape!",
      fleeSuccess: false,
    };
  }

  private executeStanceChange(action: CombatAction): ActionResult {
    const { actor, newStance } = action;

    if (!newStance) {
      return { type: "stance", success: false, message: "No stance specified" };
    }

    actor.stance = newStance;

    return {
      type: "stance",
      success: true,
      message: getStanceMessage(actor.name, newStance),
    };
  }

  // ---------------------------------------------------------------------------
  // DAMAGE CALCULATION
  // ---------------------------------------------------------------------------

  private calculateDamage(
    attacker: Character,
    defender: Character,
    basePower: number,
  ): { total: number; isCritical: boolean } {
    // Get effective stats
    const attackStat = getEffectiveStat(attacker, "str");
    const defenseStat = getEffectiveStat(defender, "end");

    // Stance modifiers
    const attackerStanceMod = STANCE_MODIFIERS[attacker.stance].attack;
    const defenderStanceMod = STANCE_MODIFIERS[defender.stance].defense;

    // Check for defending status
    const isDefending = defender.statusEffects.some(
      (e) => e.id === "defending",
    );
    const defendMod = isDefending
      ? GAME_BALANCE.combat.defendingDamageReduction
      : 1.0;

    // Critical hit check
    const critChance =
      getEffectiveStat(attacker, "dex") * GAME_BALANCE.combat.critChancePerDex;
    const isCritical = Math.random() < critChance;
    const critMod = isCritical ? this.config.critMultiplier : 1.0;

    // Damage variance
    const variance =
      this.config.varianceMin +
      Math.random() * (this.config.varianceMax - this.config.varianceMin);

    // Combo bonus
    const comboMod = attacker.isPlayer
      ? this.state.comboChain.damageMultiplier
      : 1.0;

    // Calculate raw damage
    let damage = basePower + attackStat;
    damage *= attackerStanceMod;
    damage *= critMod;
    damage *= comboMod;
    damage *= variance;

    // Apply defense
    const defense = defenseStat * defenderStanceMod * defendMod;
    damage = Math.max(
      this.config.minDamage,
      damage - defense * GAME_BALANCE.combat.defenseEffectiveness,
    );

    return {
      total: Math.floor(damage),
      isCritical,
    };
  }

  // ---------------------------------------------------------------------------
  // COMBO SYSTEM
  // ---------------------------------------------------------------------------

  private updateCombo(techniqueId: string, role: string): void {
    const combo = this.state.comboChain;

    if (role === "starter" || !combo.isActive) {
      // Start new combo
      this.state.comboChain = {
        techniques: [techniqueId],
        damageMultiplier: 1.0,
        chiRefund: 0,
        isActive: true,
      };
    } else if (role === "followup" || role === "any") {
      // Continue combo
      combo.techniques.push(techniqueId);
      combo.damageMultiplier = Math.min(
        GAME_BALANCE.combos.maxMultiplier,
        GAME_BALANCE.combos.baseMultiplier +
          combo.techniques.length * GAME_BALANCE.combos.multiplierPerTechnique,
      );
    } else if (role === "finisher") {
      // Complete combo
      combo.techniques.push(techniqueId);
      combo.damageMultiplier = Math.min(
        GAME_BALANCE.combos.maxMultiplier,
        GAME_BALANCE.combos.baseMultiplier +
          combo.techniques.length * GAME_BALANCE.combos.multiplierPerTechnique,
      );

      // Chi refund on successful finisher
      const chiRefund = Math.floor(
        combo.techniques.length * GAME_BALANCE.combos.chiRefundPerTechnique,
      );
      this.state.player.chi = Math.min(
        this.state.player.maxChi,
        this.state.player.chi + chiRefund,
      );

      // Log combo completion
      this.addLog(
        "System",
        `Combo complete! (${combo.techniques.length} hits, +${chiRefund} chi)`,
        "system",
      );

      // Reset after finisher
      this.state.comboChain = { ...EMPTY_COMBO };
    }
  }

  private breakCombo(): void {
    if (this.state.comboChain.isActive) {
      this.addLog("System", "Combo broken!", "system");
    }
    this.state.comboChain = { ...EMPTY_COMBO };
  }

  // ---------------------------------------------------------------------------
  // AI
  // ---------------------------------------------------------------------------

  private getAIAction(enemy: Enemy): CombatAction {
    // Use AIController to select action based on enemy's AI pattern
    return AIController.selectAction(enemy, this.state.player, this.state);
  }

  // ---------------------------------------------------------------------------
  // LOGGING
  // ---------------------------------------------------------------------------

  private addLog(
    actorName: string,
    message: string,
    type: LogEntry["type"],
    techniqueId?: string,
  ): void {
    this.state.combatLog.push({
      round: this.state.round,
      turn: this.state.currentTurn,
      actorName,
      message,
      type,
      techniqueId,
      timestamp: Date.now(),
    });

    // Keep log size manageable
    if (this.state.combatLog.length > 100) {
      this.state.combatLog.shift();
    }

    this.notifyStateChange();
  }

  // ---------------------------------------------------------------------------
  // STATE MANAGEMENT
  // ---------------------------------------------------------------------------

  private notifyStateChange(): void {
    if (this.onStateChange) {
      this.onStateChange({ ...this.state });
    }
  }
}
