import { describe, it } from "vitest";
import { range } from "../src";

describe("range Suite", () => {
  it.concurrent("no step arg", async ({ expect }) => {
    expect(range(0, 10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it.concurrent("with start > end", async ({ expect }) => {
    expect(range(10, 0)).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
  });

  it.concurrent("with step arg", async ({ expect }) => {
    expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8]);
  });

  it.concurrent("with start > end && with step arg", async ({ expect }) => {
    expect(range(10, 0, 2)).toEqual([10, 8, 6, 4, 2]);
  });

  it.concurrent("with start === end", async ({ expect }) => {
    expect(range(2, 2)).toEqual([2]);
  });

  it.concurrent("with step arg non-divisible", async ({ expect }) => {
    expect(range(0, 11, 2)).toEqual([0, 2, 4, 6, 8, 10]);
    expect(range(0, 10, 3)).toEqual([0, 3, 6, 9]);
  });

  // Edge cases below
  it.concurrent("with wrong args types", async ({ expect }) => {
    expect(() => range(0, 10, "2")).toThrowError(
      `range values must be numbers, received types: [start: number, end: number, step: string]`
    );
    expect(() => range(0, "10", 2)).toThrowError(
      `range values must be numbers, received types: [start: number, end: string, step: number]`
    );
    expect(() => range("0", 10, 2)).toThrowError(
      `range values must be numbers, received types: [start: string, end: number, step: number]`
    );
  });
});
