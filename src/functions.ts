import { RandomInRangeProps } from "./types";

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
