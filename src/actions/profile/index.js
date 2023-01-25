
import { createAsyncAction } from "../../services/actionHandler";

export const dashboardApp = createAsyncAction("/dashboard", "dashboard","get");
export const uploadAvatar = createAsyncAction("/profile/avatar", "avatarUpload","post");
