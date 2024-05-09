export type RandomInRangeProps = {
  min: number;
  max: number;
  inclusive?: "true true" | "false false" | "true false" | "false true";
  containsDecimals?: boolean;
};

export type DebouncedFunctionProps = {
  func: Function;
  delay: number;
  cancelCondition?: (...args: any[]) => boolean;
};

/**
 * range & at properties are 0-first
 *
 * properties are set in order of importance
 */
export type ChangeCaseProps = {
  at?: number;
  range?: [number, number];
  forChars?: "all" | "first" | "last";
};

export type UniqueArrayProps = {
  arrayContainsObjectLiterals: boolean;
};

export type FillFromIndicesProps = {
  sortIndices?: boolean;
  inOrder?: 'ascending' | 'descending';
};