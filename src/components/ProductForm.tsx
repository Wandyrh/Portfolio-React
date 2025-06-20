import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
        {mode === "edit" ? t("Product.editProduct") : t("Product.addProductForm")}
      </h3>
      <div>
        <label className="block mb-1 font-semibold">{t("Product.nameLabel")}</label>
        <input
          type="text"
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-react ${
            errors.name ? "border-red-500" : ""
          }`}
          {...register("name", {
            required: t("Product.nameRequired"),
          })}
          disabled={loading}
        />
        {errors.name?.type === "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            {t("Product.nameRequired")}
          </span>
        )}
        {errors.name && errors.name.type !== "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.name.message as string}
          </span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-semibold">{t("Product.descriptionLabel")}</label>
        <textarea
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-react ${
            errors.description ? "border-red-500" : ""
          }`}
          {...register("description", {
            required: t("Product.descriptionRequired"),
          })}
          disabled={loading}
        />
        {errors.description?.type === "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            {t("Product.descriptionRequired")}
          </span>
        )}
        {errors.description && errors.description.type !== "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.description.message as string}
          </span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-semibold">{t("Product.categoryLabel")}</label>
        <select
          {...register("categoryId", { required: t("Product.categoryRequired") })}
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-react ${
            errors.categoryId ? "border-red-500" : ""
          }`}
          disabled={loading}
        >
          <option value="">{t("Product.selectCategory")}</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        {errors.categoryId?.type === "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            {t("Product.categoryRequired")}
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
          {t("General.cancel")}
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-react text-white font-semibold hover:bg-[#1fc8f8] transition"
          disabled={loading}
        >
          {mode === "edit" ? t("General.update") : t("General.create")}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;