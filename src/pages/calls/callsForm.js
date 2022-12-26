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
      loadingCreate: status === "succeeded",
      loadingEdit: statusDetail === "succeeded" && status === "succeeded",
      values: status === "succeeded" && entities?.data?.clients,
      value:
        statusDetail === "succeeded" &&
        status === "succeeded" &&
        entities?.data?.clients.find(
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
      loadingCreate: status === "succeeded" && statuscallAgents === "succeeded",
      loadingEdit:
        statusDetail === "succeeded" && statuscallAgents === "succeeded",

      values:
        status === "succeeded" &&
        statuscallAgents === "succeeded" ?
        callAgents?.data:[],
        value:{},
      async: true,
    },
  ];
};
