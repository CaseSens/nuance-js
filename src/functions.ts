import { RandomInRangeProps, DebouncedFunctionProps } from "./types";

export const randomInRange = ({
  min,
  max,
  inclusive = "true true",
  containsDecimals = false,
}: RandomInRangeProps): number => {
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
  }
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
  let timeoutId: ReturnType<typeof setTimeout> | null;
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
 * range & at properties are 0-first
 *
 * properties are set in order of importance
 */
type ChangeCaseProps = {
  at?: number;
  range?: [number, number];
  forChars?: "all" | "first" | "last";
};

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
  { at, range, forChars = "all" }: ChangeCaseProps = {}
) {
  if (at !== undefined && at !== null) {
    try {
      const beforeChar = s.slice(0, at);
      const charToCapitalize = s.charAt(at).toUpperCase();
      const afterChar = s.slice(at + 1);

      return beforeChar + charToCapitalize + afterChar;
    } catch (err) {
      console.error(err);
      return s;
    }
  }

  if (range) {
    if (range[0] < 0 || range[1] < 0) {
      console.error("range values cannot be negative");
      return s;
    } else if (range[0] > range[1]) {
      console.error("range values have to be succeeding");
      return s;
    } else if (range[0] + 1 > s.length || range[1] + 1 > s.length) {
      console.error("range values cannot be greater than the string's length");
      return s;
    }

    const capitalizedLetters = s.slice(range[0], range[1] + 1).toUpperCase();

    const beforeChars = s.slice(0, range[0]);
    const afterChars = s.slice(range[1] + 1); // Adjust to slice after the range
    return beforeChars + capitalizedLetters + afterChars;
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
  { at, range, forChars = "all" }: ChangeCaseProps = {}
) {
  if (at !== undefined && at !== null) {
    try {
      const beforeChar = s.slice(0, at);
      const charToCapitalize = s.charAt(at).toLowerCase();
      const afterChar = s.slice(at + 1);

      return beforeChar + charToCapitalize + afterChar;
    } catch (err) {
      console.error(err);
      return s;
    }
  }

  if (range) {
    if (range[0] < 0 || range[1] < 0) {
      console.error("range values cannot be negative");
      return s;
    } else if (range[0] > range[1]) {
      console.error("range values have to be succeeding");
      return s;
    } else if (range[0] + 1 > s.length || range[1] + 1 > s.length) {
      console.error("range values cannot be greater than the string's length");
      return s;
    }

    const capitalizedLetters = s.slice(range[0], range[1] + 1).toLowerCase();

    const beforeChars = s.slice(0, range[0]);
    const afterChars = s.slice(range[1] + 1);
    return beforeChars + capitalizedLetters + afterChars;
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
 * Useful when you want to remove doubles from an array, while keeping var as an array
 *
 * @param array
 * @returns array with no doubles
 */
export function uniqueArray<T>(array: T[]): T[] {
  return [...new Set(array)];
}