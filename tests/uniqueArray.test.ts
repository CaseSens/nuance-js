import { describe, it } from "vitest";
import { uniqueArray } from "../src";

describe("uniqueArray Suite without object literals", () => {
  it.concurrent("should return unique array", async ({ expect }) => {
    expect(uniqueArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);

    expect(uniqueArray([1, 1, 1, 2, 3, 4, 4, 5, 6])).toEqual([
      1, 2, 3, 4, 5, 6,
    ]);

    expect(uniqueArray(["s", "a", "s", "d"])).toEqual(["s", "a", "d"]);

    expect(uniqueArray([false, true, false, false, true])).toEqual([
      false,
      true,
    ]);

    // This would be return an array with duplicates, as we haven't specified object literals to be true.
    expect(
      uniqueArray([{ name: "John" }, { name: "John" }, { name: "Jane" }])
    ).toEqual([{ name: "John" }, { name: "John" }, { name: "Jane" }]);
  });
});

describe("uniqueArray Suite with object literals", () => {
  it.concurrent("should return unique array", async ({ expect }) => {
    expect(
      uniqueArray([{ name: "John" }, { name: "John" }, { name: "Jane" }], {
        arrayContainsObjectLiterals: true,
      })
    ).toEqual([{ name: "John" }, { name: "Jane" }]);

    expect(
      uniqueArray(
        [
          { name: "John", children: [{ name: "Child1" }, { name: "Child2" }] },
          { name: "John", children: [{ name: "Child1" }, { name: "Child2" }] },
          { name: "Jane", children: [{ name: "Child1" }, { name: "Child2" }] },
        ],
        {
          arrayContainsObjectLiterals: true,
        }
      )
    ).toEqual([
      { name: "John", children: [{ name: "Child1" }, { name: "Child2" }] },
      { name: "Jane", children: [{ name: "Child1" }, { name: "Child2" }] },
    ]);

    expect(
      uniqueArray(
        [
          {
            name: "John",
            children: [{ name: "Child1" }, { name: "Child2" }],
          },
          {
            name: "John",
            children: [{ name: "Child3" }, { name: "Child2" }],
          },
          {
            name: "Jane",
            children: [{ name: "Child1" }, { name: "Child2" }],
          },
        ],
        {
          arrayContainsObjectLiterals: true,
        }
      )
    ).toEqual([
      { name: "John", children: [{ name: "Child1" }, { name: "Child2" }] },
      { name: "John", children: [{ name: "Child3" }, { name: "Child2" }] },
      { name: "Jane", children: [{ name: "Child1" }, { name: "Child2" }] },
    ]);
  });
});
