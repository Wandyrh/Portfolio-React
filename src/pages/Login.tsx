import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { login } from "../services/authService";
import { setToken } from "../services/tokenService";
import type { LoginDto } from "../dtos/LoginDto";
import reactLogo from "../assets/react.svg";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ mode: "onBlur" });

  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const onSubmit = async (data: LoginFormInputs) => {
    const dto: LoginDto = {
      userName: data.email,
      password: data.password,
    };
    try {
      const result = await login(dto);
      const errorMsg =
        (result.data && typeof result.data === "object" && "message" in result.data && (result.data as any).message) ||
        result.message ||
        "Login failed";
      if (result.success && result.data?.accessToken) {
        setToken(result.data.accessToken);       
      } else {
        setToast(errorMsg);
      }
    } catch (err) {
      setToast("Error connecting to server");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white relative">
      {toast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in flex items-center gap-4 min-w-[250px] max-w-[90vw]">
          <span className="flex-1">{toast}</span>
          <button
            className="ml-2 text-white font-bold hover:text-gray-200 focus:outline-none"
            onClick={() => setToast(null)}
            aria-label="Close"
            type="button"
          >
            ×
          </button>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/90 backdrop-blur-lg px-8 py-10 rounded-3xl shadow-2xl max-w-md w-full sm:w-[400px] border border-react flex flex-col items-center"
        noValidate
      >
        <div className="flex justify-center mb-6 w-full">
          <img src={reactLogo} alt="React Logo" className="h-14 w-14" />
        </div>
        <h2 className="text-3xl font-extrabold mb-8 text-center text-react-dark w-full">Sign In</h2>
        <div className="mb-5 w-full">
          <label className="block mb-2 font-semibold text-react-dark text-left" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 transition ${
              errors.email
                ? "border-red-500 focus:ring-red-300"
                : "border-react focus:ring-react focus:border-react-dark"
            }`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            autoComplete="email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1 block">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-8 w-full">
          <label className="block mb-2 font-semibold text-react-dark text-left" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={`w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:ring-2 transition ${
              errors.password
                ? "border-red-500 focus:ring-red-300"
                : "border-react focus:ring-react focus:border-react-dark"
            }`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            autoComplete="current-password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1 block">{errors.password.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-react text-white font-bold py-2 rounded-xl hover:bg-react-dark transition text-lg shadow-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
