export interface IDatasRes {
  page: number;
  total: number;
  data: any[];
}

export interface IUser {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IUserRes {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  roles: string[];
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IResetPasswordRequest {
  email: string;
}

export interface IUpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface IRole {
  id: number;
  name: string;
}

export interface ISession {
  userId: string;
  token: string;
}

export interface IAuthService {
  register(data: IRegisterRequest): Promise<IAuthResponse>;
  login(data: ILoginRequest): Promise<IAuthResponse>;
  resetPassword(data: IResetPasswordRequest): Promise<void>;
  updatePassword(userId: string, data: IUpdatePasswordRequest): Promise<void>;
}
