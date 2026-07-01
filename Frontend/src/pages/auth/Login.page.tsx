import { AppIcon_Element } from "components/third-party";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginInSchema, type LoginInFormData } from "components/forms/schemas";
import { AppInput_form } from "components/forms";
import { useLoginApi } from "utils/api/auth.api";
import { useAuthStore } from "store/slices";
import { setSession_Util } from "utils";

export const Login_page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { setIsAuntaticated, setToken } = useAuthStore();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isLoading },
  } = useForm<LoginInFormData>({
    resolver: zodResolver(loginInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    mutateLogin,
    getLoginLoading,
    getLoginError,
    getisErrorLogin,
    getisSuccessLogin,
    getLoginData,
  } = useLoginApi();
  const message = getLoginData?.message;
  const onSubmit: SubmitHandler<LoginInFormData> = (data) => {
    mutateLogin(data, {
      onSuccess: (response) => {
        const token = response?.user.refreshToken;
        if (token) {
          setToken(token);
          setSession_Util(token);
          setIsAuntaticated(true);
          navigate("/");
        }
      },
    });
  };
  return (
    <>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <AppIcon_Element
            icon="fa-solid:robot"
            className="text-4xl text-secondary animate-pulse"
          />
          <span className="text-2xl font-bold  bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            FutureTech
          </span>
        </div>
        <h2 className="text-2xl font-bold mt-4">Welcome Back</h2>
        <p className="text-base-content/60 text-sm mt-2">
          Sign in to access your futuristic dashboard
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <AppInput_form<LoginInFormData>
          name="email"
          control={control}
          label="Email Address"
          prefixIcon={
            <AppIcon_Element
              icon="tabler:mail"
              className="text-lg text-gray-400"
            />
          }
        />
        <AppInput_form<LoginInFormData>
          name="password"
          type={showPassword ? "text" : "password"}
          control={control}
          label="Password"
          prefixIcon={
            <AppIcon_Element
              icon="solar:lock-linear"
              className="text-lg text-gray-400"
            />
          }
          suffixIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
            >
              {showPassword ? (
                <AppIcon_Element icon="lucide:eye-off" size={"20"} />
              ) : (
                <AppIcon_Element icon="solar:eye-linear" size={"20"} />
              )}
            </button>
          }
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="checkbox checkbox-primary checkbox-sm"
            />
            <span className="text-sm">Remember me</span>
          </label>
          <Link
            to="/forgot/password"
            className="text-sm text-primary hover:text-primary-focus transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        {getisErrorLogin && (
          <div className="alert alert-error mb-6 animate-shake">
            <span>{getLoginError?.message}</span>
          </div>
        )}
        {getisSuccessLogin && (
          <div className="alert alert-success mb-6 animate-shake">
            <span>{message}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || getLoginLoading}
          className="btn btn-primary w-full relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading || getLoginLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                Sign In <AppIcon_Element icon="tabler:arrow-right" />
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </form>

      {/* Social Login */}
      {/* <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-base-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-base-100/80 text-base-content/60">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <button
            //   onClick={() => socialLogin('google')}
            className="btn btn-ghost btn-sm border border-base-300 hover:border-primary transition-colors"
          >
            <AppIcon_Element
              icon="streamline-logos:google-plus-logo-1-solid"
              className="text-xl"
            />
          </button>
          <button
            //   onClick={() => socialLogin('github')}
            className="btn btn-ghost btn-sm border border-base-300 hover:border-primary transition-colors"
          >
            <AppIcon_Element icon="mynaui:github" className="text-xl" />
          </button>
          <button
            //   onClick={() => socialLogin('twitter')}
            className="btn btn-ghost btn-sm border border-base-300 hover:border-primary transition-colors"
          >
            <AppIcon_Element icon="line-md:twitter" className="text-xl" />
          </button>
        </div>
      </div> */}

      {/* Register Link */}
      <div className="mt-8 text-center">
        <p className="text-sm text-base-content/60">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary hover:text-primary-focus font-medium transition-colors"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login_page;
