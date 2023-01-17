import { createAsyncAction } from "../../services/actionHandler";

export const usersList = createAsyncAction("/users", "usersList", "get");
export const deleteUser = createAsyncAction("/users", "deleteUser", "delete");
export const usersAssign = createAsyncAction("/users/assign", "usersAssign", "post");
export const userUpdate = createAsyncAction("/users","updateCleint","patch")
export const userCreateGroup = createAsyncAction("/users/import", "user/createGroup", "post");
export const userSampleFile = createAsyncAction("/users/import", "usersampleFile", "get");
export const userCreate = createAsyncAction("/users", "user/create", "post");
export const userDetail = createAsyncAction("/users", "userDetailslice", "get");
export const userOrganization = createAsyncAction(
  "/users/create",
  "userOrganizationType",
  "post"
);
