import { HTMLAttributes, HTMLInputTypeAttribute } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface InputProps<T extends FieldValues> {
  labelFor: Path<T>;
  labelText?: string;
  error: string | undefined;
  inputType?: HTMLInputTypeAttribute;
  placeholder?: HTMLAttributes<HTMLInputElement>["placeholder"];
  register: UseFormRegister<T>;
}

export const Input = <T extends FieldValues>({
  labelFor,
  labelText,
  inputType,
  error,
  placeholder,
  register,
}: InputProps<T>) => {
  return (
    <>
      {labelText && (
        <label
          htmlFor={labelFor}
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          {labelText}
        </label>
      )}
      <input
        id={labelFor}
        type={inputType || "text"}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder={placeholder}
        {...register(labelFor)}
      />
      <p className='text-red-400 text-sm font-bold mt-1'>{error}</p>
    </>
  );
};
