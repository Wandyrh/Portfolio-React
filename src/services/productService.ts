import type { ApiResult } from "../dtos/ApiResult";
import type { PagedResult } from "../dtos/PagedResult";
import type {
  ProductDto,
  CreateProductDto,
  UpdateProductDto,
} from "../dtos/ProductDtos";
import { apiFetch } from "./apiFetch";

const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async (): Promise<ApiResult<ProductDto[]>> => {
  const res = await apiFetch(`${API_URL}/Products`);
  return res.json();
};

export const getProductById = async (id: string): Promise<ApiResult<ProductDto>> => {
  const res = await apiFetch(`${API_URL}/Products/${id}`);
  return res.json();
};

export const createProduct = async (data: CreateProductDto): Promise<ApiResult<ProductDto>> => {
  const res = await apiFetch(`${API_URL}/Products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateProduct = async (id: string, data: UpdateProductDto): Promise<ApiResult<ProductDto>> => {
  const res = await apiFetch(`${API_URL}/Products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteProduct = async (id: string): Promise<ApiResult<null>> => {
  const res = await apiFetch(`${API_URL}/Products/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const getProductsPaged = async (page: number, pageSize: number): Promise<ApiResult<PagedResult<ProductDto>>> => {
  const res = await apiFetch(`${API_URL}/Products/paged?page=${page}&pageSize=${pageSize}`);
  return res.json();
};