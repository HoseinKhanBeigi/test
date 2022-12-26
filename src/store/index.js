// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "../features/login";
import { userListSlice } from "../features/users";
import { sampleFileusr } from "../features/sampleFile/samplefileusr";
import { sampleFilecli } from "../features/sampleFile/samplefilecli";
import { dashboardAppSlice } from "../features/profile";
import { userOrganizationType } from "../features/organizationType";
import { clientOrganizationType } from "../features/clientsOriganization";
import { clientListSlice } from "../features/clients";
import {clientSearchSlice} from "../features/clientSearch"
import messageLog from "../features/messageLog";
import filterSlice from "../features/filter";
import { meetingListSlice } from "../features/meetings";
import { callListSlice } from "../features/calls";
import { callDepen } from "../features/callsDepen";
import { callAgentsDepen } from "../features/callagent";
import { meetingDepen } from "../features/meetingDepen";
import { MeetingAgentsDepen } from "../features/meetingAgent";
import  userDetailShow  from "../features/detailUser";
import { clientDetailShow } from "../features/clientDetail";
import { callDetailShow } from "../features/callDetail";
import {meetingDetailShow} from "../features/meetingDetail";


const store = configureStore({
  reducer: {
    loginSlice,
    userListSlice,
    dashboardAppSlice,
    userOrganizationType,
    clientOrganizationType,
    clientListSlice,
    messageLog,
    sampleFileusr,
    sampleFilecli,
    filterSlice,
    meetingListSlice,
    callListSlice,
    callDepen,
    callAgentsDepen,
    meetingDepen,
    MeetingAgentsDepen,
    userDetailShow,
    clientDetailShow,
    callDetailShow,
    meetingDetailShow,
    clientSearchSlice
  },
});
export default store;
