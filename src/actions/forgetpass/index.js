import { createAsyncAction } from "../../services/actionHandler";

export const sendLinkAction = createAsyncAction("/forgot-password", "forgetpassword", "post");