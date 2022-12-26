import { createAsyncAction } from "../../services/actionHandler";

export const meetingsAction = createAsyncAction("/meetings", "meetingList", "get");
export const meetingsDepen =  createAsyncAction("/meetings/create", "depenMeeting", "get");
export const MeetingsDepenAgent = createAsyncAction("/meetings/create", "depenMeetingAgent", "get");
export const meetingsCreate =  createAsyncAction("/meetings", "createMeeting", "post");
export const meetingDetail = createAsyncAction("/meetings", "detailMeeting", "get");
export const meetingUpdate = createAsyncAction("/meetings", "updateMeeting", "patch");
export const deleteMeeting = createAsyncAction("/meetings", "deleteMeeting", "delete");