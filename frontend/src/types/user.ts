export type UserRole = 'ADMIN' | 'EMPLEADO';

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
}

export interface UserCreateRequest {
  name: string;
  email: string;
  password: string;
}

export interface UserRoleUpdateRequest {
  roleName: UserRole;
}
