import React from "react";
import { useForm } from "react-hook-form";
import type { CreateProductCategoryDto, UpdateProductCategoryDto, ProductCategoryDto } from "../dtos/ProductCategoryDtos";

type CategoryFormProps = {
  mode: "create" | "edit";
  initialValues?: Partial<ProductCategoryDto>;
  onSubmit: (data: CreateProductCategoryDto | UpdateProductCategoryDto) => void;
  onCancel: () => void;
  loading?: boolean;
};

const CategoryForm = ({
  mode,
  initialValues = {},
  onSubmit,
  onCancel,
  loading = false,
}: CategoryFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateProductCategoryDto>({
    mode: "onBlur",
    defaultValues: {
      name: initialValues.name || "",
      description: initialValues.description || "",
    },
  });

  React.useEffect(() => {
    reset({
      name: initialValues.name || "",
      description: initialValues.description || "",
    });
  }, [initialValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 w-full"
    >
      <h3 className="text-2xl font-bold mb-2 text-center text-react-dark">
        {mode === "edit" ? "Edit Category" : "Add Category"}
      </h3>
      <div>
        <label className="block mb-1 font-semibold">Name</label>
        <input
          type="text"
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-react ${
            errors.name ? "border-red-500" : ""
          }`}
          {...register("name", { required: "Name is required" })}
          disabled={loading}
        />
        {errors.name && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.name.message}
          </span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-semibold">Description</label>
        <textarea
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-react ${
            errors.description ? "border-red-500" : ""
          }`}
          {...register("description", { required: "Description is required" })}
          disabled={loading}
        />
        {errors.description && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.description.message}
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

export default CategoryForm;