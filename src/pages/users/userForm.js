export const userForm = (
  handleChangeOrganization,
  handleChangeOrganizationType,
  handleChangeIntersted,
  handleChangeUserPosition,
  handleChangeSenior,
  statusDetail,
  status,
  entities,
  interstedName,
  userDetails
) => {
  const organizationIds = (data) => {
    let value = "";
    if (data?.organization === "شعبه" || data?.organization === "سایر") {
      value = data?.branch_id;
    }
    if (data?.organization === "ستاد") {
      value = data?.head_quarter_department_id;
    }
    if (data?.organization === "شرکت های فرعی") {
      value = data?.company_id;
    }
    if (data?.organization === "نمایندگان") {
      value = data?.agency_id;
    }
    return value;
  };

  return [
    {
      name: "name",
      label: "fullName",
      type: "text",
      typeInput: "RHFTextField",
      loading: statusDetail === "succeeded",
    },
    {
      name: "mobile",
      label: "phoneNumber",
      type: "number",
      typeInput: "RHFTextField",
      loading: statusDetail === "succeeded",
    },
    {
      name: "email",
      label: "email",
      type: "text",
      typeInput: "RHFTextField",
      loading: statusDetail === "succeeded",
    },
    {
      name: "organization",
      label: "partOfOrganization",
      typeInput: "RHAuto",
      multiple: false,
      change: handleChangeOrganization,
      loadingCreate: true,
      loadingEdit: statusDetail === "succeeded" && status === "succeeded",
      propValue: "name",
      propTitle: "name",
      values: [
        { name: "شعبه" },
        { name: "ستاد" },
        { name: "شرکت های فرعی" },
        { name: "نمایندگان" },
        { name: "سایر" },
      ],
      async: false,
      value: statusDetail === "succeeded" && {
        name: userDetails?.data?.user?.organization,
      },
    },

    {
      name: "organization_id",
      label: "partOfOrganization",
      typeInput: "RHAuto",
      change: handleChangeOrganizationType,
      propValue: "id",
      propTitle: "name",
      multiple: false,
      loadingCreate: status === "succeeded",
      loadingEdit: statusDetail === "succeeded" && status === "succeeded",
      values: status === "succeeded" && entities?.data?.organizations,
      value:
        userDetails &&
        statusDetail === "succeeded" &&
        status === "succeeded" &&
        entities?.data?.organizations.find(
          (e) =>
            e.id === organizationIds(userDetails?.data?.user) 
        ),
      async: true,
    },
    {
      name: "personnel_code",
      label: "personality code",
      type: "number",
      typeInput: "RHFTextField",
      loading: statusDetail === "succeeded",
    },
    {
      name: "interests",
      label: "intersted",
      typeInput: "RHAuto",
      change: handleChangeIntersted,
      loadingEdit: statusDetail === "succeeded",
      onInputChange: undefined,
      values: status === "succeeded" && entities?.data?.interests,
      loadingCreate: status === "succeeded",
      multiple: true,
      async: true,
      value: interstedName,
      propValue: "id",
      propTitle: "title",
    },
    {
      name: "position",
      label: "position",
      type: "text",
      typeInput: "RHFTextField",
      loading: statusDetail === "succeeded",
    },

    {
      name: "level",
      label: "userPosition",
      change: handleChangeUserPosition,
      loadingCreate: status === "succeeded",
      loadingEdit: statusDetail === "succeeded" && status === "succeeded",
      typeInput: "RHAuto",
      propValue: "name",
      propTitle: "name",
      onInputChange: undefined,
      multiple: false,
      values: [
        { name: "RM5" },
        { name: "RM6" },
        { name: "RM7" },
        { name: "RM4" },
        { name: "RM3" },
        { name: "RM2" },
        { name: "RM1" },
      ],
      async: false,
      value: statusDetail === "succeeded" && {
        name: userDetails?.data?.user?.level,
      },
    },
    {
      name: "parent_id",
      label: "directSeniorUser",
      change: handleChangeSenior,
      propValue: "id",
      propTitle: "name",
      loadingCreate: status === "succeeded",
      loadingEdit: statusDetail === "succeeded" && status === "succeeded",
      onInputChange: undefined,
      values: entities?.data?.users,
      typeInput: "RHAuto",
      multiple: false,
      async: true,
      value:
        statusDetail === "succeeded" &&
        status === "succeeded" &&
        entities?.data?.users.find(
          (e) => e.id === userDetails?.data?.user?.parent_id
        ),
    },
  ];
};
