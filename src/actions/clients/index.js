import { createAsyncAction } from "../../services/actionHandler";


export const clientsList = createAsyncAction("/clients", "clientsList","get");
export const clientCreate =  createAsyncAction("/clients", "clientCreate","post");
export const clientUpdate = createAsyncAction("/clients","updateCleint","patch");
export const clientOrganization = createAsyncAction("/clients/create", "clientOrganization","get");
export const clientCreateGroup = createAsyncAction("/clients/import", "client/createGroup", "post");
export const clientSampleFile = createAsyncAction("/clients/import", "clientsampleFile", "get");
export const deleteClient = createAsyncAction("/clients", "deleteCient", "delete");
export const clientDetail = createAsyncAction("/clients", "clientDetial", "get");
export const clientSearch = createAsyncAction("/clients/search", "clientSearch", "get");
