import { expect, test } from "vitest";
import { haveSameKeys } from "@/helpers/haveSameKeys";

test("returns false when the objects have different lengths of keys", () => {
  const obj1 = { a: 1, b: 2 };
  const obj2 = { c: 3 };

  expect(haveSameKeys(obj1, obj2)).toBe(false);
});

test("returns true when the objects have same keys and values", () => {
  const obj1 = { a: 1, b: 2 };
  const obj2 = { a: 1, b: 2 };

  expect(haveSameKeys(obj1, obj2)).toBe(true);
});

test("returns true when the objects have same keys but different values", () => {
  const obj1 = { a: 1, b: 2 };
  const obj2 = { a: 3, b: 4 };

  expect(haveSameKeys(obj1, obj2)).toBe(true);
});

test("returns false when one of the objects is empty and the other has keys", () => {
  const obj1 = {};
  const obj2 = { a: 1 };

  expect(haveSameKeys(obj1, obj2)).toBe(false);
});
