import { useTranslation } from "react-i18next";

export const useAppTranslations = () => {
  const { t } = useTranslation(["common", "validation"]);

  const FIELD_REQUIRED = t("field_required", { ns: "validation" });
  const INVALID_PATTERN = t("invalid_pattern", { ns: "validation" });
  const AGREEMENT_CONFIRMATION = t("agreement_confirmation", {
    ns: "validation",
  });

  const EMAIL_ADDRESS = t("email_address");
  const NAME_ON_CARD = t("name_on_card");
  const CARD_NUMBER = t("card_number");
  const EXPIRATION_DATE = t("expiration_date");
  const CVC = t("cvc");
  const COMPANY = t("company");
  const ADDRESS = t("address");
  const APARTMENT = t("apartment");
  const CITY = t("city");
  const STATE_PROVINCE = t("state_province");
  const POSTAL_CODE = t("postal_code");
  const BILLING_INFORMATION = t("billing_information");
  const SUBMIT = t("submit");

  const translations = {
    FIELD_REQUIRED,
    INVALID_PATTERN,
    AGREEMENT_CONFIRMATION,
    EMAIL_ADDRESS,
    NAME_ON_CARD,
    CARD_NUMBER,
    EXPIRATION_DATE,
    CVC,
    COMPANY,
    ADDRESS,
    APARTMENT,
    CITY,
    STATE_PROVINCE,
    POSTAL_CODE,
    BILLING_INFORMATION,
    SUBMIT,
  };

  return translations;
};
