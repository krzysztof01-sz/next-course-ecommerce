import { CheckoutFormData } from "./CheckoutForm";
import { InputProps } from "./Input";

export const Checkbox = ({
  labelFor,
  error,
  labelText,
  register,
}: Omit<InputProps<CheckoutFormData>, "inputType" | "placeholder">) => {
  return (
    <>
      <div className='flex items-start'>
        <div className='flex items-center h-5'>
          <input
            id={labelFor}
            type='checkbox'
            className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800'
            {...register(labelFor)}
          />
        </div>
        <label
          htmlFor={labelFor}
          className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
        >
          {labelText}
        </label>
      </div>
      <p className='text-red-400 text-sm font-bold mt-1'>{error}</p>
    </>
  );
};
