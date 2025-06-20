import { useForm } from "react-hook-form";
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
        {mode === "create" ? "Create User" : "Edit User"}
      </h3>
      <div>
        <label className="block mb-1 font-semibold">First Name</label>
        <input
          type="text"
          {...register("firstName", { required: "First name is required" })}
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-react ${
            errors.firstName ? "border-red-500" : ""
          }`}
        />
        {errors.firstName?.type === "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            First name is required
          </span>
        )}
        {errors.firstName && errors.firstName.type !== "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.firstName.message as string}
          </span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-semibold">Last Name</label>
        <input
          type="text"
          {...register("lastName", { required: "Last name is required" })}
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-react ${
            errors.lastName ? "border-red-500" : ""
          }`}
        />
        {errors.lastName?.type === "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            Last name is required
          </span>
        )}
        {errors.lastName && errors.lastName.type !== "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.lastName.message as string}
          </span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-semibold">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-react ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email?.type === "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            Email is required
          </span>
        )}
        {errors.email && errors.email.type !== "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.email.message as string}
          </span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-semibold">Phone</label>
        <input
          type="text"
          {...register("phone", {
            required: "Phone is required",
            pattern: {
              value: /^[0-9+\-\s()]{7,20}$/,
              message: "Invalid phone number",
            },
          })}
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-react ${
            errors.phone ? "border-red-500" : ""
          }`}
        />
        {errors.phone?.type === "required" && (
          <span className="text-red-500 text-sm mt-1 block">
            Phone is required
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
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            {...register("password", {
              required: mode === "create" ? "Password is required" : false,
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-react ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password?.type === "required" && (
            <span className="text-red-500 text-sm mt-1 block">
              Password is required
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
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-react text-white font-semibold hover:bg-[#1fc8f8] transition"
          disabled={loading}
        >
          {mode === "create" ? "Create" : "Update"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
