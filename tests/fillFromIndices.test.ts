import { describe, it } from "vitest";
import { fillFromIndices } from "../src";

describe("fillFromIndices Suite", () => {
  it.concurrent(
    "should return a number[] from the source array at the specified indices",
    async ({ expect }) => {
      const arr = [1, 2, 3, 4, 5];
      const indices = [0, 2, 4];

      expect(fillFromIndices(arr, indices)).toEqual([1, 3, 5]);
      expect(fillFromIndices(arr, indices.reverse())).toEqual([5, 3, 1]);
      expect(
        fillFromIndices(arr, indices.reverse(), {
          sortIndices: true,
          compareFn: (a, b) => (a as number) - (b as number),
        })
      ).toEqual([1, 3, 5]);
    }
  );

  it.concurrent(
    "should return a string[] from the source array at the specified indices",
    async ({ expect }) => {
      const arr = ["Adam", "Bob", "Charlie", "David", "Eve"];
      const indices = [0, 2, 4];

      expect(fillFromIndices(arr, indices)).toEqual(["Adam", "Charlie", "Eve"]);
      expect(fillFromIndices(arr, indices.reverse())).toEqual([
        "Eve",
        "Charlie",
        "Adam",
      ]);
      expect(
        fillFromIndices(arr, indices.reverse(), {
          sortIndices: true,
          compareFn: (a, b) => String(a).trim().localeCompare(String(b)),
        })
      ).toEqual(["Adam", "Charlie", "Eve"]);
    }
  );
});
