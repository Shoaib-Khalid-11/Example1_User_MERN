import type { SelectHTMLAttributes } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  className?: string;
  selectClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export const AppSelect_form = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder = "Select an option",
  prefixIcon,
  suffixIcon,
  className = "",
  selectClassName = "",
  labelClassName = "",
  errorClassName = "",
  ...inputProps
}: SelectProps<T>) => {
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

            <select
              {...field}
              {...inputProps}
              className={`select select-bordered w-full ${
                fieldState.error ? "select-error" : ""
              }${prefixIcon ? "pl-10" : ""} ${
                suffixIcon ? "pr-10" : ""
              }  ${selectClassName}`}
            >
              <option value="" disabled>
                {placeholder}
              </option>

              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {suffixIcon && (
              <span className="absolute right-0.5 z-10">{suffixIcon}</span>
            )}
          </div>
          {fieldState.error && (
            <label className={`label pt-1 ${errorClassName}`}>
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

export default AppSelect_form;
