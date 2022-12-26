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
  interstedName
) => {
  return [
    {
      name: "email",
      label: "email",
      type: "text",
      left:true,
      typeInput: "RHFTextField",
      loading: statusDetail === "succeeded",
    },
    {
      name: "name",
      label: "fullName",
      type: "text",
      typeInput: "RHFTextField",
      loading: statusDetail === "succeeded",
    },
    {
      name: "type",
      typeInput: "RHRadioGroup",
      loading: statusDetail === "succeeded",


      values: [{ name: "حقیقی" }, { name: "حقوقی" }],
      change: handleChangeClient,
    },
    {
      name: "gender",
      typeInput: "RHRadioGroup",
      loading: statusDetail === "succeeded",
      values: [{ name: "آقا" }, { name: "بانو" }],
      change: handleChangeGender,
    },
    {
      name:
        valueRadio !== undefined
          ? valueRadio === "حقیقی"
            ? "national_number"
            : "national_identifier"
          : dataInput === "حقیقی"
          ? "national_number"
          : "national_identifier",

      label:
        valueRadio !== undefined
          ? valueRadio === "حقیقی"
            ? "national_number"
            : "national_identifier"
          : dataInput === "حقیقی"
          ? "national_number"
          : "national_identifier",

      type: "text",
      typeInput: "RHFTextField",
      left:true,
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
      label:"birth_at"
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
      typeInput: "RHMultiSelect",
      change: handleChangeIntersted,
      loadingCreate:status === "succeeded",
      loadingEdit: statusDetail === "succeeded" && status === "succeeded",
      values: status === "succeeded" && entities?.data?.interests,
      async: true,
      value:interstedName,
      propValue: "id",
      propTitle: "title",
    },
    {
      name: "user_id",
      label: "forwardUser",
      typeInput: "RHSelectField",
      change: handleChangeUserId,
      propValue: "id",
      propTitle: "name",
      loadingCreate:status === "succeeded",
      loadingEdit: statusDetail === "succeeded" && status === "succeeded",
      values: status === "succeeded" && entities?.data?.users,
      async: true,
    },
    {
      name: "business",
      label: "حوزه فعالیت",
      typeInput: "RHSelectField",
      change: handleChangeBussiness,
      loading: statusDetail === "succeeded",
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
      async: false,
      loadingCreate: statusDetail === "succeeded",
    },
  ];
};
