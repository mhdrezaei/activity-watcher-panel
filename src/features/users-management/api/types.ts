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

export type UpdateUserPayload = {
  id: string;
  name: string;
  hostname: string;
};
