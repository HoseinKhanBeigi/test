
import { createAsyncAction } from "../../services/actionHandler";

export const dashboardApp = createAsyncAction("/dashboard", "dashboard","get");
