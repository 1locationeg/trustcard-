export type UserRole = "agent" | "broker" | "consultant";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  trustScore: number;
  isVerified: boolean;
  createdAt: Date;
}

export interface Session {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}
