import { createAsyncAction } from "../../services/actionHandler";

export const instructionsAction = createAsyncAction("/instructions", "instructionsList", "get");