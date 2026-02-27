export interface User {
  id: string | number;
  roles: string[];
  username: string;
  fullName: string;
  locationPid: string | null;
}

/* eslint-disable camelcase */
export interface RawUser {
  id: string | number;
  roles?: string[];
  username: string;
  full_name: string;
  location_pid?: string | null;
}
/* eslint-enable camelcase */
