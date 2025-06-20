import React from "react";
import { useForm } from "react-hook-form";
import type { CreateProductDto, UpdateProductDto, ProductDto } from "../dtos/ProductDtos";
import type { ProductCategoryDto } from "../dtos/ProductCategoryDtos";

type ProductFormProps = {
  mode: "create" | "edit";
  initialValues?: Partial<ProductDto>;
  categories: ProductCategoryDto[];
  onSubmit: (data: CreateProductDto | UpdateProductDto) => void;
  onCancel: () => void;
  loading?: boolean;
};

const ProductForm = ({
  mode,
  initialValues = {},
  categories,
  onSubmit,
  onCancel,
  loading = false,
}: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateProductDto>({
    mode: "onBlur",
    defaultValues: {
      categoryId: initialValues.categoryId || "",
      name: initialValues.name || "",
      description: initialValues.description || "",
    },
  });

  React.useEffect(() => {
    reset({
      categoryId: initialValues.categoryId || "",
      name: initialValues.name || "",
      description: initialValues.description || "",
    });
  }, [
    initialValues.categoryId,
    initialValues.name,
    initialValues.description,
    reset
  ]);

  const submitHandler = (data: CreateProductDto) => {
    if (mode === "create") {
      onSubmit(data);
    } else {
      onSubmit({ ...data, id: initialValues.id } as UpdateProductDto);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-5 w-full"
    >
      <h3 className="text-2xl font-bold mb-2 text-center text-react-dark">
        {mode === "edit" ? "Edit Product" : "Add Product"}
      </h3>
      <div>
        <label className="block mb-1 font-semibold">Name</label>
        <input
          type="text"
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-react ${
            errors.name ? "border-red-500" : ""
          }`}
          {...register("name", {
            required: "Name is required",           
          })}
          disabled={loading}
        />
        {errors.name?.type === "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            Name is required
          </span>
        )}
        {errors.name && errors.name.type !== "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.name.message as string}
          </span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-semibold">Description</label>
        <textarea
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-react ${
            errors.description ? "border-red-500" : ""
          }`}
          {...register("description", {
            required: "Description is required",   
          })}
          disabled={loading}
        />
        {errors.description?.type === "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            Description is required
          </span>
        )}
        {errors.description && errors.description.type !== "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.description.message as string}
          </span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-semibold">Category</label>
        <select
          {...register("categoryId", { required: "Category is required" })}
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-react ${
            errors.categoryId ? "border-red-500" : ""
          }`}
          disabled={loading}
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        {errors.categoryId?.type === "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            Category is required
          </span>
        )}
        {errors.categoryId && errors.categoryId.type !== "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.categoryId.message as string}
          </span>
        )}
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-100"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-react text-white font-semibold hover:bg-[#1fc8f8] transition"
          disabled={loading}
        >
          {mode === "edit" ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;