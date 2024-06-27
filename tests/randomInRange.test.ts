import { describe, it } from "vitest";
import { randomInRange } from "../src";

type MinMaxFromArr = {
  min: number;
  max: number;
};

const minMaxFromArray = (array: number[]): MinMaxFromArr => {
  array.sort((a, b) => a - b);
  return {
    min: array[0],
    max: array[array.length - 1],
  };
};

describe("randomInRange Suite", () => {
  const min = 0;
  const max = 2;

  // =========================================================================================================
  it.concurrent("no optional args", async ({ expect }) => {
    const randomSuite: number[] = [];

    // 30 iterations should be enough to get a good distribution, ensuring that min and max should equal min and max params.
    for (let i = 0; i < 30; i++) {
      randomSuite.push(randomInRange({ min, max }));
    }

    const minMax = minMaxFromArray(randomSuite);

    expect(minMax.min).toBe(0);
    expect(minMax.max).toBe(2);
  });
  // =========================================================================================================

  // =========================================================================================================
  it.concurrent("with inclusive true false", async ({ expect }) => {
    const randomSuite: number[] = [];

    for (let i = 0; i < 30; i++) {
      randomSuite.push(randomInRange({ min, max, inclusive: "true false" }));
    }

    const minMax = minMaxFromArray(randomSuite);

    expect(minMax.min).toBe(0);
    expect(minMax.max).toBe(1);
  });
  // =========================================================================================================

  // =========================================================================================================
  it.concurrent("with inclusive false true", async ({ expect }) => {
    const randomSuite: number[] = [];

    for (let i = 0; i < 30; i++) {
      randomSuite.push(randomInRange({ min, max, inclusive: "false true" }));
    }

    const minMax = minMaxFromArray(randomSuite);

    expect(minMax.min).toBe(1);
    expect(minMax.max).toBe(2);
  });
  // =========================================================================================================

  // =========================================================================================================
  it.concurrent("with inclusive false false", async ({ expect }) => {
    const randomSuite: number[] = [];

    for (let i = 0; i < 30; i++) {
      randomSuite.push(randomInRange({ min, max, inclusive: "false false" }));
    }

    const minMax = minMaxFromArray(randomSuite);

    expect(minMax.min).toBe(1);
    expect(minMax.max).toBe(1);
  });
  // =========================================================================================================

  // =========================================================================================================
  it.concurrent("with decimals", async ({ expect }) => {
    const randomSuite: number[] = [];

    for (let i = 0; i < 10; i++) {
      randomSuite.push(randomInRange({ min, max, containsDecimals: true }));
    }

    // Basically, it should contain at least one decimal point
    expect(
      randomSuite
        .reduce((acc, curr) => acc + curr)
        .toString()
        .split(".")[1].length
    ).toBeGreaterThan(0);
  });

  // =========================================================================================================
  // Edge cases below
  // =========================================================================================================

  it.concurrent("with min > max", async ({ expect }) => {
    expect(() => randomInRange({ min: 2, max: 1 })).toThrowError(
      `min must be less than max, received: [2, 1]`
    );
  });

  it.concurrent("with min === max", async ({ expect }) => {
    expect(() => randomInRange({ min: 2, max: 1 })).toThrowError(
      `min must be less than max, received: [2, 1]`
    );
  });

  it.concurrent("with erroneous min max type", async ({ expect }) => {
    expect(() => randomInRange({ min: "0", max: "2" })).toThrowError(
      `min and max must be numbers, received types: [string, string]`
    );
  });

  it.concurrent("with erroneous inclusive parameter", async ({ expect }) => {
    expect(() =>
      randomInRange({ min: 0, max: 2, inclusive: "wrong, true" })
    ).toThrowError(
      `Invalid inclusive value: "wrong, true". Inclusive must be one of the following: "true true", "true false", "false false", "false true"`
    );
  });

  it.concurrent("with erroneous inclusive type", async ({ expect }) => {
    expect(() =>
      randomInRange({ min: 0, max: 2, inclusive: true })
    ).toThrowError(`inclusive must be a string, received type: boolean`);
  });

  it.concurrent("contains decimals as wrong type", async ({ expect }) => {
    expect(() =>
      randomInRange({ min: 0, max: 2, containsDecimals: "true" })
    ).toThrowError(`containsDecimals must be a boolean, received type: string`);
  });
});
