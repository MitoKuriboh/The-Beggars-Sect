/**
 * ConditionParser Unit Tests
 * Tests HP condition parsing and evaluation
 */

import { describe, it, expect } from "vitest";
import {
  parseHPCondition,
  evaluateHPCondition,
  checkHPCondition,
  getHPPercent,
  isLowHP,
  isHighHP,
  isCriticalHP,
} from "./ConditionParser";
import type { Character } from "../../types/index";

// =============================================================================
// TEST FIXTURES
// =============================================================================

function createMockCharacter(hp: number, maxHp: number): Character {
  return {
    id: "test-char",
    name: "Test Character",
    hp,
    maxHp,
    chi: 50,
    maxChi: 100,
    inverseChi: 0,
    maxInverseChi: 0,
    stats: {
      str: 10,
      dex: 10,
      end: 10,
      wis: 10,
    },
    techniques: [],
    masteryLevels: {},
    stance: "flowing",
    statusEffects: [],
    isPlayer: true,
  };
}

// =============================================================================
// parseHPCondition TESTS
// =============================================================================

describe("parseHPCondition", () => {
  it("should parse 'hp < 40%' correctly", () => {
    const result = parseHPCondition("hp < 40%");
    expect(result).toEqual({
      operator: "<",
      threshold: 40,
      isPercent: true,
    });
  });

  it("should parse 'hp >= 50' (absolute value) correctly", () => {
    const result = parseHPCondition("hp >= 50");
    expect(result).toEqual({
      operator: ">=",
      threshold: 50,
      isPercent: false,
    });
  });

  it("should parse 'hp <= 25%' correctly", () => {
    const result = parseHPCondition("hp <= 25%");
    expect(result).toEqual({
      operator: "<=",
      threshold: 25,
      isPercent: true,
    });
  });

  it("should parse 'hp > 70%' correctly", () => {
    const result = parseHPCondition("hp > 70%");
    expect(result).toEqual({
      operator: ">",
      threshold: 70,
      isPercent: true,
    });
  });

  it("should return null for invalid format", () => {
    expect(parseHPCondition("invalid")).toBeNull();
    expect(parseHPCondition("mp < 50%")).toBeNull();
    expect(parseHPCondition("hp == 50%")).toBeNull();
    expect(parseHPCondition("")).toBeNull();
  });

  it("should handle whitespace variations", () => {
    expect(parseHPCondition("hp<40%")).toEqual({
      operator: "<",
      threshold: 40,
      isPercent: true,
    });
    expect(parseHPCondition("hp  >=  50")).toEqual({
      operator: ">=",
      threshold: 50,
      isPercent: false,
    });
  });
});

// =============================================================================
// evaluateHPCondition TESTS
// =============================================================================

describe("evaluateHPCondition", () => {
  it("should evaluate 'less than' percentage correctly", () => {
    const char = createMockCharacter(30, 100); // 30% HP
    expect(
      evaluateHPCondition(char, {
        operator: "<",
        threshold: 40,
        isPercent: true,
      }),
    ).toBe(true);
    expect(
      evaluateHPCondition(char, {
        operator: "<",
        threshold: 30,
        isPercent: true,
      }),
    ).toBe(false);
    expect(
      evaluateHPCondition(char, {
        operator: "<",
        threshold: 20,
        isPercent: true,
      }),
    ).toBe(false);
  });

  it("should evaluate 'greater than' percentage correctly", () => {
    const char = createMockCharacter(70, 100); // 70% HP
    expect(
      evaluateHPCondition(char, {
        operator: ">",
        threshold: 60,
        isPercent: true,
      }),
    ).toBe(true);
    expect(
      evaluateHPCondition(char, {
        operator: ">",
        threshold: 70,
        isPercent: true,
      }),
    ).toBe(false);
  });

  it("should evaluate absolute HP values correctly", () => {
    const char = createMockCharacter(50, 100);
    expect(
      evaluateHPCondition(char, {
        operator: ">=",
        threshold: 50,
        isPercent: false,
      }),
    ).toBe(true);
    expect(
      evaluateHPCondition(char, {
        operator: "<=",
        threshold: 50,
        isPercent: false,
      }),
    ).toBe(true);
    expect(
      evaluateHPCondition(char, {
        operator: "<",
        threshold: 50,
        isPercent: false,
      }),
    ).toBe(false);
  });

  it("should handle division by zero (maxHp = 0)", () => {
    const char = createMockCharacter(0, 0); // Edge case: maxHp is 0
    // Should return 0% and not crash
    expect(
      evaluateHPCondition(char, {
        operator: "<",
        threshold: 50,
        isPercent: true,
      }),
    ).toBe(true); // 0 < 50
  });
});

// =============================================================================
// checkHPCondition TESTS
// =============================================================================

describe("checkHPCondition", () => {
  it("should parse and evaluate in one call", () => {
    const char = createMockCharacter(25, 100);
    expect(checkHPCondition(char, "hp < 30%")).toBe(true);
    expect(checkHPCondition(char, "hp > 30%")).toBe(false);
  });

  it("should return false for invalid condition strings", () => {
    const char = createMockCharacter(50, 100);
    expect(checkHPCondition(char, "invalid condition")).toBe(false);
  });
});

// =============================================================================
// getHPPercent TESTS
// =============================================================================

describe("getHPPercent", () => {
  it("should calculate percentage correctly", () => {
    expect(getHPPercent(createMockCharacter(50, 100))).toBe(50);
    expect(getHPPercent(createMockCharacter(25, 100))).toBe(25);
    expect(getHPPercent(createMockCharacter(100, 100))).toBe(100);
    expect(getHPPercent(createMockCharacter(0, 100))).toBe(0);
  });

  it("should handle division by zero (maxHp = 0)", () => {
    expect(getHPPercent(createMockCharacter(0, 0))).toBe(0);
  });

  it("should handle over-healing edge case", () => {
    // HP can exceed maxHp temporarily in some game scenarios
    expect(getHPPercent(createMockCharacter(120, 100))).toBe(120);
  });
});

// =============================================================================
// isLowHP / isHighHP / isCriticalHP TESTS
// =============================================================================

describe("isLowHP", () => {
  it("should use default 30% threshold", () => {
    expect(isLowHP(createMockCharacter(29, 100))).toBe(true);
    expect(isLowHP(createMockCharacter(30, 100))).toBe(false);
    expect(isLowHP(createMockCharacter(31, 100))).toBe(false);
  });

  it("should accept custom threshold", () => {
    expect(isLowHP(createMockCharacter(49, 100), 50)).toBe(true);
    expect(isLowHP(createMockCharacter(50, 100), 50)).toBe(false);
  });
});

describe("isHighHP", () => {
  it("should use default 70% threshold", () => {
    expect(isHighHP(createMockCharacter(71, 100))).toBe(true);
    expect(isHighHP(createMockCharacter(70, 100))).toBe(false);
    expect(isHighHP(createMockCharacter(69, 100))).toBe(false);
  });

  it("should accept custom threshold", () => {
    expect(isHighHP(createMockCharacter(81, 100), 80)).toBe(true);
    expect(isHighHP(createMockCharacter(80, 100), 80)).toBe(false);
  });
});

describe("isCriticalHP", () => {
  it("should use default 15% threshold", () => {
    expect(isCriticalHP(createMockCharacter(14, 100))).toBe(true);
    expect(isCriticalHP(createMockCharacter(15, 100))).toBe(false);
    expect(isCriticalHP(createMockCharacter(16, 100))).toBe(false);
  });

  it("should accept custom threshold", () => {
    expect(isCriticalHP(createMockCharacter(9, 100), 10)).toBe(true);
    expect(isCriticalHP(createMockCharacter(10, 100), 10)).toBe(false);
  });
});
