export const meetingForm = (
  handleChangeClientId,
  handleChangeAgentId,
  statusMeetingAgents,
  handleChangeUserId,
  handleChangeGuests,
  handleChangeSetUsers,
  guests,
  users,
  agents,
  client_idInit,
  MeetingAgents,
  statusDetail,
  meetingDetails,
  entities,
  status
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
      loadingEdit: status === "succeeded" && statusDetail === "succeeded",
      values: status === "succeeded" && entities?.data?.clients,
      value: statusDetail === "succeeded" && meetingDetails?.data?.client,
      async: true,
    },
    {
      name: "agents",
      label: "نماینده مشتری",
      typeInput: "RHAuto",
      multiple: true,
      change: handleChangeAgentId,
      propValue: "id",
      propTitle: "name",
      loadingCreate:
        status === "succeeded" && statusMeetingAgents === "succeeded",
      loadingEdit:
        statusMeetingAgents === "succeeded" && statusDetail === "succeeded",
      values:
        status === "succeeded" &&
        statusMeetingAgents === "succeeded" &&
        MeetingAgents?.data,
      async: true,
      value:statusDetail === "succeeded" && agents,
    },
    {
      name: "user_id",
      label: "dirctorMeeting",
      typeInput: "RHAuto",
      change: handleChangeUserId,
      multiple: false,
      propValue: "id",
      propTitle: "name",
      loadingCreate: status === "succeeded",
      loadingEdit: statusDetail === "succeeded" && status === "succeeded",
      values: status === "succeeded" && entities?.data?.users,
      value: entities?.data?.users.find(
        (e) => e.id === meetingDetails?.data?.user_id
      ),
      async: true,
    },
    {
      name: "location",
      label: "placeMeeting",
      type: "text",
      typeInput: "RHFTextField",
      loading: statusDetail === "succeeded",
    },
    {
      name: "guest",
      label: "guests",
      type: "text",
      typeInput: "RHFTextField",
      loading: statusDetail === "succeeded",
    },
    {
      name: "users",
      label: "companies",
      typeInput: "RHAuto",
      value: users,
      multiple: true,
      change: handleChangeSetUsers,
      loadingCreate: status === "succeeded",
      loadingEdit: statusDetail === "succeeded" && status === "succeeded",
      values: status === "succeeded" && entities?.data?.users,
      async: true,
      propValue: "id",
      propTitle: "name",
    },
  ];
};
