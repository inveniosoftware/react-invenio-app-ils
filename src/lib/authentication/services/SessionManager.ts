import { RawUser, User } from '@api/types';

export type { User };

class SessionManager {
  user: User | null = null;
  userConfirmed: boolean = false;

  constructor() {
    this.setAnonymous();
    this.setUserConfirmed(false);
  }

  isAnonymous(): boolean {
    return this.user === null;
  }

  isAuthenticated(): boolean {
    return !this.isAnonymous();
  }

  setAnonymous(): void {
    this.user = null;
  }

  setUserConfirmed(confirmed: boolean): void {
    this.userConfirmed = confirmed;
  }

  setUser(user: RawUser): void {
    this.user = {
      id: user['id'],
      roles: user['roles'] || [],
      username: user['username'],
      fullName: user['full_name'],
      locationPid: user['location_pid'] ?? null,
    };
  }
}

export const sessionManager = new SessionManager();
