export interface WorksPerRoleSeries {
  role: string;
  headcount: number;
  data: number[];
  avg: number;
}

export interface WorksPerRoleResponse {
  range: string;
  aggregation: string;
  metric: string;
  normalize: string;
  denominator: string;
  from: string;
  to: string;
  labels: string[];
  series: WorksPerRoleSeries[];
}

export interface WorksPerRoleParams {
  range?: string;
  roles?: string;
  metric?: string;
  normalize?: string;
  denominator?: string;
}
