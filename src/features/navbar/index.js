import { createSlice } from "@reduxjs/toolkit";
import {
  Dlogo,
  Hlogo,
  ReLogo,
  Users,
  Clients,
  InteractionsLogo,
  InstructionsLogo,
  NotesLogo,
  AdminLogo,
  Checkouts,
  ProfileLogo,
  IconMenuBar,
  SearchIcon,
} from "../../components/icons";

const initialState = {
  navbarList: [
    { id: "logo", color: "#ffffff", status: false, Logo: Dlogo , path:"home" },
    { id: "home", color: "#ffffff", status: false, Logo: Hlogo,path:"home" },
    { id: "reports", color: "#ffffff", status: false, Logo: ReLogo,path:"reports" },
    { id: "users", color: "#ffffff", status: false, Logo: Users,path:"users" },
    { id: "clients", color: "#ffffff", status: false, Logo: Clients,path:"clients" },
    {
      id: "interactions",
      color: "#ffffff",
      status: false,
      Logo: InteractionsLogo,
      path:"interactions"
    },
    {
      id: "instructions",
      color: "#ffffff",
      status: false,
      Logo: InstructionsLogo,
      path:"instructions"
    },
    { id: "notes", color: "#ffffff", status: false, Logo: NotesLogo,path:"notes" },
    { id: "admin", color: "#ffffff", status: false, Logo: AdminLogo,path:"admin/accessiblities" },
    { id: "search", color: "#ffffff", status: false, Logo: SearchIcon,path:"search" },

    { id: "IconMenuBar", color: "#ffffff", status: false, Logo: IconMenuBar },
    { id: "profile", color: "#ffffff", status: false, Logo: ProfileLogo,path:"profile" },
  ],
};

const navBarSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeMenuBar(state, action) {
      state.navbarList = state.navbarList.map((item) => {
        if (item.id === action.payload.status) {
          return { ...item, status: true };
        } else {
          return { ...item, status: false };
        }
      });
    },
  },
});

export const { changeMenuBar } = navBarSlice.actions;
export default navBarSlice.reducer;
