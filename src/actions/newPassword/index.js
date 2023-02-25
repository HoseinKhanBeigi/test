import { createAsyncAction } from "../../services/actionHandler";

export const resetPasswordAction = createAsyncAction("/reset-password", "resetPassword", "post");