import type { InputHTMLAttributes } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type CheckboxProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  labelTextFirst?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  className?: string;
  checkboxClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const AppCheckbox_form = <T extends FieldValues>({
  name,
  control,
  label,
  labelTextFirst = false,
  prefixIcon,
  suffixIcon,
  className = "",
  checkboxClassName = "",
  labelClassName = "",
  errorClassName = "",
  ...inputProps
}: CheckboxProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className={`form-control w-full mb-4 ${className}`}>
          <label
            className={`label cursor-pointer justify-start gap-3 ${labelClassName}`}
          >
            {prefixIcon && (
              <span className="flex items-center">{prefixIcon}</span>
            )}
            {labelTextFirst && (
              <span className="label-text flex-1">{label}</span>
            )}
            <input
              ref={field.ref}
              {...inputProps}
              type="checkbox"
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              onBlur={field.onBlur}
              className={`checkbox ${fieldState.error ? "checkbox-error" : ""}
              ${checkboxClassName}`}
              // ${prefixIcon ? "pl-10" : ""} ${
              //   suffixIcon ? "pr-10" : ""
              // }
            />

            {!labelTextFirst && (
              <span className="label-text flex-1">{label}</span>
            )}

            {suffixIcon && (
              <span className="flex items-center">{suffixIcon}</span>
            )}
          </label>

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

export default AppCheckbox_form;
