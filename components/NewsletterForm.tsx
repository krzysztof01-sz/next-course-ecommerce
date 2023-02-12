import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Input } from "./Input";
import { useState } from "react";
import { Alert } from "./Alert";

const schema = yup
  .object({
    email: yup
      .string()
      .trim()
      .email("Invalid value pattern")
      .required("Field is required"),
  })
  .required();

export type NewsletterData = yup.InferType<typeof schema>;

export type MailerliteResponseData = {
  data?: string;
  success: boolean;
};

export const NewsletterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterData>({ resolver: yupResolver(schema) });
  const [response, setResponse] = useState<MailerliteResponseData | undefined>(
    undefined
  );

  const onSubmit = async ({ email }: NewsletterData) => {
    const mailerliteResponse = await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    const data = (await mailerliteResponse.json()) as MailerliteResponseData;
    if (data.success) {
      reset();
    }
    setResponse(data);
  };

  return (
    <>
      <form className='flex' onSubmit={handleSubmit(onSubmit)}>
        <div className='max-w-md'>
          <Input
            inputType='email'
            error={errors.email?.message}
            labelFor='email'
            register={register}
            placeholder='john@doe.com'
          />
        </div>
        <button
          type='submit'
          className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 h-[42px] ml-3'
        >
          Zapisz się do newslettera
        </button>
      </form>
      <div>
        {response && (
          <Alert
            variant={response.success ? "success" : "error"}
            text={response.data as string}
          />
        )}
      </div>
    </>
  );
};
