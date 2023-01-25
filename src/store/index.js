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
import { clientSearchSlice } from "../features/clientSearch";
import messageLog from "../features/messageLog";
import filterSlice from "../features/filter";
import { meetingListSlice } from "../features/meetings";
import { callListSlice } from "../features/calls";
import { callDepen } from "../features/callsDepen";
import { callAgentsDepen } from "../features/callagent";
import { meetingDependenciesSlice } from "../features/meetingDependenciesSlice";
import { MeetingAgentsDepen } from "../features/meetingAgent";
import userDetailShow from "../features/detailUser";
import { clientDetailShow } from "../features/clientDetail";
import { callDetailShow } from "../features/callDetail";
import { meetingDetailShow } from "../features/meetingDetail";
import { reportsSlice } from "../features/reportsMap";
import { interactionSlice } from "../features/interactions";
import noteSlice from "../features/notes";
import messageNoteSlice from "../features/noteMessage";
import MutiColors from "../features/mutiColors";
import navBarSlice from "../features/navbar";
import noteDependencies from "../features/noteDepedencies";
import tabSlice from "../features/tabs";
import { instructionsAdminSlice } from "../features/admin/instructions";
import { InstructionCategoriesSlice } from "../features/admin/instructionsCategories";
import { userManagerSlice } from "../features/admin/userManager";
import { branchesSlice } from "../features/admin/branches";
import permissionsSlice from "../features/admin/permissions";
import { clientNoteSlice } from "../features/notes/clientNote";
import { instructionsSlice } from "../features/instructions";
import {agentsSlice} from "../features/agents";

const store = configureStore({
  reducer: {
    noteSlice,
    agentsSlice,
    interactionSlice,
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
    meetingDependenciesSlice,
    MeetingAgentsDepen,
    userDetailShow,
    clientDetailShow,
    callDetailShow,
    meetingDetailShow,
    clientSearchSlice,
    messageNoteSlice,
    reportsSlice,
    MutiColors,
    navBarSlice,
    noteDependencies,
    tabSlice,
    instructionsAdminSlice,
    InstructionCategoriesSlice,
    userManagerSlice,
    branchesSlice,
    permissionsSlice,
    clientNoteSlice,
    instructionsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
