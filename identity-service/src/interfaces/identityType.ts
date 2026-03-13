import e = require("express");

export interface IUser{
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IAuthResponse {
    token: string;
}

export interface IRegisterRequest {
    name: string;
    email: string;
    password: string;
    number: string;
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
    id: string;
    name: string;}

export interface IAuthService {
    register(data: IRegisterRequest): Promise<IAuthResponse>;
    login(data: ILoginRequest): Promise<IAuthResponse>;
    resetPassword(data: IResetPasswordRequest): Promise<void>;
    updatePassword(userId: string, data: IUpdatePasswordRequest): Promise<void>;
}
