export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  username: string;
  password: string;
}

export interface LoginSuccess {
  token: string;
  expired_at: string;
}

export interface UserSuccess {
  id: number;
  full_name: string;
  username: string;
  created_at: string;
  updated_at: string;
}

export interface LoginFailed {
  username: string[];
  password: string[];
}

export interface RegisterFailed {
  full_name: string[];
  email: string[];
  username: [];
  password: [];
}
