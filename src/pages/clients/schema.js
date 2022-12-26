import * as Yup from "yup";

export const clientSchema = (t) => {
  return Yup.object().shape({
    name: Yup.string().required(t("fullname is required")),
  });
};
