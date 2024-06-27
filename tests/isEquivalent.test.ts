import { describe, it } from "vitest";
import { isEquivalent } from "../src";

describe("isEquivalent Suite", () => {
  it.concurrent(
    "should return true for equivalent objects",
    async ({ expect }) => {
      const obj1 = {
        name: "John",
        age: 30,
        city: "New York",
      };

      const obj2 = {
        name: "John",
        age: 30,
        city: "New York",
      };

      expect(isEquivalent(obj1, obj2)).toBe(true);
    }
  );

  it.concurrent(
    "should return false for non-equivalent objects",
    async ({ expect }) => {
      const obj1 = {
        name: "John",
        age: 30,
        city: "New York",
      };

      const obj1WithWrongType = {
        name: "John",
        age: "30",
        city: "New York",
      };

      const obj2 = {
        name: "John",
        age: 30,
        city: "New York",
        country: "USA",
      };

      expect(isEquivalent(obj1, obj2)).toBe(false);
    }
  );

  it.concurrent(
    "should return true for deeply-nested equivalent objects",
    async ({ expect }) => {
      const obj1 = {
        name: "John",
        age: 30,
        address: {
          street: "123 Main St",
          city: "New York",
        },
      };

      const obj2 = {
        name: "John",
        age: 30,
        address: {
          street: "123 Main St",
          city: "New York",
        },
      };

      const obj3 = {
        ...obj1,
        children: [
          {
            name: "Jane",
            age: 25,
          },
        ],
      };

      const obj4 = {
        ...obj1,
        children: [
          {
            name: "Jane",
            age: 25,
          },
        ],
      };

      expect(isEquivalent(obj1, obj2)).toBe(true);
      expect(isEquivalent(obj3, obj4)).toBe(true);
    }
  );

  it.concurrent(
    "should return false for deeply-nested equivalent objects",
    async ({ expect }) => {
      const obj1 = {
        name: "John",
        age: 30,
        address: {
          street: "123 Main St",
          city: "New York",
        },
      };

      const obj2 = {
        name: "John",
        age: 30,
        address: {
          street: "789 Sub St",
          city: "New Jersey",
        },
      };

      const obj3 = {
        ...obj1,
        children: [
          {
            name: "Jane",
            age: 25,
          },
        ],
      };

      const obj4 = {
        ...obj1,
        children: [
          {
            name: "Janette",
            age: 25,
          },
        ],
      };

      expect(isEquivalent(obj1, obj2)).toBe(false);
      expect(isEquivalent(obj3, obj4)).toBe(false);
    }
  );
});
