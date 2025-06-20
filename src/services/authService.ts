import type { LoginDto } from "../dtos/LoginDto";
import type { LoginUserResponseDTO } from "../dtos/LoginUserResponseDTO";
import type { ApiResult } from "../dtos/ApiResult";

import { removeToken } from "./tokenService";

const apiUrl = import.meta.env.VITE_API_URL || "";

export async function login(dto: LoginDto): Promise<ApiResult<LoginUserResponseDTO>> {
  const response = await fetch(`${apiUrl}/Authentication/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dto)
  });

  const result: ApiResult<LoginUserResponseDTO> = await response.json();
  return result;
}

export function logout() {
  removeToken();
}