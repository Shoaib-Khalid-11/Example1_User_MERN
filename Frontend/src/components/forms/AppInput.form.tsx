import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type InputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  placeholder?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
};
export const AppInput_form = <T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  placeholder,
  prefixIcon,
  suffixIcon,
  className = "",
  inputClassName = "",
  labelClassName = "",
  errorClassName = "",
}: InputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className={`form-control w-full mb-4 min-w-0 ${className}`}>
          <label className={`label pb-1 ${labelClassName}`}>
            <span className="label-text font-medium">{label}</span>
          </label>

          <div className="relative z-0 flex items-center">
            {/* Prefix Icon */}
            {prefixIcon && (
              <span className="absolute left-2 z-10">{prefixIcon}</span>
            )}

            <input
              {...field}
              type={type}
              placeholder={placeholder}
              className={`input input-bordered w-full ${
                fieldState.error ? "input-error" : ""
              } ${prefixIcon ? "pl-10" : ""} ${
                suffixIcon ? "pr-10" : ""
              } ${inputClassName}`}
            />

            {suffixIcon && (
              <span className="absolute right-0.5 z-10">{suffixIcon}</span>
            )}
          </div>

          {fieldState.error && (
            <label className={`label pt-1  ${errorClassName}`}>
              <span className="label-text-alt text-error whitespace-normal">
                {fieldState.error.message}
              </span>
            </label>
          )}
        </div>
      )}
    />
  );
};
export default AppInput_form;
