import { createSlice } from "@reduxjs/toolkit";
import { clientsList } from "../../actions/clients";
import { usersList } from "../../actions/users";
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
  navbarList: {
    menuWidth: false,
    one: {
      values: [
        {
          id: "logo",
          color: "#ffffff",
          status: false,
          Logo: Dlogo,
          path: "home",
        },
      ],
    },
    two: {
      values: [
        {
          id: "home",
          color: "#ffffff",
          status: false,
          Logo: Hlogo,
          path: "home",
        },
        {
          id: "reports",
          color: "#ffffff",
          status: false,
          Logo: ReLogo,
          path: "reports",
          name: "report",
        },
        {
          id: "users",
          color: "#ffffff",
          status: false,
          Logo: Users,
          path: "users",
          name: "user_show",
          action:usersList,
          keySearch:"level"
        },
        {
          id: "clients",
          color: "#ffffff",
          status: false,
          Logo: Clients,
          path: "clients",
          name: "client_show",
          action:clientsList,
          keySearch:"user"
        },
        {
          id: "interactions",
          color: "#ffffff",
          status: false,
          Logo: InteractionsLogo,
          path: "interactions",
          name: "interaction",
        },
        {
          id: "instructions",
          color: "#ffffff",
          status: false,
          Logo: InstructionsLogo,
          path: "instructions",
          name: "instruction",
        },
        {
          id: "notes",
          color: "#ffffff",
          status: false,
          Logo: NotesLogo,
          path: "notes",
          name: "note",
        },
        {
          id: "admin",
          color: "#ffffff",
          status: false,
          Logo: AdminLogo,
          path: "admin/accessiblities",
        },
        // {
        //   id: "search",
        //   color: "#ffffff",
        //   status: false,
        //   Logo: SearchIcon,
        //   path: "search",
        //   name: "others_client_show",
        // },
      ],
    },
    three: {
      values: [
        {
          show: true,
          id: "IconMenuBar",
          color: "#ffffff",
          status: false,
          Logo: IconMenuBar,
        },
        {
          show: true,
          id: "profile",
          color: "#ffffff",
          status: false,
          Logo: ProfileLogo,
          path: "profile",
        },
      ],
    },
  },
};

const navBarSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeMenuBar(state, action) {
      state.navbarList[action.payload.key].values = state.navbarList[
        action.payload.key
      ].values.map((item) => {
        if (item.id === action.payload.status) {
          return { ...item, status: true };
        } else {
          return { ...item, status: false };
        }
      });
      if (action.payload.key === "two") {
        state.navbarList["three"].values = state.navbarList["three"].values.map(
          (item) => {
            return { ...item, status: false };
          }
        );
      } else if (action.payload.key === "three") {
        if (action.payload.name === "IconMenuBar") {
          state.navbarList.menuWidth = !state.navbarList.menuWidth;
        }

        state.navbarList["two"].values = state.navbarList["two"].values.map(
          (item) => {
            return { ...item, status: false };
          }
        );
      }
    },
    openMenuBar(state, action) {
      state.navbarList.menuWidth = !state.navbarList.menuWidth;
    },
    filterMenuItem(state, action) {
      state.navbarList["three"].values = state.navbarList["three"].values.map(
        (item) => {
          if (item.id === "IconMenuBar" && action.payload.isDesktop === false) {
            return { ...item, show: false };
          } else {
            return { ...item, show: true };
          }
        }
      );
    },
  },
});

export const { changeMenuBar, openMenuBar, filterMenuItem, showMenuItem } =
  navBarSlice.actions;
export default navBarSlice.reducer;
