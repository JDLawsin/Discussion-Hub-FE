export type ErrorState<T> = Partial<Record<keyof T, string[]>>;

export type Nullable<T> = T | null;

export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: Nullable<string>;
  created_at: string;
  updated_at: string;
};

export type AuthenticatedUser = {
  user: User;
  token: string;
};

export type ApiResponse<T> = {
  data: T;
};
