export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

// Usuario es lo que se guarda en el contexto y en localStorage['usuario'].
// Se deriva de LoginResponse sin el token (que se guarda por separado en
// localStorage['token']) para no duplicar la definición de los campos.
export type Usuario = Omit<LoginResponse, 'token'>;