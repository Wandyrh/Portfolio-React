import type { ApiResult } from "../dtos/ApiResult";
import type { PagedResult } from "../dtos/PagedResult";
import type {
  ProductCategoryDto,
  CreateProductCategoryDto,
  UpdateProductCategoryDto,
} from "../dtos/ProductCategoryDtos";

import { apiFetch } from "./apiFetch";

const API_URL = import.meta.env.VITE_API_URL;

export const getProductCategories = async (): Promise<ApiResult<ProductCategoryDto[]>> => {
  const res = await apiFetch(`${API_URL}/ProductCategories`);
  return res.json();
};

export const getProductCategoryById = async (id: string): Promise<ApiResult<ProductCategoryDto>> => {
  const res = await apiFetch(`${API_URL}/ProductCategories/${id}`);
  return res.json();
};

export const createProductCategory = async (data: CreateProductCategoryDto): Promise<ApiResult<ProductCategoryDto>> => {
  const res = await apiFetch(`${API_URL}/ProductCategories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateProductCategory = async (id: string, data: UpdateProductCategoryDto): Promise<ApiResult<ProductCategoryDto>> => {
  const res = await apiFetch(`${API_URL}/ProductCategories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteProductCategory = async (id: string): Promise<ApiResult<null>> => {
  const res = await apiFetch(`${API_URL}/ProductCategories/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const getProductCategoriesPaged = async (page: number, pageSize: number): Promise<ApiResult<PagedResult<ProductCategoryDto>>> => {
  const res = await apiFetch(`${API_URL}/ProductCategories/paged?page=${page}&pageSize=${pageSize}`);
  return res.json();
};