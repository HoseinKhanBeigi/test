import { createAsyncAction } from "../../services/actionHandler";

export const reportsAction = createAsyncAction("/reports", "reports", "get");
export const searchReport = createAsyncAction("/reports/search", "reportsearch", "post");
export const searchInMap = createAsyncAction("/reports/map", "reportsMap", "post");