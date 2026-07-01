// You'll need to create this service

import { AppIcon_Element } from "components/third-party";
import { Link, useParams } from "react-router";
import { useVarifyEmailApi } from "utils/api";

export const VerifyEmail_page = () => {
  const { token } = useParams<{ token: string }>();
  const {
    verifyEmailIsSuccess,
    verifyEmailIsError,
    verifyEmailErrorMessage,
    verifyEmailData,
    verifyEmailLoading,
  } = useVarifyEmailApi(token!);
  // Render loading state
  if (verifyEmailLoading) {
    return (
      <div className="text-center">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary rounded-full blur-xl opacity-30 animate-pulse"></div>
          <AppIcon_Element
            icon="lucide:loader"
            className="text-6xl text-primary animate-spin relative z-10"
          />
        </div>
        <h2 className="text-2xl font-bold mt-6">Verifying Email</h2>
        <p className="text-base-content/60 mt-2">
          Please wait while we verify your email address...
        </p>
        <div className="mt-4 flex justify-center">
          <div className="w-48 h-1 bg-base-300 rounded-full overflow-hidden">
            <div className="h-full bg-linear-to-r from-primary to-secondary animate-pulse w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative group">
        {/* Glow effect */}
        <div
          className={`absolute -inset-1 bg-linear-to-r rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 ${
            verifyEmailIsSuccess
              ? "from-success to-primary"
              : verifyEmailIsError
                ? "from-warning to-accent"
                : "from-error to-warning"
          }`}
        ></div>

        <div className="relative bg-base-100/80 backdrop-blur-xl rounded-3xl p-8 border border-base-300/50 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-4">
              <AppIcon_Element
                icon="fa-solid:robot"
                className="text-4xl text-primary animate-pulse"
              />
              <span className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                FutureTech
              </span>
            </div>
          </div>

          {/* Status Icon */}
          <div className="flex justify-center mb-6">
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center ${
                verifyEmailIsSuccess
                  ? "bg-success/20"
                  : verifyEmailIsError
                    ? "bg-error/20"
                    : "bg-warning/20"
              }`}
            >
              {verifyEmailIsSuccess && (
                <AppIcon_Element
                  icon="prime:check-circle"
                  className="text-5xl text-success animate-bounce"
                />
              )}
              {verifyEmailIsError && (
                <AppIcon_Element
                  icon="lucide:circle-x"
                  className="text-5xl text-error animate-shake"
                />
              )}
            </div>
          </div>

          {/* Status Message */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {verifyEmailIsSuccess && "Email Verified! 🎉"}
              {verifyEmailIsError && `${verifyEmailErrorMessage?.message}`}
            </h2>
          </div>

          {/* Resend Message */}
          {(verifyEmailIsSuccess || verifyEmailIsError) && (
            <div
              className={`alert ${verifyEmailIsSuccess ? "alert-success" : "alert-error"} mb-4 animate-fadeInUp`}
            >
              <span>
                {verifyEmailIsSuccess
                  ? verifyEmailData?.message || "Verification successful!"
                  : verifyEmailErrorMessage?.message}
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            {verifyEmailIsSuccess && (
              <>
                <Link
                  to="/login"
                  className="btn btn-primary w-full relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <AppIcon_Element icon="prime:check-circle" /> Continue to
                    Login
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link to="/" className="btn btn-ghost w-full">
                  Go to Home
                </Link>
              </>
            )}

            {verifyEmailIsError && (
              <>
                <Link to="/login" className="btn btn-ghost w-full">
                  Back to Login
                </Link>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-base-content/60">
              Need help?{" "}
              <Link
                to="/contact"
                className="text-primary hover:text-primary-focus transition-colors"
              >
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Decorative elements */}
      <div className="mt-8 text-center text-xs text-base-content/30">
        <p>Secure email verification powered by FutureTech</p>
        <div className="flex justify-center gap-4 mt-2">
          <AppIcon_Element
            icon="fa7-solid:shield-alt"
            className="text-primary/50"
          />
          <AppIcon_Element icon="tabler:mail" className="text-secondary/50" />
          <AppIcon_Element
            icon="prime:check-circle"
            className="text-success/50"
          />
        </div>
      </div>
    </>
  );
};

export default VerifyEmail_page;
