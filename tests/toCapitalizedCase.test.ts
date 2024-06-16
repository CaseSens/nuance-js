import { expect, test, describe, it } from "vitest";
import { toCapitalizedCase } from "../src";

describe("toCapitalizedCase Suite", () => {
  // =========================================================================================================

  it.concurrent("without args", async ({ expect }) => {
    expect(toCapitalizedCase("hello world")).toBe("HELLO WORLD");
  });

  it.concurrent("with { at } args", async ({ expect }) => {
    expect(toCapitalizedCase("hello world", { at: 0 })).toBe(
      "Hello world"
    );

    expect(toCapitalizedCase("hello world", { at: 1 })).toBe(
      "hEllo world"
    );

    // Edge cases below
    expect(toCapitalizedCase("hello world", { at: 5 })).toBe(
      "hello world"
    );

    expect(() =>
      toCapitalizedCase("hello world", { at: "-1" })
    ).toThrowError(
      `'at' prop must be a number, received: '"-1"' with a type of: string`
    );

    expect(() =>
      toCapitalizedCase("hello world", { at: -1 })
    ).toThrowError(`'at' prop cannot be negative, received: -1`);

    expect(() =>
      toCapitalizedCase("hello world", { at: 5000 })
    ).toThrowError(
      `'at' prop is out of bounds, received: 5000, while string length is: 11. Remember that 'at' is 0-first`
    );
  });

  // =========================================================================================================

  // =========================================================================================================

  it.concurrent("with { range } args", async ({ expect }) => {
    expect(toCapitalizedCase("hello world", { range: [0, 1] })).toBe(
      "HEllo world"
    );

    expect(toCapitalizedCase("hello world", { range: [1, 6] })).toBe(
      "hELLO World"
    );

    // Edge cases below
    expect(() =>
      toCapitalizedCase("hello world", { range: [-1, 5] })
    ).toThrowError(`range values cannot be negative, received: [-1, 5]`);

    expect(() =>
      toCapitalizedCase("hello world", { range: [-10, -5] })
    ).toThrowError(`range values cannot be negative, received: [-10, -5]`);

    expect(() =>
      toCapitalizedCase("hello world", { range: [3, 0] })
    ).toThrowError(`range values have to be succeeding, received: [3, 0]`);

    expect(() =>
      toCapitalizedCase("hello world", { range: [0, 500] })
    ).toThrowError(
      `range values cannot be greater than the string's length, received: [0, 500] while string length is: 11`
    );

    expect(() =>
      toCapitalizedCase("hello world", { range: 5 })
    ).toThrowError(
      `range prop must be an array, received: '5' with a type of: number`
    );

    expect(() =>
      toCapitalizedCase("hello world", { range: ["5", "10"] })
    ).toThrowError(
      `range prop must contain only numbers, received: ["5", "10"]`
    );

    expect(() =>
      toCapitalizedCase("hello world", { range: [5, "10"] })
    ).toThrowError(`range prop must contain only numbers, received: [5, "10"]`);
  });

  // =========================================================================================================

  // =========================================================================================================

  it.concurrent("with { forMatching } args", async ({ expect }) => {
    expect(
      toCapitalizedCase("hello world", { forMatching: /[a-z]/g })
    ).toBe("HELLO WORLD");

    expect(
      toCapitalizedCase("hello world", { forMatching: /[A-Z]/g })
    ).toBe("hello world");

    expect(
      toCapitalizedCase("hello world", { forMatching: /[a-z0-9]/g })
    ).toBe("HELLO WORLD");

    expect(
      toCapitalizedCase("hello world", { forMatching: /[a-l]/g })
    ).toBe("HELLo worLD");

    // Edge cases below

    // Non-alphanumeric characters
    expect(
      toCapitalizedCase("hello world", { forMatching: /[^a-zA-Z0-9]/g })
    ).toBe("hello world");

    // Non RegExp
    expect(() =>
      toCapitalizedCase("hello world", { forMatching: 5 })
    ).toThrowError(
      `forMatching prop must be a RegExp, received: '5' with a type of: number`
    );
  });

  // =========================================================================================================

  // =========================================================================================================

  it.concurrent("with { forChars } args", async ({ expect }) => {
    expect(toCapitalizedCase("hello world", { forChars: "all" })).toBe(
      "HELLO WORLD"
    );

    expect(toCapitalizedCase("hello world", { forChars: "first" })).toBe(
      "Hello world"
    );

    expect(toCapitalizedCase("hello world", { forChars: "last" })).toBe(
      "hello worlD"
    );
  });

  // =========================================================================================================
});
