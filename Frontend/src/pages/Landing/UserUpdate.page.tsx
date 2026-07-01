import { zodResolver } from "@hookform/resolvers/zod";
import {
  AppCheckbox_form,
  AppInput_form,
  AppSelect_form,
} from "components/forms";
import {
  userUpdateSchema,
  type UserFormUpdateData,
} from "components/forms/schemas";
import { AppIcon_Element } from "components/third-party";
import { useEffect } from "react";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import { UserEnum } from "typescript/api/enums";
import { useUserByIDApi, useUserByIDUpdateApi } from "utils/api";

export const UpdateUser_Page = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getUserByIDData, getUserByIDLoading } = useUserByIDApi(id!);
  const {
    mutateUserByIDUpdate,
    getisSuccessUserByIDUpdate,
    getUserByIDUpdateLoading,
    getisErrorUserByIDUpdate,
    getUserByIDUpdateError,
    getUserByIDUpdateData,
  } = useUserByIDUpdateApi(id!);
  const user = getUserByIDData?.user;
  const {
    control,
    handleSubmit,
    reset,
    // formState: { isLoading },
  } = useForm<UserFormUpdateData>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      email: undefined,
      fullName: undefined,
      username: undefined,
      isVerified: undefined,
      role: undefined,
    },
  });
  const isVerified = useWatch<UserFormUpdateData>({
    control,
    name: "isVerified",
  });
  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        fullName: user.fullName,
        username: user.username,
        isVerified: user.isVerified,
        role: user.role,
      });
    }
  }, [user, reset]);
  const roleOptions = Object.values(UserEnum).map((role) => ({
    label: role,
    value: role,
  }));
  const onSubmit: SubmitHandler<UserFormUpdateData> = (data) => {
    console.log(data);
    mutateUserByIDUpdate({
      email: data.email,
      fullName: data.fullName,
      username: data.username,
      isVerified: data.isVerified,
      role: data.role,
    });
  };

  // Error state
  if (getisErrorUserByIDUpdate) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-base-100/80 backdrop-blur-xl rounded-2xl p-8 border border-base-300/50 shadow-xl">
          <div className="text-center">
            <AppIcon_Element
              icon="boxicons:alert-circle"
              className="text-6xl text-error mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">User Not Found</h2>
            <p className="text-base-content/60 mb-6">
              {getUserByIDUpdateError?.message}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => {}} className="btn btn-primary">
                Try Again
              </button>
              <button onClick={() => navigate(-1)} className="btn btn-ghost">
                Back to Users
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {getUserByIDUpdateLoading || getUserByIDLoading ? (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
          <div className="text-center">
            <AppIcon_Element
              icon="lucide:loader"
              className="text-6xl text-primary animate-spin mx-auto mb-4"
            />
            <p className="text-base-content/60">Loading user data...</p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-base-200 p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <Link to={`/`} className="btn btn-ghost btn-sm gap-2">
                <AppIcon_Element icon="tabler:arrow-left" /> Back to Profile
              </Link>
              <div className="flex-1">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  <AppIcon_Element
                    icon="iconamoon:edit-light"
                    className="text-primary"
                  />
                  Update User
                </h1>
                <p className="text-base-content/60 mt-1">
                  Edit user information for{" "}
                  <span className="font-semibold text-base-content">
                    {user?.fullName}
                  </span>
                </p>
              </div>
            </div>

            {/* Success Message */}
            {getisSuccessUserByIDUpdate && (
              <div className="alert alert-success mb-6 animate-fadeInUp">
                <AppIcon_Element
                  icon="prime:check-circle"
                  className="text-lg"
                />
                <span>{getUserByIDUpdateData?.message}</span>
                <button
                  //   onClick={() => setSuccessMessage("")}
                  className="btn btn-ghost btn-xs"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Update Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="bg-base-100/80 backdrop-blur-xl rounded-2xl p-6 border border-base-300/50 shadow-xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <AppIcon_Element icon="prime:user" className="text-primary" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Username */}
                  <AppInput_form<UserFormUpdateData>
                    name="username"
                    control={control}
                    label="User Name"
                    prefixIcon={
                      <AppIcon_Element icon="prime:user" className="text-lg" />
                    }
                  />

                  {/* Full Name */}
                  <AppInput_form<UserFormUpdateData>
                    name="fullName"
                    control={control}
                    label="Full Name"
                    prefixIcon={
                      <AppIcon_Element
                        icon="mynaui:users-group"
                        className="text-lg"
                      />
                    }
                  />

                  {/* Email */}
                  <AppInput_form<UserFormUpdateData>
                    name="email"
                    disabled
                    control={control}
                    label="Email"
                    prefixIcon={
                      <AppIcon_Element icon="tabler:mail" className="text-lg" />
                    }
                  />

                  {/* Role */}
                  <AppSelect_form<UserFormUpdateData>
                    name="role"
                    control={control}
                    label="Email"
                    options={roleOptions}
                    prefixIcon={
                      <AppIcon_Element
                        icon="fa-solid:user-shield"
                        className="text-lg"
                      />
                    }
                  />

                  {/* Status & Verification */}
                  <div className="bg-base-100/80 backdrop-blur-xl rounded-2xl p-6 border border-base-300/50 shadow-xl col-span-full">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <AppIcon_Element
                        icon="material-symbols:shield-outline-rounded"
                        className="text-secondary"
                      />
                      Status & Verification
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Verification Status */}
                      <AppCheckbox_form<UserFormUpdateData>
                        name="isVerified"
                        control={control}
                        label="Verified Account"
                        prefixIcon={
                          <>
                            {isVerified ? (
                              <AppIcon_Element
                                icon="prime:check-circle"
                                className="text-success"
                              />
                            ) : (
                              <AppIcon_Element
                                icon="lucide:circle-x"
                                className="text-warning"
                              />
                            )}
                          </>
                        }
                      />
                      <p className="text-xs text-base-content/60 ml-1">
                        {isVerified
                          ? "User is verified and can access all features"
                          : "User is pending verification"}
                      </p>

                      {/* Account Status */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Account Status
                          </span>
                        </label>
                        <div
                          className={`badge ${isVerified ? "badge-success" : "badge-warning"} badge-lg w-full py-3 justify-center`}
                        >
                          {isVerified ? "Active" : "Pending Verification"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Token Management */}

                  {/* Form Actions */}
                  <div className="flex flex-wrap gap-3 justify-end col-span-full">
                    <Link to={`/users/`} className="btn btn-ghost">
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
                      disabled={getUserByIDUpdateLoading}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {getUserByIDUpdateLoading ? (
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
      )}
    </>
  );
};

export default UpdateUser_Page;
{
  /* <div className="bg-base-100/80 backdrop-blur-xl rounded-2xl p-6 border border-base-300/50 shadow-xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <AppIcon_Element
                icon="boxicons:refresh-cw"
                className="text-info"
              />
              Token Management
            </h3>       
          </div> */
}
