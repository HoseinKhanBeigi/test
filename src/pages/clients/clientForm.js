export const clientForm = (
  handleChangeClient,
  handleChangeGender,
  handleChangeDatePicker,
  handleChangeIntersted,
  handleChangeUserId,
  handleChangeBussiness,
  valueRadio,
  dataInput,
  status,
  statusDetail,
  entities,
  interstedName,
  clientDetails
) => {
  return [
    {
      name: "email",
      label: "email",
      type: "text",
      left: true,
      typeInput: "RHFTextField",
      loading: statusDetail === "succeeded",
    },
    {
      name: "name",
      label: "fullName",
      type: "text",
      typeInput: "RHFTextField",
      loading: statusDetail === "succeeded",
      farsi: true,
    },
    {
      name: "type",
      typeInput: "RHRadioGroup",
      loading: statusDetail === "succeeded",

      values: [{ name: "حقيقي" }, { name: "حقوقي" }],
      change: handleChangeClient,
    },
    {
      name: "gender",
      typeInput: "RHRadioGroup",
      loading: statusDetail === "succeeded",
      values: [{ name: "مرد" }, { name: "زن" }],
      change: handleChangeGender,
    },
    {
      name:
        valueRadio !== undefined
          ? valueRadio === "حقيقي"
            ? "national_number"
            : "national_number"
          : dataInput === "حقيقي"
          ? "national_number"
          : "national_number",

      label:
        valueRadio !== undefined
          ? valueRadio === "حقيقي"
            ? "national_number"
            : "national_identifier"
          : dataInput === "حقيقي"
          ? "national_number"
          : "national_identifier",

      type: "text",
      typeInput: "RHFTextField",
      left: true,
      loading: statusDetail === "succeeded",
    },
    {
      name: "city",
      label: "شهر محل سکونت",
      type: "text",
      typeInput: "RHFTextField",
      loading: statusDetail === "succeeded",
    },
    {
      name: "birth_at",
      typeInput: "RHDatePicker",
      change: handleChangeDatePicker,
      label: "birth_at",
    },
    {
      name: "job",
      label: "شغل",
      type: "text",
      typeInput: "RHFTextField",
      loading: statusDetail === "succeeded",
    },
    {
      name: "phone",
      label: "phone",
      type: "text",
      typeInput: "RHFTextField",
      loading: statusDetail === "succeeded",
    },

    {
      name: "interests",
      label: "intersted",
      typeInput: "RHAuto",
      change: handleChangeIntersted,
      loadingCreate: true,
      loadingEdit: statusDetail === "succeeded" && status === "succeeded",
      values: entities?.data?.interests ?? [],
      multiple: true,
      async: true,
      value: interstedName,
      propValue: "id",
      propTitle: "title",
      show: valueRadio === "حقيقي" ? false : true,
    },
    {
      name: "user_id",
      label: "forwardUser",
      typeInput: "RHSelectField",
      change: handleChangeUserId,
      propValue: "id",
      propTitle: "name",
      loadingCreate: status === "succeeded",
      loadingEdit: statusDetail === "succeeded" && status === "succeeded",
      values: status === "succeeded" && entities?.data?.users,
      async: true,
    },
    {
      name: "business",
      label: "حوزه فعالیت",
      typeInput: "RHAuto",
      change: handleChangeBussiness,
      loadingCreate: true,
      loadingEdit: statusDetail === "succeeded" && status === "succeeded",
      value: clientDetails?.data?.client?.business? { name: clientDetails?.data?.client?.business }:"",
      values: [
        { name: "آموزش" },
        { name: "ارگان های دولتی" },
        { name: "معادن و فلزات" },
        { name: "بهداشت و درمان" },
        { name: "تکنولوژی" },
        { name: "مخابرات" },
        { name: "صنعت" },
        { name: " هتل و رستوران" },
        { name: "باشگاه های ورزشی" },
        { name: "ساختمان" },
        { name: "شیلات" },
        { name: "موسسات مالی" },
        { name: "کشاورزی و جنگلداری" },
        { name: "عمده فروشی و خرده فروشی" },
        { name: "فعالیت های برون مرزی" },
        { name: "خیریه" },
        { name: "بازرگانی" },
        { name: "حمل و نقل" },
      ],
      propValue: "name",
      propTitle: "name",
    },
  ];
};
