import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const FIELD_REQUIRED = "Required field";
const INVALID_PATTERN = "Invalid pattern";

const schema = yup
  .object({
    email: yup.string().email(INVALID_PATTERN).required(FIELD_REQUIRED),
    nameOnCard: yup.string().required(FIELD_REQUIRED),
    cardNumber: yup
      .string()
      .matches(/^[0-9]{13,16}/, { message: INVALID_PATTERN })
      .max(16)
      .required(FIELD_REQUIRED),
    expirationDate: yup
      .string()
      .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, { message: INVALID_PATTERN })
      .required(FIELD_REQUIRED),
    cvc: yup
      .string()
      .matches(/^[0-9]{3,4}$/, { message: INVALID_PATTERN })
      .required(FIELD_REQUIRED),
    company: yup.string().required(FIELD_REQUIRED),
    address: yup.string().required(FIELD_REQUIRED),
    apartment: yup.string(),
    city: yup.string().required(FIELD_REQUIRED),
    stateProvince: yup.string(),
    postalCode: yup
      .string()
      .matches(/^[0-9]{2}-[0-9]{3}/, { message: INVALID_PATTERN })
      .required(FIELD_REQUIRED),
    agreement: yup
      .boolean()
      .isTrue("You have to confirm the agreement")
      .required(FIELD_REQUIRED),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  const onSubmit = (data: FormData) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-1/2'>
      <div className='grid gap-6 mb-6'>
        <div>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Email address
          </label>
          <input
            id='email'
            type='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='john.doe@company.com'
            {...register("email")}
          />
          <p className='text-red-400 text-sm font-bold mt-1'>
            {errors.email?.message}
          </p>
        </div>
        <div>
          <label
            htmlFor='nameOnCard'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Name on card
          </label>
          <input
            id='nameOnCard'
            type='text'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            {...register("nameOnCard")}
          />
          <p className='text-red-400 text-sm font-bold mt-1'>
            {errors.nameOnCard?.message}
          </p>
        </div>
        <div>
          <label
            htmlFor='cardNumber'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Card number
          </label>
          <input
            id='cardNumber'
            type='tel'
            inputMode='numeric'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='XXXX XXXX XXXX XXXX'
            {...register("cardNumber")}
          />
          <p className='text-red-400 text-sm font-bold mt-1'>
            {errors.cardNumber?.message}
          </p>
        </div>
        <div className='grid grid-cols-2 gap-5'>
          <div className='grid-span-1'>
            <label
              htmlFor='expirationDate'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Expiration date
            </label>
            <input
              type='tel'
              id='expirationDate'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Expiration date (MM/YY)'
              {...register("expirationDate")}
            />
            <p className='text-red-400 text-sm font-bold mt-1'>
              {errors.expirationDate?.message}
            </p>
          </div>
          <div className='grid-span-1'>
            <label
              htmlFor='cvc'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              CVC
            </label>
            <input
              id='cvc'
              type='text'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='123'
              {...register("cvc")}
            />
            <p className='text-red-400 text-sm font-bold mt-1'>
              {errors.cvc?.message}
            </p>
          </div>
        </div>
        <div>
          <label
            htmlFor='company'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Company
          </label>
          <input
            type='text'
            id='company'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            {...register("company")}
          />
          <p className='text-red-400 text-sm font-bold mt-1'>
            {errors.company?.message}
          </p>
        </div>
        <div>
          <label
            htmlFor='address'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Address
          </label>
          <input
            type='text'
            id='address'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder=''
            {...register("address")}
          />
          <p className='text-red-400 text-sm font-bold mt-1'>
            {errors.address?.message}
          </p>
        </div>
        <div>
          <label
            htmlFor='apartment'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Apartment
          </label>
          <input
            type='text'
            id='apartment'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder=''
            {...register("apartment")}
          />
        </div>
        <div className='grid grid-cols-3 gap-5'>
          <div className='grid-span-1'>
            <label
              htmlFor='city'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              City
            </label>
            <input
              type='text'
              id='city'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              {...register("city")}
            />
            <p className='text-red-400 text-sm font-bold mt-1'>
              {errors.city?.message}
            </p>
          </div>
          <div className='grid-span-1'>
            <label
              htmlFor='stateProvince'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              State / province
            </label>
            <input
              type='text'
              id='stateProvince'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder=''
              {...register("stateProvince")}
            />
          </div>
          <div className='grid-span-1'>
            <label
              htmlFor='postalCode'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Postal code
            </label>
            <input
              type='text'
              id='postalCode'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='XX-XXX'
              {...register("postalCode")}
            />
            <p className='text-red-400 text-sm font-bold mt-1'>
              {errors.postalCode?.message}
            </p>
          </div>
        </div>
      </div>
      <div className='flex items-start'>
        <div className='flex items-center h-5'>
          <input
            id='agreement'
            type='checkbox'
            value=''
            className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800'
            {...register("agreement")}
          />
        </div>
        <label
          htmlFor='agreement'
          className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
        >
          Billing information is the same as the shipping information.
        </label>
      </div>
      <p className='text-red-400 text-sm font-bold mt-1'>
        {errors.agreement?.message}
      </p>
      <button
        type='submit'
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5'
      >
        Submit
      </button>
    </form>
  );
};
