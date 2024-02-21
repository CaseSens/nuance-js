export type RandomInRangeProps = {
  min: number;
  max: number;
  inclusive?: "true true" | "false false" | "true false" | "false true";
  containsDecimals?: boolean;
}
