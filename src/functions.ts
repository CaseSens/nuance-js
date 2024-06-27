import {
  RandomInRangeProps,
  DebouncedFunctionProps,
  ChangeCaseProps,
  UniqueArrayProps,
  FillFromIndicesProps,
} from "./types";

export const randomInRange = ({
  min,
  max,
  inclusive = "true true",
  containsDecimals = false,
}: RandomInRangeProps): number => {
  if (typeof min !== "number" || typeof max !== "number") {
    throw new Error(
      `min and max must be numbers, received types: [${typeof min}, ${typeof max}]`
    );
  }

  if (typeof containsDecimals !== "boolean") {
    throw new Error(
      `containsDecimals must be a boolean, received type: ${typeof containsDecimals}`
    );
  }

  if (typeof inclusive !== "string") {
    throw new Error(
      `inclusive must be a string, received type: ${typeof inclusive}`
    );
  }

  if (min >= max) {
    throw new Error(`min must be less than max, received: [${min}, ${max}]`);
  }

  switch (inclusive) {
    case "true true": {
      return containsDecimals
        ? Math.random() * (max - min + 1) + min
        : Math.floor(Math.random() * (max - min + 1)) + min;
    }
    case "true false": {
      return containsDecimals
        ? Math.random() * (max - min) + min
        : Math.floor(Math.random() * (max - min)) + min;
    }
    case "false false": {
      return containsDecimals
        ? Math.random() * (max - min - 1) + min + 1
        : Math.floor(Math.random() * (max - min - 1)) + min + 1;
    }
    case "false true": {
      return containsDecimals
        ? Math.random() * (max - min) + min + 1
        : Math.floor(Math.random() * (max - min)) + min + 1;
    }
    default: {
      throw new Error(
        `Invalid inclusive value: "${inclusive}". Inclusive must be one of the following: "true true", "true false", "false false", "false true"`
      );
    }
  }
};

/**
 *
 * Generates an array from a *start*, *end* and *step (optional)* parameter.
 * The function is [inclusive, exclusive].
 *
 * @param start
 * @param end
 * @param step
 * @returns number[inclusive, exclusive]
 */
export const range = (
  start: number,
  end: number,
  step: number = 1
): number[] => {
  const arr: number[] = [];

  if (
    typeof step !== "number" ||
    typeof start !== "number" ||
    typeof end !== "number"
  ) {
    throw new Error(
      `range values must be numbers, received types: [start: ${typeof start}, end: ${typeof end}, step: ${typeof step}]`
    );
  }

  if (start === end) {
    return [start];
  }

  if (start > end) {
    // Case when start is greater than end
    let i = start;
    while (i > end) {
      arr.push(i);
      i -= step;
    }
  } else {
    // Case when start is less than or equal to end
    let i = start;
    while (i < end) {
      arr.push(i);
      i += step;
    }
  }

  return arr;
};

/**
 * Common debounce function that runs a function after a timer.
 *
 * The parametrized function will only be called after at least the amount in delay.
 *
 * @param {,func, delay, cancelCondition? }
 * @returns the function after the specified delay if cancel condition wasn't met
 */
export function debouncedFunction({
  func,
  delay,
  cancelCondition,
}: DebouncedFunctionProps) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return function (...args: any[]) {
    // If the cancel condition returns true, clear the timeout and exit early
    if (cancelCondition && cancelCondition(...args)) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      return;
    }

    // If there's a pending timeout, clear it.
    // This means the function is being called before the delay has expired.
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);

      // Once the function has been called, clear the timeout ID
      timeoutId = null;
    }, delay);
  };
}

/**
 * Capitalize specific or general letters in a string
 *
 * !range & at properties are 0-first!
 *
 * properties are set in order of importance
 *
 * @param s
 * @param ChangeCaseProps
 * @returns string
 */
export function toCapitalizedCase<T extends string>(
  s: T,
  { at, range, forMatching, forChars = "all" }: ChangeCaseProps = {}
) {
  if (at !== undefined && at !== null) {
    if (typeof at !== "number") {
      throw new Error(
        `'at' prop must be a number, received: '${
          typeof at === "string" ? `"${at}"` : at
        }' with a type of: ${typeof at}`
      );
    }

    if (at >= s.length) {
      throw new Error(
        `'at' prop is out of bounds, received: ${at}, while string length is: ${s.length}. Remember that 'at' is 0-first`
      );
    }

    if (at < 0) {
      throw new Error(`'at' prop cannot be negative, received: ${at}`);
    }

    const beforeChar = s.slice(0, at);
    const charToCapitalize = s.charAt(at).toUpperCase();
    const afterChar = s.slice(at + 1);

    return beforeChar + charToCapitalize + afterChar;
  }

  if (range) {
    if (!Array.isArray(range)) {
      throw new Error(
        `range prop must be an array, received: '${range}' with a type of: ${typeof range}`
      );
    }

    if (range.some((value) => typeof value !== "number")) {
      throw new Error(
        `range prop must contain only numbers, received: [${range
          .map((value) => `${typeof value === "string" ? `"${value}"` : value}`)
          .join(", ")}]`
      );
    }

    if (range[0] < 0 || range[1] < 0) {
      throw new Error(
        `range values cannot be negative, received: [${range.join(", ")}]`
      );
    }

    if (range[0] > range[1]) {
      throw new Error(
        `range values have to be succeeding, received: [${range.join(", ")}]`
      );
    }

    if (range[0] > s.length || range[1] > s.length) {
      throw new Error(
        `range values cannot be greater than the string's length, received: [${range.join(
          ", "
        )}] while string length is: ${s.length}`
      );
    }

    const capitalizedLetters = s.slice(range[0], range[1] + 1).toUpperCase();

    const beforeChars = s.slice(0, range[0]);
    const afterChars = s.slice(range[1] + 1); // Adjust to slice after the range
    return beforeChars + capitalizedLetters + afterChars;
  }

  // forMatching is a RegExp
  if (forMatching) {
    if (!(forMatching instanceof RegExp)) {
      throw new Error(
        `forMatching prop must be a RegExp, received: '${forMatching}' with a type of: ${typeof forMatching}`
      );
    }

    return s.replace(forMatching, (match) => match.toUpperCase());
  }

  switch (forChars) {
    case "all":
      return s.toUpperCase();
    case "first":
      return s.charAt(0).toUpperCase() + s.slice(1);
    case "last":
      return s.slice(0, s.length - 1) + s.charAt(s.length - 1).toUpperCase();
  }
}

/**
 * Minimize specific or general letters in a string
 *
 * !range & at properties are 0-first!
 *
 * properties are set in order of importance
 *
 * @param s
 * @param ChangeCaseProps
 * @returns string
 */
export function toMinimizedCase<T extends string>(
  s: T,
  { at, range, forMatching, forChars = "all" }: ChangeCaseProps = {}
) {
  if (at !== undefined && at !== null) {
    if (typeof at !== "number") {
      throw new Error(
        `'at' prop must be a number, received: '${
          typeof at === "string" ? `"${at}"` : at
        }' with a type of: ${typeof at}`
      );
    }

    if (at >= s.length) {
      throw new Error(
        `'at' prop is out of bounds, received: ${at}, while string length is: ${s.length}. Remember that 'at' is 0-first`
      );
    }

    if (at < 0) {
      throw new Error(`'at' prop cannot be negative, received: ${at}`);
    }

    const beforeChar = s.slice(0, at);
    const charToMinimize = s.charAt(at).toLowerCase();
    const afterChar = s.slice(at + 1);

    return beforeChar + charToMinimize + afterChar;
  }

  if (range) {
    if (!Array.isArray(range)) {
      throw new Error(
        `range prop must be an array, received: '${range}' with a type of: ${typeof range}`
      );
    }

    if (range.some((value) => typeof value !== "number")) {
      throw new Error(
        `range prop must contain only numbers, received: [${range
          .map((value) => `${typeof value === "string" ? `"${value}"` : value}`)
          .join(", ")}]`
      );
    }

    if (range[0] < 0 || range[1] < 0) {
      throw new Error(
        `range values cannot be negative, received: [${range.join(", ")}]`
      );
    }

    if (range[0] > range[1]) {
      throw new Error(
        `range values have to be succeeding, received: [${range.join(", ")}]`
      );
    }

    if (range[0] > s.length || range[1] > s.length) {
      throw new Error(
        `range values cannot be greater than the string's length, received: [${range.join(
          ", "
        )}] while string length is: ${s.length}`
      );
    }

    const minimizedLetters = s.slice(range[0], range[1] + 1).toLowerCase();

    const beforeChars = s.slice(0, range[0]);
    const afterChars = s.slice(range[1] + 1); // Adjust to slice after the range
    return beforeChars + minimizedLetters + afterChars;
  }

  // forMatching is a RegExp
  if (forMatching) {
    if (!(forMatching instanceof RegExp)) {
      throw new Error(
        `forMatching prop must be a RegExp, received: '${forMatching}' with a type of: ${typeof forMatching}`
      );
    }

    return s.replace(forMatching, (match) => match.toLowerCase());
  }

  switch (forChars) {
    case "all":
      return s.toLowerCase();
    case "first":
      return s.charAt(0).toLowerCase() + s.slice(1);
    case "last":
      return s.slice(0, s.length - 1) + s.charAt(s.length - 1).toLowerCase();
  }
}
/**
 * 
 * 
 
//
 //
 // @param obj: T extends string | number
 // @param valueToRemove: T extends string | number
 // @returns a copy of the obj with the values removed, or obj in case of error
 //
export function removeAllInstancesFrom<T extends string | number>(
  obj: T,
  valueToRemove: T
): number | string {
  if (typeof obj !== typeof valueToRemove) {
    console.error("Type of obj must be same as type of valueToRemove");
    return obj;
  }

  if (typeof obj === "string") {
    return obj.split(valueToRemove as string).join("");
  } else if (typeof obj === "number") {
    try {
      const numAsStr = String(obj);
      const valueAsStr = String(valueToRemove);

      const newObjAsStr = numAsStr.split(valueAsStr).join("");
      return Number(newObjAsStr);
    } catch (err) {
      console.error(`Error in removal of values in number ${obj}`);
      return obj;
    }
  } else {
    throw new Error(
      `Type of obj must be string or number, received type: ${typeof obj}`
    );
  }
}

*/

/**
 * Used to check if 2 objects are completely equivalent
 *
 * @param a: any
 * @param b: any
 * @returns true if equivalent, false if not
 */
export function isEquivalent(a: any, b: any): boolean {
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);

  if (aProps.length !== bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i];
    const aVal = a[propName];
    const bVal = b[propName];

    if (typeof aVal === "object" && typeof bVal === "object") {
      if (!isEquivalent(aVal, bVal)) return false;
    } else if (aVal !== bVal) {
      return false;
    }
  }

  return true;
}

/**
 * Useful when you want to remove doubles from an array, while keeping var as an array
 *
 * @param T[],
 * @param { arrayContainsObjectLiterals: boolean }: UniqueArrayProps
 * @returns array with no doubles
 */
export function uniqueArray<T>(
  array: T[],
  { arrayContainsObjectLiterals }: UniqueArrayProps = {
    arrayContainsObjectLiterals: false,
  }
): T[] {
  try {
    if (!arrayContainsObjectLiterals) {
      return [...new Set(array)];
    }

    try {
      const objectsAsString = array.map((obj) => JSON.stringify(obj));
      const uniqueObjAsStrings = [...new Set(objectsAsString)];
      const uniqueObjects = uniqueObjAsStrings.map((str) => JSON.parse(str));
      return uniqueObjects;
    } catch (err) {
      console.error("An error occurred:", err);
      return [];
    }
  } catch (unexpectedErr) {
    console.error("An error occurred:", unexpectedErr);
    return [];
  }
}

/**
 * Retrieves elements from an array based on specified indices.
 * @param fromArray The source array from which elements are retrieved.
 * @param indices An array of indices indicating the positions of elements to retrieve from `fromArray`.
 * @param options Optional configuration object of type `FillFromIndicesProps`.
 * @param options.sortIndices If `true`, sorts the `indices` array before retrieving elements.
 * @param options.compareFn Custom function to compare elements.
 * @returns An array containing elements from `fromArray` at the specified indices.
 */
export function fillFromIndices<T>(
  fromArray: T[],
  indices: number[],
  { sortIndices = false, compareFn }: FillFromIndicesProps = {}
) {
  let length = fromArray == null ? 0 : fromArray.length;
  let indicesLength = indices == null ? 0 : indices.length;

  if (!length || !indicesLength) {
    console.error("Array or indices empty");
    return [];
  }

  if (indices.some((index) => index < 0 || index >= fromArray.length)) {
    throw new Error("One of the indices is out of bounds for the given array");
  }

  if (sortIndices) {
    if (!compareFn) {
      throw new Error("compareFn is required when sortIndices is true");
    }
    
    indices.sort(compareFn);
  }

  return indices.map((index) => fromArray[index]);
}
