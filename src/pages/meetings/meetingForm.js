export const meetingForm = (
  handleChangeClientId,
  handleChangeAgentId,
  statusMeetingAgents,
  handleChangeUserId,
  handleChangeSetUsers,
  users,
  agents,
  MeetingAgents,
  statusDetail,
  meetingDetails,
  meetingEntities,
  statusMeetingEntities
) => {
  return [
    {
      name: "topic",
      label: "topic",
      type: "text",
      typeInput: "RHFTextField",
      loading: statusDetail === "succeeded",
      farsi: true,
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
      loadingEdit:
        statusMeetingEntities === "succeeded" && statusDetail === "succeeded",
      values: meetingEntities?.data?.clients ?? [],
      value: meetingDetails?.data?.client,
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
      loadingCreate: true,
      loadingEdit:
        statusMeetingAgents === "succeeded" && statusDetail === "succeeded",
      values: MeetingAgents?.data ?? [],
      async: true,
      value: agents ?? [],
    },
    {
      name: "user_id",
      label: "dirctorMeeting",
      typeInput: "RHAuto",
      change: handleChangeUserId,
      multiple: false,
      propValue: "id",
      propTitle: "name",
      loadingCreate: true,
      loadingEdit:
        statusDetail === "succeeded" && statusMeetingEntities === "succeeded",
      values: meetingEntities?.data?.users ?? [],
      value: meetingEntities?.data?.users.find(
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
      multiple: true,
      change: handleChangeSetUsers,
      loadingCreate: true,
      loadingEdit:
        statusDetail === "succeeded" && statusMeetingEntities === "succeeded",
      values: meetingEntities?.data?.users ?? [],
      value: users ?? [],
      async: true,
      propValue: "id",
      propTitle: "name",
    },
  ];
};

export const meetingFormDate = (
  datePickerValue,
  handleChangeDatePicker,
  valueTime,
  handleChangeEndTimePicker
) => {
  return [
    {
      name: "start",
      label: "dateAndTime",
      value: datePickerValue,
      typeInput: "DateTimePicker",
      change: handleChangeDatePicker,
    },
    {
      name: "end",
      label: "endTime",
      value: valueTime,
      typeInput: "TimePicker",
      change: handleChangeEndTimePicker,
    },
  ];
};
