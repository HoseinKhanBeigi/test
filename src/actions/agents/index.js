import { createAsyncAction } from "../../services/actionHandler";

export const AgentsAction = createAsyncAction("/agents", "AgentsList", "get");