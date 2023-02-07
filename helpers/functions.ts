import { CheckoutFormData } from "../components/CheckoutForm";
import { ProductWithCount } from "../contexts/CartContext";

type RequiredCheckoutFormData = Pick<
  CheckoutFormData,
  "email" | "nameOnCard" | "address" | "city" | "postalCode"
>;

export const deleteEmptyValuesFromObject = (
  formData: CheckoutFormData
): RequiredCheckoutFormData => {
  const formDataToSend: { [K in string]: any } = {};

  Object.entries(formData).forEach(([key, value]) => {
    if (value && key !== "agreement") {
      formDataToSend[key] = value;
    }
  });

  return formDataToSend as RequiredCheckoutFormData;
};

export const getTotalPrice = (products: ProductWithCount[]) => {
  return products.reduce((acc, prevProduct) => {
    if (prevProduct.price) {
      return acc + prevProduct.price * prevProduct.count;
    }
    return acc;
  }, 0);
};
