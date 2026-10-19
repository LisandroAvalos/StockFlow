import axiosClient from './axiosClient';
import { USER_ENDPOINTS } from './endpoints';
import type { UserResponse, UserCreateRequest, UserRoleUpdateRequest } from '../types/user';

export async function getUsers(): Promise<UserResponse[]> {
  const response = await axiosClient.get<UserResponse[]>(USER_ENDPOINTS.BASE);
  return response.data;
}

export async function createUser(data: UserCreateRequest): Promise<UserResponse> {
  const response = await axiosClient.post<UserResponse>(USER_ENDPOINTS.BASE, data);
  return response.data;
}

export async function updateUserRole(
  id: number,
  data: UserRoleUpdateRequest
): Promise<UserResponse> {
  const response = await axiosClient.patch<UserResponse>(USER_ENDPOINTS.ROLE(id), data);
  return response.data;
}

export async function deleteUser(id: number): Promise<UserResponse> {
  const response = await axiosClient.delete<UserResponse>(USER_ENDPOINTS.MUTATE_BY_ID(id));
  return response.data;
}
