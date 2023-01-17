import { createAsyncAction } from "../../services/actionHandler";

export const interactions = createAsyncAction("/interactions", "interactions", "post");
