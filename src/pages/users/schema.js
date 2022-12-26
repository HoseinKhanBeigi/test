import * as Yup from "yup";

export const LoginSchema = (t) => {
  return Yup.object().shape({
    personnel_code: Yup.string()
      .required(t("personnel_code is required"))
      .min(4, t("must be a minimum of 4 characters")),
    name: Yup.string().required(t("fullname is required")),
    mobile: Yup.string()
      .required(t("phone is required"))
      .test("", t("start with 0"), function (value, context) {
        return context.originalValue && context.originalValue.startsWith("0");
      })
      .min(11, t("must be a minimum of 11 characters")),
    organization: Yup.string().required(t("organization is required")),
    organization_id: Yup.string().required(t("organization is required")),
    level: Yup.string().required(t("level is required")),
    position: Yup.string().required(t("position is required")),
    email: Yup.string().email().typeError("email must be a valid email"),
    parent_id:Yup.string().required(t("parent_id is required"))
  });
};
