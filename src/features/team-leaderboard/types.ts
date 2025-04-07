export interface Athlete {
  id: number;
  name: string;
  avatar: string;
  group: string;
  volume: number;
  completion: number;
  accuracy: number;
  trend: "up" | "down" | "same";
}

export type SortColumn =
  | "name"
  | "group"
  | "volume"
  | "completion"
  | "accuracy";
export type SortDirection = "asc" | "desc";
export type AthleteGroup =
  | "all"
  | "varsity boys"
  | "varsity girls"
  | "jv boys"
  | "jv girls";
export type Metric = "volume" | "completion" | "accuracy";
export type DateRangeType = "this-week" | "last-week" | "custom";
