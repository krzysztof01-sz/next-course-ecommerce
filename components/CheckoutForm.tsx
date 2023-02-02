import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "./Input";
import { Checkbox } from "./Checkbox";

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

export type CheckoutFormData = yup.InferType<typeof schema>;

export const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({ resolver: yupResolver(schema) });
  const onSubmit = (data: CheckoutFormData) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-1/2'>
      <div className='grid gap-6 mb-6'>
        <div>
          <Input
            labelFor='email'
            labelText='Email address'
            inputType='email'
            error={errors.email?.message}
            placeholder='john.doe@company.com'
            register={register}
          />
        </div>
        <div>
          <Input
            labelFor='nameOnCard'
            labelText='Name on card'
            error={errors.nameOnCard?.message}
            register={register}
          />
        </div>
        <div>
          <Input
            labelFor='cardNumber'
            labelText='Card number'
            inputType='tel'
            placeholder='XXXX XXXX XXXX XXXX'
            error={errors.cardNumber?.message}
            register={register}
          />
        </div>
        <div className='grid grid-cols-2 gap-5'>
          <div className='grid-span-1'>
            <Input
              labelFor='expirationDate'
              labelText='Expiration date'
              inputType='tel'
              placeholder='Expiration date (MM/YY)'
              error={errors.expirationDate?.message}
              register={register}
            />
          </div>
          <div className='grid-span-1'>
            <Input
              labelFor='cvc'
              labelText='CVC'
              placeholder='123'
              error={errors.cvc?.message}
              register={register}
            />
          </div>
        </div>
        <div>
          <Input
            labelFor='company'
            labelText='Company'
            error={errors.company?.message}
            register={register}
          />
        </div>
        <div>
          <Input
            labelFor='address'
            labelText='Address'
            error={errors.address?.message}
            register={register}
          />
        </div>
        <div>
          <Input
            labelFor='apartment'
            labelText='Apartment'
            error={errors.apartment?.message}
            register={register}
          />
        </div>
        <div className='grid grid-cols-3 gap-5'>
          <div className='grid-span-1'>
            <Input
              labelFor='city'
              labelText='City'
              error={errors.city?.message}
              register={register}
            />
          </div>
          <div className='grid-span-1'>
            <Input
              labelFor='stateProvince'
              labelText='State / province'
              error={errors.stateProvince?.message}
              register={register}
            />
          </div>
          <div className='grid-span-1'>
            <Input
              labelFor='postalCode'
              labelText='Postal code'
              error={errors.postalCode?.message}
              placeholder='XX-XXX'
              register={register}
            />
          </div>
        </div>
      </div>
      <Checkbox
        labelFor='agreement'
        labelText='Billing information is the same as the shipping information.'
        error={errors.agreement?.message}
        register={register}
      />
      <button
        type='submit'
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5'
      >
        Submit
      </button>
    </form>
  );
};
