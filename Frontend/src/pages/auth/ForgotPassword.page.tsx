import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPasswordApi } from "utils/api/auth.api";
import { AppInput_form } from "components/forms";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "components/forms/schemas";
import { AppIcon_Element } from "components/third-party";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";

export const ForgotPassword_page = () => {
  const {
    control,
    handleSubmit,
    formState: { isLoading, isSubmitted },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const {
    mutateForgotPassword,
    getisErrorForgotPassword,
    getForgotPasswordError,
    getisSuccessForgotPassword,
    getForgotPasswordData,
  } = useForgotPasswordApi();
  const message = getForgotPasswordData?.message; // Add your success message here
  const onSubmit: SubmitHandler<ForgotPasswordFormData> = (data) => {
    mutateForgotPassword(data);
  };
  return (
    <>
      {/* Back Button */}
      <Link
        to="/login"
        className="inline-flex items-center gap-2 text-base-content/60 hover:text-base-content transition-colors mb-6"
      >
        <AppIcon_Element icon="tabler:arrow-left" /> Back to Sign In
      </Link>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <AppIcon_Element
            icon="fa-solid:robot"
            className="text-4xl text-accent animate-pulse"
          />
          <span className="text-2xl font-bold bg-linear-to-r from-accent to-primary bg-clip-text text-transparent">
            FutureTech
          </span>
        </div>
        <h2 className="text-2xl font-bold mt-4">Reset Password</h2>
        <p className="text-base-content/60 text-sm mt-2">
          Enter your email and we'll send you instructions to reset your
          password
        </p>
      </div>
      {!isSubmitted ? (
        <>
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <AppInput_form<ForgotPasswordFormData>
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
            {getisErrorForgotPassword && (
              <div className="alert alert-error mb-6 animate-shake">
                <span>{getForgotPasswordError?.message}</span>
              </div>
            )}
            {getisSuccessForgotPassword && (
              <div className="alert alert-success mb-6 animate-shake">
                <span>{message}</span>
              </div>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-accent w-full relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Send Reset Instructions"
                )}
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>
        </>
      ) : (
        // Success State
        <div className="text-center py-6">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center animate-bounce">
              <AppIcon_Element
                icon="prime:check-circle"
                className="text-4xl text-success"
                size={40}
              />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">Check Your Email</h3>
          <p className="text-base-content/60 text-sm mb-6">
            We've sent password reset instructions to{" "}
            <span className="font-medium text-base-content">{"email"}</span>
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/login" className="btn btn-primary w-full">
              Back to Sign In
            </Link>
            <button
              // onClick={() => setIsSubmitted(false)}
              className="btn btn-ghost btn-sm"
            >
              Resend Email
            </button>
          </div>
        </div>
      )}
      {/* Footer */}
      {!isSubmitted && (
        <div className="mt-8 text-center">
          <p className="text-sm text-base-content/60">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-accent hover:text-accent-focus font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default ForgotPassword_page;
