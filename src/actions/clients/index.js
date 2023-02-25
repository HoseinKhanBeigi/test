import { createAsyncAction } from "../../services/actionHandler";


export const clientsList = createAsyncAction("/clients", "clientsList","get");
export const ownClientsAction = createAsyncAction("/users", "clientsown", "get","/clients");
export const clientAgentsAction = createAsyncAction("/clients", "clientAgentList", "get","/agents");
export const clientMeetingsAction = createAsyncAction("/clients", "clientMeetingsList", "get","/meetings");
export const clientCallsAction = createAsyncAction("/clients", "clientCallsList", "get","/calls");
export const clientCardAction = createAsyncAction("/clients", "clientsCards","get");
export const clientCreate =  createAsyncAction("/clients", "clientCreate","post");
export const clientUpdate = createAsyncAction("/clients","updateCleint","patch");
export const clientOrganization = createAsyncAction("/clients/create", "clientOrganization","get");
export const clientCreateGroup = createAsyncAction("/clients/import", "client/createGroup", "post");
export const clientSampleFile = createAsyncAction("/clients/import", "clientsampleFile", "get");
export const deleteClient = createAsyncAction("/clients", "deleteCient", "delete");
export const clientDetail = createAsyncAction("/clients", "clientDetial", "get");
export const clientSearch = createAsyncAction("/clients/search", "clientSearch", "get");
