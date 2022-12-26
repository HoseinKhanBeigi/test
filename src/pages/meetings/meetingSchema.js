import * as Yup from "yup";

export const meetingSchema = (t) => {
  return Yup.object().shape({
    topic: Yup.string().required(t("topic is required")),
  });
};
