import type { LoginFormData, RegisterFormData } from "../schemas/backendSchema";

export interface MyBackendError {
  data: {
    message: string;
  };
  status: number;
}

export interface RegisterResponse {
  token: string;
  message: string;
  data: RegisterFormData;
}

export interface LoginResponse {
  token: string;
  message: string;
  data: LoginFormData;
}
