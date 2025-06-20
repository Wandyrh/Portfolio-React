import type { ApiResult } from "../dtos/ApiResult";
import type { PagedResult } from "../dtos/PagedResult";
import type { UserDto, CreateUserDto, UpdateUserDto } from "../dtos/UserDtos";

import { apiFetch } from "./apiFetch";

const API_URL = import.meta.env.VITE_API_URL;

export const getUsers = async (): Promise<ApiResult<UserDto[]>> => {
  const res = await apiFetch(`${API_URL}/Users`);
  return res.json();
};

export const getUserById = async (id: string): Promise<ApiResult<UserDto>> => {
  const res = await apiFetch(`${API_URL}/Users/${id}`);
  return res.json();
};

export const createUser = async (data: CreateUserDto): Promise<ApiResult<UserDto>> => {
  const res = await apiFetch(`${API_URL}/Users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateUser = async (id: string, data: UpdateUserDto): Promise<ApiResult<UserDto>> => {
  const res = await apiFetch(`${API_URL}/Users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteUser = async (id: string): Promise<ApiResult<null>> => {
  const res = await apiFetch(`${API_URL}/Users/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const getUsersPaged = async (page: number, pageSize: number): Promise<ApiResult<PagedResult<UserDto>>> => {
  const res = await apiFetch(`${API_URL}/Users/paged?page=${page}&pageSize=${pageSize}`);
  return res.json();
};