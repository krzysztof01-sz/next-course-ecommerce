import { CheckoutForm } from "../components/CheckoutForm";
import { Main } from "../components/Main";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPropsContext } from "next";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        "common",
        "validation",
      ])),
    },
  };
}

const CheckoutPage = () => {
  return (
    <Main>
      <CheckoutForm />
    </Main>
  );
};

export default CheckoutPage;
