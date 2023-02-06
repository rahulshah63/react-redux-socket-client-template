export interface ILoginSuccessResponse {
  data(data: any): unknown;
  name: string;
  job: string;
  id: string;
  createdAt: string;
}

export interface AuthState {
  name: string;
  job: string;
  id: string;
  createdAt: string;
  submitting: boolean;
  isAuthenticated: boolean;
}

export interface ILoginUserPayload {
  username: string;
  password: string;
}
export interface ILoginResponse {}
