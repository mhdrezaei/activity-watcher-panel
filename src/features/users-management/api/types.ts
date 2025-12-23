/* ============================
   API TYPES
============================ */

export interface UserApiResponse {
  id: string;
  name: string;
  hostname: string;
  active: boolean;
  created: string;
  updated: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type UpdateUserPayload = {
  id: string;
  name: string;
  hostname: string;
};
