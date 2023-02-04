import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "./Input";
import { Checkbox } from "./Checkbox";
import { useAppTranslations } from "../hooks/useAppTranslations";

const getYupSchema = (t: Translations) => {
  return yup
    .object({
      email: yup.string().email(t.INVALID_PATTERN).required(t.FIELD_REQUIRED),
      nameOnCard: yup.string().required(t.FIELD_REQUIRED),
      cardNumber: yup
        .string()
        .matches(/^[0-9]{13,16}/, { message: t.INVALID_PATTERN })
        .max(16)
        .required(t.FIELD_REQUIRED),
      expirationDate: yup
        .string()
        .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, {
          message: t.INVALID_PATTERN,
        })
        .required(t.FIELD_REQUIRED),
      cvc: yup
        .string()
        .matches(/^[0-9]{3,4}$/, { message: t.INVALID_PATTERN })
        .required(t.FIELD_REQUIRED),
      company: yup.string().required(t.FIELD_REQUIRED),
      address: yup.string().required(t.FIELD_REQUIRED),
      apartment: yup.string(),
      city: yup.string().required(t.FIELD_REQUIRED),
      stateProvince: yup.string(),
      postalCode: yup
        .string()
        .matches(/^[0-9]{2}-[0-9]{3}/, { message: t.INVALID_PATTERN })
        .required(t.FIELD_REQUIRED),
      agreement: yup
        .boolean()
        .isTrue(t.AGREEMENT_CONFIRMATION)
        .required(t.FIELD_REQUIRED),
    })
    .required();
};

export type CheckoutFormData = yup.InferType<ReturnType<typeof getYupSchema>>;
type Translations = ReturnType<typeof useAppTranslations>;

export const CheckoutForm = () => {
  const t = useAppTranslations();
  const schema = getYupSchema(t);

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
            labelText={t.EMAIL_ADDRESS}
            inputType='email'
            error={errors.email?.message}
            placeholder='john.doe@company.com'
            register={register}
          />
        </div>
        <div>
          <Input
            labelFor='nameOnCard'
            labelText={t.NAME_ON_CARD}
            error={errors.nameOnCard?.message}
            register={register}
          />
        </div>
        <div>
          <Input
            labelFor='cardNumber'
            labelText={t.CARD_NUMBER}
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
              labelText={t.EXPIRATION_DATE}
              inputType='tel'
              placeholder='Expiration date (MM/YY)'
              error={errors.expirationDate?.message}
              register={register}
            />
          </div>
          <div className='grid-span-1'>
            <Input
              labelFor='cvc'
              labelText={t.CVC}
              placeholder='123'
              error={errors.cvc?.message}
              register={register}
            />
          </div>
        </div>
        <div>
          <Input
            labelFor='company'
            labelText={t.COMPANY}
            error={errors.company?.message}
            register={register}
          />
        </div>
        <div>
          <Input
            labelFor='address'
            labelText={t.ADDRESS}
            error={errors.address?.message}
            register={register}
          />
        </div>
        <div>
          <Input
            labelFor='apartment'
            labelText={t.APARTMENT}
            error={errors.apartment?.message}
            register={register}
          />
        </div>
        <div className='grid grid-cols-3 gap-5'>
          <div className='grid-span-1'>
            <Input
              labelFor='city'
              labelText={t.CITY}
              error={errors.city?.message}
              register={register}
            />
          </div>
          <div className='grid-span-1'>
            <Input
              labelFor='stateProvince'
              labelText={t.STATE_PROVINCE}
              error={errors.stateProvince?.message}
              register={register}
            />
          </div>
          <div className='grid-span-1'>
            <Input
              labelFor='postalCode'
              labelText={t.POSTAL_CODE}
              error={errors.postalCode?.message}
              placeholder='XX-XXX'
              register={register}
            />
          </div>
        </div>
      </div>
      <Checkbox
        labelFor='agreement'
        labelText={t.BILLING_INFORMATION}
        error={errors.agreement?.message}
        register={register}
      />
      <button
        type='submit'
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5'
      >
        {t.SUBMIT}
      </button>
    </form>
  );
};
