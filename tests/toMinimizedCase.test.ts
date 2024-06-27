import { describe, it } from "vitest";
import { toMinimizedCase } from "../src";

describe("toMinimizedCase Suite", () => {
  // =========================================================================================================

  it.concurrent("without args", async ({ expect }) => {
    expect(toMinimizedCase("HELLO WORLD")).toBe("hello world");
  });

  // =========================================================================================================

  // =========================================================================================================

  it.concurrent("with { at } args", async ({ expect }) => {
    expect(toMinimizedCase("HELLO WORLD", { at: 0 })).toBe(
      "hELLO WORLD"
    );

    expect(toMinimizedCase("HELLO WORLD", { at: 1 })).toBe(
      "HeLLO WORLD"
    );

    // Edge cases below
    expect(toMinimizedCase("HELLO WORLD", { at: 5 })).toBe(
      "HELLO WORLD"
    );

    expect(() =>
      toMinimizedCase("HELLO WORLD", { at: "-1" })
    ).toThrowError(
      `'at' prop must be a number, received: '"-1"' with a type of: string`
    );

    expect(() =>
      toMinimizedCase("HELLO WORLD", { at: -1 })
    ).toThrowError(`'at' prop cannot be negative, received: -1`);

    expect(() =>
      toMinimizedCase("HELLO WORLD", { at: 5000 })
    ).toThrowError(
      `'at' prop is out of bounds, received: 5000, while string length is: 11. Remember that 'at' is 0-first`
    );
  });

  // =========================================================================================================

  // =========================================================================================================

  it.concurrent("with { range } args", async ({ expect }) => {
    expect(toMinimizedCase("HELLO WORLD", { range: [0, 1] })).toBe(
      "heLLO WORLD"
    );

    expect(toMinimizedCase("HELLO WORLD", { range: [1, 6] })).toBe(
      "Hello wORLD"
    );

    // Edge cases below
    expect(() =>
      toMinimizedCase("HELLO WORLD", { range: [-1, 5] })
    ).toThrowError(`range values cannot be negative, received: [-1, 5]`);

    expect(() =>
      toMinimizedCase("HELLO WORLD", { range: [-10, -5] })
    ).toThrowError(`range values cannot be negative, received: [-10, -5]`);

    expect(() =>
      toMinimizedCase("HELLO WORLD", { range: [3, 0] })
    ).toThrowError(`range values have to be succeeding, received: [3, 0]`);

    expect(() =>
      toMinimizedCase("HELLO WORLD", { range: [0, 500] })
    ).toThrowError(
      `range values cannot be greater than the string's length, received: [0, 500] while string length is: 11`
    );

    expect(() =>
      toMinimizedCase("HELLO WORLD", { range: 5 })
    ).toThrowError(
      `range prop must be an array, received: '5' with a type of: number`
    );

    expect(() =>
      toMinimizedCase("HELLO WORLD", { range: ["5", "10"] })
    ).toThrowError(
      `range prop must contain only numbers, received: ["5", "10"]`
    );

    expect(() =>
      toMinimizedCase("HELLO WORLD", { range: [5, "10"] })
    ).toThrowError(`range prop must contain only numbers, received: [5, "10"]`);
  });

  // =========================================================================================================

  // =========================================================================================================

  it.concurrent("with { forMatching } args", async ({ expect }) => {
    expect(
      toMinimizedCase("HELLO WORLD", { forMatching: /[a-z]/g })
    ).toBe("HELLO WORLD");

    expect(
      toMinimizedCase("HELLO WORLD", { forMatching: /[A-Z]/g })
    ).toBe("hello world");

    expect(
      toMinimizedCase("HELLO WORLD", { forMatching: /[A-Z0-9]/g })
    ).toBe("hello world");

    expect(
      toMinimizedCase("HELLO WORLD", { forMatching: /[A-L]/g })
    ).toBe("hellO WORld");

    // Edge cases below

    // Non-alphanumeric characters
    expect(
      toMinimizedCase("HELLO WORLD", { forMatching: /[^a-zA-Z0-9]/g })
    ).toBe("HELLO WORLD");

    // Non RegExp
    expect(() =>
      toMinimizedCase("HELLO WORLD", { forMatching: 5 })
    ).toThrowError(
      `forMatching prop must be a RegExp, received: '5' with a type of: number`
    );
  });
});
