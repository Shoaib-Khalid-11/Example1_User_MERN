import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterApi } from "utils/api/auth.api";
import { AppInput_form } from "components/forms";
import {
  registrationSchema,
  type RegistrationFormData,
} from "components/forms/schemas";
import { getPasswordStrength } from "components/helper";
import { AppIcon_Element } from "components/third-party";
import { useState } from "react";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";

export const Registration_page = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { isLoading },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const password = useWatch({
    control,
    name: "password",
  });

  const confirmPassword = useWatch({
    control,
    name: "confirmPassword",
  });

  const passwordStrength = getPasswordStrength(password ?? "");
  const { mutateRegister } = useRegisterApi();
  const onSubmit: SubmitHandler<RegistrationFormData> = (data) => {
    mutateRegister(data); // Call the register API
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
          <span className="text-2xl font-bold bg-linear-to-r from-secondary to-accent bg-clip-text text-transparent">
            FutureTech
          </span>
        </div>
        <h2 className="text-2xl font-bold mt-4">Create Account</h2>
        <p className="text-base-content/60 text-sm mt-2">
          Join the future of technology
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <AppInput_form<RegistrationFormData>
          name="fullName"
          control={control}
          label="Full Name"
          prefixIcon={
            <AppIcon_Element
              icon="prime:user"
              className="text-lg text-gray-400"
            />
          }
        />
        <AppInput_form<RegistrationFormData>
          name="username"
          control={control}
          label="User Name"
          prefixIcon={
            <AppIcon_Element
              icon="prime:user"
              className="text-lg text-gray-400"
            />
          }
        />

        {/* Email */}
        <AppInput_form<RegistrationFormData>
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

        {/* Password */}
        <AppInput_form<RegistrationFormData>
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
        <div className="mt-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((bar) => (
              <div
                key={bar}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  bar <= passwordStrength / 25
                    ? passwordStrength >= 75
                      ? "bg-success"
                      : passwordStrength >= 50
                        ? "bg-warning"
                        : "bg-error"
                    : "bg-base-300"
                }`}
              />
            ))}
          </div>

          <p className="text-xs mt-1 text-base-content/60">
            {passwordStrength >= 75
              ? "Strong"
              : passwordStrength >= 50
                ? "Medium"
                : passwordStrength >= 25
                  ? "Weak"
                  : "Very Weak"}{" "}
            password
          </p>
        </div>

        {/* Confirm Password */}
        <AppInput_form<RegistrationFormData>
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          control={control}
          label="Confirm Password"
          prefixIcon={
            <AppIcon_Element
              icon="solar:lock-linear"
              className="text-lg text-gray-400"
            />
          }
          suffixIcon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
            >
              {showConfirmPassword ? (
                <AppIcon_Element icon="lucide:eye-off" size={"20"} />
              ) : (
                <AppIcon_Element icon="solar:eye-linear" size={"20"} />
              )}
            </button>
          }
        />
        {confirmPassword && (
          <div className="mt-1 text-sm">
            {password === confirmPassword ? (
              <span className="text-success flex items-center gap-1">
                <AppIcon_Element icon="tabler:check" />
                Passwords match
              </span>
            ) : (
              <span className="text-error flex items-center gap-1">
                <AppIcon_Element icon="iconamoon:close-duotone" />
                Passwords don't match
              </span>
            )}
          </div>
        )}

        {/* Terms */}
        <div className="form-control">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="acceptTerms"
              // checked={formData.acceptTerms}
              // onChange={handleChange}
              className="checkbox checkbox-secondary checkbox-sm mt-1"
            />
            <span className="text-sm">
              I agree to the{" "}
              <Link
                to="/terms"
                className="text-secondary hover:text-secondary-focus"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-secondary hover:text-secondary-focus"
              >
                Privacy Policy
              </Link>
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-secondary w-full relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                Create Account <AppIcon_Element icon="tabler:arrow-right" />
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-linear-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </form>

      {/* Login Link */}
      <div className="mt-8 text-center">
        <p className="text-sm text-base-content/60">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-secondary hover:text-secondary-focus font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
};

export default Registration_page;
