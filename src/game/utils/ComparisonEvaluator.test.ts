/**
 * ComparisonEvaluator Unit Tests
 * Tests numeric comparison utilities
 */

import { describe, it, expect, vi } from "vitest";
import {
  evaluateComparison,
  isInRange,
  isOutOfRange,
  clamp,
  checkModulo,
  checkChance,
  approximatelyEqual,
  evaluateComparisonString,
} from "./ComparisonEvaluator";

// =============================================================================
// evaluateComparison TESTS
// =============================================================================

describe("evaluateComparison", () => {
  it("should evaluate 'less than' correctly", () => {
    expect(evaluateComparison("<", 30, 50)).toBe(true);
    expect(evaluateComparison("<", 50, 50)).toBe(false);
    expect(evaluateComparison("<", 70, 50)).toBe(false);
  });

  it("should evaluate 'less than or equal' correctly", () => {
    expect(evaluateComparison("<=", 30, 50)).toBe(true);
    expect(evaluateComparison("<=", 50, 50)).toBe(true);
    expect(evaluateComparison("<=", 70, 50)).toBe(false);
  });

  it("should evaluate 'greater than' correctly", () => {
    expect(evaluateComparison(">", 70, 50)).toBe(true);
    expect(evaluateComparison(">", 50, 50)).toBe(false);
    expect(evaluateComparison(">", 30, 50)).toBe(false);
  });

  it("should evaluate 'greater than or equal' correctly", () => {
    expect(evaluateComparison(">=", 70, 50)).toBe(true);
    expect(evaluateComparison(">=", 50, 50)).toBe(true);
    expect(evaluateComparison(">=", 30, 50)).toBe(false);
  });

  it("should evaluate equality correctly", () => {
    expect(evaluateComparison("==", 50, 50)).toBe(true);
    expect(evaluateComparison("==", 30, 50)).toBe(false);
    expect(evaluateComparison("===", 50, 50)).toBe(true);
  });

  it("should evaluate inequality correctly", () => {
    expect(evaluateComparison("!=", 30, 50)).toBe(true);
    expect(evaluateComparison("!=", 50, 50)).toBe(false);
    expect(evaluateComparison("!==", 30, 50)).toBe(true);
  });

  it("should return false for unknown operators", () => {
    expect(evaluateComparison("~", 30, 50)).toBe(false);
    expect(evaluateComparison("?", 30, 50)).toBe(false);
  });
});

// =============================================================================
// isInRange / isOutOfRange TESTS
// =============================================================================

describe("isInRange", () => {
  it("should return true for values within range (inclusive)", () => {
    expect(isInRange(50, 0, 100)).toBe(true);
    expect(isInRange(0, 0, 100)).toBe(true); // At min
    expect(isInRange(100, 0, 100)).toBe(true); // At max
  });

  it("should return false for values outside range", () => {
    expect(isInRange(-1, 0, 100)).toBe(false);
    expect(isInRange(101, 0, 100)).toBe(false);
  });
});

describe("isOutOfRange", () => {
  it("should return true for values outside range", () => {
    expect(isOutOfRange(-1, 0, 100)).toBe(true);
    expect(isOutOfRange(101, 0, 100)).toBe(true);
  });

  it("should return false for values within range", () => {
    expect(isOutOfRange(50, 0, 100)).toBe(false);
    expect(isOutOfRange(0, 0, 100)).toBe(false); // At min
    expect(isOutOfRange(100, 0, 100)).toBe(false); // At max
  });
});

// =============================================================================
// clamp TESTS
// =============================================================================

describe("clamp", () => {
  it("should not change values within range", () => {
    expect(clamp(50, 0, 100)).toBe(50);
  });

  it("should clamp values below minimum", () => {
    expect(clamp(-10, 0, 100)).toBe(0);
    expect(clamp(-999, 0, 100)).toBe(0);
  });

  it("should clamp values above maximum", () => {
    expect(clamp(150, 0, 100)).toBe(100);
    expect(clamp(999, 0, 100)).toBe(100);
  });

  it("should handle edge cases at boundaries", () => {
    expect(clamp(0, 0, 100)).toBe(0);
    expect(clamp(100, 0, 100)).toBe(100);
  });
});

// =============================================================================
// checkModulo TESTS
// =============================================================================

describe("checkModulo", () => {
  it("should detect multiples correctly", () => {
    expect(checkModulo(9, 3, 0)).toBe(true); // 9 is multiple of 3
    expect(checkModulo(10, 3, 0)).toBe(false); // 10 is not
    expect(checkModulo(12, 3, 0)).toBe(true);
  });

  it("should work with non-zero remainders", () => {
    expect(checkModulo(10, 3, 1)).toBe(true); // 10 % 3 === 1
    expect(checkModulo(11, 3, 2)).toBe(true); // 11 % 3 === 2
    expect(checkModulo(12, 3, 1)).toBe(false); // 12 % 3 === 0, not 1
  });

  it("should use default remainder of 0", () => {
    expect(checkModulo(15, 5)).toBe(true);
    expect(checkModulo(17, 5)).toBe(false);
  });
});

// =============================================================================
// checkChance TESTS
// =============================================================================

describe("checkChance", () => {
  it("should always succeed with 100% chance", () => {
    // Mock Math.random to return various values
    const mockRandom = vi.spyOn(Math, "random");

    mockRandom.mockReturnValue(0);
    expect(checkChance(100)).toBe(true);

    mockRandom.mockReturnValue(0.5);
    expect(checkChance(100)).toBe(true);

    mockRandom.mockReturnValue(0.999);
    expect(checkChance(100)).toBe(true);

    mockRandom.mockRestore();
  });

  it("should always fail with 0% chance", () => {
    const mockRandom = vi.spyOn(Math, "random");

    mockRandom.mockReturnValue(0);
    expect(checkChance(0)).toBe(false);

    mockRandom.mockReturnValue(0.5);
    expect(checkChance(0)).toBe(false);

    mockRandom.mockRestore();
  });

  it("should work with decimal format", () => {
    const mockRandom = vi.spyOn(Math, "random");

    mockRandom.mockReturnValue(0.25);
    expect(checkChance(0.5, true)).toBe(true); // 0.25 < 0.5

    mockRandom.mockReturnValue(0.75);
    expect(checkChance(0.5, true)).toBe(false); // 0.75 >= 0.5

    mockRandom.mockRestore();
  });
});

// =============================================================================
// approximatelyEqual TESTS
// =============================================================================

describe("approximatelyEqual", () => {
  it("should return true for exactly equal values", () => {
    expect(approximatelyEqual(1.5, 1.5)).toBe(true);
    expect(approximatelyEqual(0, 0)).toBe(true);
  });

  it("should return true for values within default tolerance", () => {
    expect(approximatelyEqual(1.0, 1.00001)).toBe(true);
    expect(approximatelyEqual(0.1 + 0.2, 0.3)).toBe(true); // Famous floating point issue
  });

  it("should return false for values outside tolerance", () => {
    expect(approximatelyEqual(1.0, 1.1)).toBe(false);
    expect(approximatelyEqual(0, 1)).toBe(false);
  });

  it("should accept custom tolerance", () => {
    expect(approximatelyEqual(1.0, 1.5, 1.0)).toBe(true); // Within tolerance of 1.0
    expect(approximatelyEqual(1.0, 1.5, 0.1)).toBe(false); // Outside tolerance of 0.1
  });
});

// =============================================================================
// evaluateComparisonString TESTS
// =============================================================================

describe("evaluateComparisonString", () => {
  it("should parse and evaluate 'less than' strings", () => {
    expect(evaluateComparisonString("< 50", 30)).toBe(true);
    expect(evaluateComparisonString("< 50", 60)).toBe(false);
  });

  it("should parse and evaluate 'greater than or equal' strings", () => {
    expect(evaluateComparisonString(">= 100", 150)).toBe(true);
    expect(evaluateComparisonString(">= 100", 50)).toBe(false);
  });

  it("should handle decimal thresholds", () => {
    expect(evaluateComparisonString("< 0.5", 0.3)).toBe(true);
    expect(evaluateComparisonString(">= 2.5", 2.5)).toBe(true);
  });

  it("should return false for invalid format", () => {
    expect(evaluateComparisonString("invalid", 50)).toBe(false);
    expect(evaluateComparisonString("", 50)).toBe(false);
    expect(evaluateComparisonString("50 <", 30)).toBe(false);
  });

  it("should handle whitespace variations", () => {
    expect(evaluateComparisonString("<50", 30)).toBe(true);
    expect(evaluateComparisonString(">=  100", 100)).toBe(true);
  });
});
