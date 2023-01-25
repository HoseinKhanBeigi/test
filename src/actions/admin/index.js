import { createAsyncAction } from "../../services/actionHandler";

export const InstructionsAdmin = createAsyncAction("/admin/instructions", "instructionsAdmin", "get");
export const InstructionCategoriesAction = createAsyncAction("/admin/instructions/create", "instructionsCategories", "get");
export const InstructionAdminCreate = createAsyncAction("/admin/instructions", "instructionsAdminCreate", "post");
export const InstructionAdminUpdate = createAsyncAction("/admin/instructions", "instructionsAdminUpdate", "patch");
export const InstructionAdminDelete = createAsyncAction("/admin/instructions", "instructionsAdminDelete", "delete");
export const UserManagerAction = createAsyncAction("/admin/users", "userManager", "get");
export const BranchesAction = createAsyncAction("/admin/branches", "branchesList", "get");
export const PermissinsAction = createAsyncAction("/admin/permissions", "permissionsList", "get");