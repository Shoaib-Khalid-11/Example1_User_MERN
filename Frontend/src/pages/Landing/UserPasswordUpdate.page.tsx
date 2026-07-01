import { zodResolver } from "@hookform/resolvers/zod";
import { AppInput_form } from "components/forms";
import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from "components/forms/schemas";
import { AppIcon_Element } from "components/third-party";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useParams } from "react-router";
import { useUserByIDUpdatePasswordApi } from "utils/api";

export const UserPasswordUpdate_page = () => {
  const { id } = useParams<{ id: string }>();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { mutateUserByIDUpdatePassword, getUserByIDUpdatePasswordLoading } =
    useUserByIDUpdatePasswordApi(id!);
  const {
    control,
    handleSubmit,
    // formState: { isLoading },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      confirmPassword: "",
      newPassword: "",
      oldPassword: "",
    },
  });
  const onSubmit: SubmitHandler<ChangePasswordFormData> = (data) => {
    console.log(data);
    mutateUserByIDUpdatePassword(data);
  };
  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-base-100/80 backdrop-blur-xl rounded-2xl p-6 border border-base-300/50 shadow-xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <AppIcon_Element
                icon="solar:lock-linear"
                className="text-accent"
              />
              Update Password
            </h3>
            <p className="text-sm text-base-content/60 mb-4">
              Leave fields blank to keep current password
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* New Password */}
              <AppInput_form<ChangePasswordFormData>
                name="oldPassword"
                type={showOldPassword ? "text" : "password"}
                control={control}
                label="Old Password"
                prefixIcon={
                  <AppIcon_Element
                    icon="solar:lock-linear"
                    className="text-lg text-gray-400"
                  />
                }
                suffixIcon={
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                  >
                    {showOldPassword ? (
                      <AppIcon_Element icon="lucide:eye-off" size={"20"} />
                    ) : (
                      <AppIcon_Element icon="solar:eye-linear" size={"20"} />
                    )}
                  </button>
                }
              />

              {/* Confirm Password */}
              <AppInput_form<ChangePasswordFormData>
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                control={control}
                label="New Password"
                prefixIcon={
                  <AppIcon_Element
                    icon="solar:lock-linear"
                    className="text-lg text-gray-400"
                  />
                }
                suffixIcon={
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                  >
                    {showNewPassword ? (
                      <AppIcon_Element icon="lucide:eye-off" size={"20"} />
                    ) : (
                      <AppIcon_Element icon="solar:eye-linear" size={"20"} />
                    )}
                  </button>
                }
              />

              <AppInput_form<ChangePasswordFormData>
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
              <div className="flex flex-wrap gap-3 justify-end col-span-full">
                <Link to={`/`} className="btn btn-ghost">
                  Cancel
                </Link>
                <button
                  type="button"
                  //   onClick={() => refetch()}
                  className="btn btn-ghost gap-2"
                  //   disabled={updateUserMutation.isPending}
                >
                  <AppIcon_Element
                    icon="boxicons:refresh-cw"
                    // className={updateUserMutation.isPending ? "animate-spin" : ""}
                  />
                  Reset
                </button>
                <button
                  type="submit"
                  className="btn btn-primary relative overflow-hidden group"
                  disabled={getUserByIDUpdatePasswordLoading}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {getUserByIDUpdatePasswordLoading ? (
                      <>
                        <AppIcon_Element
                          icon="lucide:loader"
                          className="animate-spin"
                        />
                        Updating...
                      </>
                    ) : (
                      <>
                        <AppIcon_Element icon="lucide:save" /> Update User
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserPasswordUpdate_page;
