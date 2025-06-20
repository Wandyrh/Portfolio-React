export interface ProductCategoryDto {
  id: string;
  name: string;
  description: string;
}

export interface UpdateProductCategoryDto {
  id: string;
  name: string;
  description: string;
}

export interface CreateProductCategoryDto {
  name: string;
  description: string;
}