export const callForm = (
  statusDetail,
  status,
  entities,
  handleChangeClientId,
  handleChangeAgentId,
  statuscallAgents,
  callAgents,
  callDetails
) => {
  return [
    {
      name: "topic",
      label: "topic",
      type: "text",
      typeInput: "RHFTextField",
      loading: statusDetail === "succeeded",
    },
    {
      name: "client_id",
      label: "نام مشتری",
      typeInput: "RHAuto",
      change: handleChangeClientId,
      multiple: false,
      propValue: "id",
      propTitle: "name",
      loadingCreate: true,
      loadingEdit: statusDetail === "succeeded" && status === "succeeded",
      values: entities?.data?.clients ?? [],
      value: entities?.data?.clients.find(
        (e) => e.id === callDetails?.data?.client?.id
      ),
      async: true,
    },
    {
      name: "agent_id",
      label: "نماینده مشتری",
      typeInput: "RHAuto",
      change: handleChangeAgentId,
      multiple: false,
      propValue: "id",
      propTitle: "name",
      loadingCreate: true,
      loadingEdit:
        statusDetail === "succeeded" && statuscallAgents === "succeeded",

      values: callAgents?.data ?? [],
      value: "",
      async: true,
    },
  ];
};

export const callFormDate = (
  datePickerValue,
  handleChangeTimePickerStart,
  valueTime,
  handleChangeTimePicker
) => {
  return [
    {
      name: "start",
      label: "dateAndTime",
      value: datePickerValue,
      typeInput: "TimePicker",
      change: handleChangeTimePickerStart,
    },
    {
      name: "end",
      label: "endTime",
      value: valueTime,
      typeInput: "TimePicker",
      change: handleChangeTimePicker,
    },
  ];
};
