import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { CreateUserDto, UpdateUserDto, UserDto } from "../dtos/UserDtos";

type UserFormProps = {
  mode: "create" | "edit";
  initialValues?: Partial<UserDto>;
  onSubmit: (data: CreateUserDto | UpdateUserDto) => void;
  onCancel: () => void;
  loading?: boolean;
};

const UserForm = ({
  mode,
  initialValues = {},
  onSubmit,
  onCancel,
  loading = false,
}: UserFormProps) => {
  const { t } = useTranslation();
  type FormFields = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password?: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    mode: "onBlur",
    defaultValues: {
      firstName: initialValues.firstName || "",
      lastName: initialValues.lastName || "",
      email: initialValues.email || "",
      phone: initialValues.phone || "",
      password: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (mode === "create") {
          onSubmit(data as CreateUserDto);
        } else {
          const { password, ...rest } = data;
          onSubmit({ ...rest, id: initialValues.id } as UpdateUserDto);
        }
      })}
      className="space-y-5 w-full max-w-md mx-auto"
    >
      <h3 className="text-2xl font-bold mb-2 text-center text-react-dark">
        {mode === "create" ? t("User.createUser") : t("User.editUser")}
      </h3>
      <div>
        <label className="block mb-1 font-semibold">{t("User.firstNameLabel")}</label>
        <input
          type="text"
          {...register("firstName", { required: t("User.firstNameRequired") })}
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-react ${
            errors.firstName ? "border-red-500" : ""
          }`}
        />
        {errors.firstName?.type === "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            {t("User.firstNameRequired")}
          </span>
        )}
        {errors.firstName && errors.firstName.type !== "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.firstName.message as string}
          </span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-semibold">{t("User.lastNameLabel")}</label>
        <input
          type="text"
          {...register("lastName", { required: t("User.lastNameRequired") })}
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-react ${
            errors.lastName ? "border-red-500" : ""
          }`}
        />
        {errors.lastName?.type === "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            {t("User.lastNameRequired")}
          </span>
        )}
        {errors.lastName && errors.lastName.type !== "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.lastName.message as string}
          </span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-semibold">{t("User.emailLabel")}</label>
        <input
          type="email"
          {...register("email", {
            required: t("User.emailRequired"),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t("User.emailInvalid"),
            },
          })}
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-react ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email?.type === "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            {t("User.emailRequired")}
          </span>
        )}
        {errors.email && errors.email.type !== "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.email.message as string}
          </span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-semibold">{t("User.phoneLabel")}</label>
        <input
          type="text"
          {...register("phone", {
            required: t("User.phoneRequired"),
            pattern: {
              value: /^[0-9+\-\s()]{7,20}$/,
              message: t("User.phoneInvalid"),
            },
          })}
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-react ${
            errors.phone ? "border-red-500" : ""
          }`}
        />
        {errors.phone?.type === "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            {t("User.phoneRequired")}
          </span>
        )}
        {errors.phone && errors.phone.type !== "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.phone.message as string}
          </span>
        )}
      </div>
      {mode === "create" && (
        <div>
          <label className="block mb-1 font-semibold">{t("User.passwordLabel")}</label>
          <input
            type="password"
            {...register("password", {
              required: mode === "create" ? t("User.passwordRequired") : false,
              minLength: {
                value: 6,
                message: t("User.passwordMin"),
              },
            })}
            className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-react ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password?.type === "required" && (
            <span className="text-red-500 text-sm mt-1 block">
              {t("User.passwordRequired")}
            </span>
          )}
          {errors.password && errors.password.type !== "required" && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.password.message as string}
            </span>
          )}
        </div>
      )}
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-100"
          disabled={loading}
        >
          {t("User.cancelUser")}
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-react text-white font-semibold hover:bg-[#1fc8f8] transition"
          disabled={loading}
        >
          {mode === "create" ? t("User.createUserBtn") : t("User.updateUser")}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
