// Define a TypeScript interface for your state
export interface IUserProfile {
  isAuthenticated: boolean;
  userId: number | null;
  role: string | null;
  profile: string;
  firstName: string;
  lastName: string;
  token: string;
  expires: Date | null | string;
}

// Define possible actions with their payloads
export type AuthAction =
  | { type: "LOGIN"; payload: IUserProfile }
  | { type: "LOGOUT" };
