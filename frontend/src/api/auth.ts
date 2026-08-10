import axiosClient from './axiosClient';
import { AUTH_ENDPOINTS } from './endpoints';
import type { LoginRequest, LoginResponse } from '../types/auth';

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await axiosClient.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, data);
  return response.data;
}