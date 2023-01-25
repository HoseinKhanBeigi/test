import { createAsyncAction } from "../../services/actionHandler";

export const notesAction = createAsyncAction("/notes", "notesAction", "get");
export const messageNoteAction = createAsyncAction("/notes", "noteMessage", "get");
export const storeMessageNote = createAsyncAction("/notes", "storeMessageNote", "post");
export const messageDepedencies = createAsyncAction("/notes/message/create", "messageDependencies", "get");
export const clientsNote = createAsyncAction("/notes/create", "clientsNotesList", "get");
