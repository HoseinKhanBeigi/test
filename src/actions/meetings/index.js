import { createAsyncAction } from "../../services/actionHandler";

export const meetingsList = createAsyncAction("/meetings", "meetingList", "get");
export const meetingDependencies =  createAsyncAction("/meetings/create", "depenMeeting", "get");
export const MeetingsDepenAgent = createAsyncAction("/meetings/create", "depenMeetingAgent", "get");
export const meetingsCreate =  createAsyncAction("/meetings", "createMeeting", "post");
export const meetingDetail = createAsyncAction("/meetings", "detailMeeting", "get");
export const meetingUpdate = createAsyncAction("/meetings", "updateMeeting", "patch");
export const deleteMeeting = createAsyncAction("/meetings", "deleteMeeting", "delete");