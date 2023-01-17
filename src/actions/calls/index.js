import { createAsyncAction } from "../../services/actionHandler";

export const callsList = createAsyncAction("/calls", "callList", "get");
export const callsDepen =  createAsyncAction("/calls/create", "depenCalls", "get");
export const callsDepenAgent = createAsyncAction("/calls/create", "depencallAgent", "get");
export const callsCreate =  createAsyncAction("/calls", "createCall", "post");
export const callsDetail =  createAsyncAction("/calls", "detail", "get");
export const callsUpdate =  createAsyncAction("/calls", "updateCalls", "patch");
export const deleteCalls = createAsyncAction("/calls", "deleteCalls", "delete");

