export interface ProductDto {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  categoryName: string;
}

export interface UpdateProductDto {
  id: string;
  categoryId: string;
  name: string;
  description: string;
}

export interface CreateProductDto {
  categoryId: string;
  name: string;
  description: string;
}