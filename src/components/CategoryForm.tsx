import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
        {mode === "edit" ? t("Category.editCategoryForm") : t("Category.addCategoryForm")}
      </h3>
      <div>
        <label className="block mb-1 font-semibold">{t("Category.nameCategoryLabel")}</label>
        <input
          type="text"
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-react ${
            errors.name ? "border-red-500" : ""
          }`}
          {...register("name", { required: t("Category.nameCategoryRequired") })}
          disabled={loading}
        />
        {errors.name?.type === "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            {t("Category.nameCategoryRequired")}
          </span>
        )}
        {errors.name && errors.name.type !== "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.name.message}
          </span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-semibold">{t("Category.descriptionCategoryLabel")}</label>
        <textarea
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-react ${
            errors.description ? "border-red-500" : ""
          }`}
          {...register("description", { required: t("Category.descriptionCategoryRequired") })}
          disabled={loading}
        />
        {errors.description?.type === "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            {t("Category.descriptionCategoryRequired")}
          </span>
        )}
        {errors.description && errors.description.type !== "required" && (
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
          {t("Category.cancelCategory")}
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-react text-white font-semibold hover:bg-[#1fc8f8] transition"
          disabled={loading}
        >
          {mode === "edit" ? t("Category.updateCategory") : t("Category.createCategory")}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;