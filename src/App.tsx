import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Reports } from "./pages/reports";
import { Users } from "./pages/users";
import { Clients } from "./pages/clients";
import { Instructions } from "./pages/instructions";
import { Interactions } from "./pages/interactions";
import { Notes } from "./pages/notes";
import { AdminPanel } from "./pages/adminpanel";
import { Checkouts } from "./pages/checkouts";
import { Profile } from "./pages/profile";
import { Calls } from "./pages/calls";
import { Meetings } from "./pages/meetings";
// import { Login } from "./pages/login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { CreateUserSingle } from "./pages/users/singlForm";
import { CreateUserCouple } from "./pages/users/coupleForm";
import { CreateClientCouple } from "./pages/clients/coupleForm";
import { CreateClientSingle } from "./pages/clients/singleForm";
import { CompareUser } from "./pages/users/compareUser";
import { DetailReports } from "./pages/reports/reportDetail";
import { ClientDetail } from "./pages/clientDetail";
import { Accessiblities } from "./pages/adminpanel/accessibilies";
import { Search } from "./pages/search";
import { Branches } from "./pages/adminpanel/branches";
import { UserManager } from "./pages/adminpanel/userManager";
import { InstructionsUpdate } from "./pages/adminpanel/instructions";
import { SMS } from "./pages/adminpanel/sms";
import { FormCall } from "./pages/calls/form";
import { FormMeeting } from "./pages/meetings/form";

const Login = React.lazy(() => import("./pages/login"));

function App() {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {}, []);
  return (
    <Suspense fallback={<>...</>}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/reports">
              <Route index element={<Reports />} />
              <Route path=":id" element={<DetailReports />} />
            </Route>
            <Route path="/users">
              <Route index element={<Users />} />
              {/* <Route path=":id" element={<CreateUser />} /> */}
              <Route path="compare" element={<CompareUser />} />
              <Route
                path="create"
                element={<CreateUserSingle typeForm={"create"} />}
              />
              <Route
                path="update/:id"
                element={<CreateUserSingle typeForm={"edit"} />}
              />
              <Route path="createCouple" element={<CreateUserCouple />} />
            </Route>

            <Route path="/clients">
              <Route index element={<Clients />} />
              <Route path=":id" element={<ClientDetail />} />
              <Route
                path="create"
                element={<CreateClientSingle typeForm={"create"} />}
              />
              <Route
                path="update/:id"
                element={<CreateClientSingle typeForm={"edit"} />}
              />
              <Route path="createCouple" element={<CreateClientCouple />} />
            </Route>
            <Route path="/interactions">
              <Route index element={<Interactions />} />
              <Route path="calls">
                <Route index element={<Calls />} />
                <Route
                  path="create"
                  element={<FormCall typeForm={"create"} />}
                />
                <Route
                  path="update/:id"
                  element={<FormCall typeForm={"edit"} />}
                />
              </Route>

              <Route path="meetings">
                <Route index element={<Meetings />} />
                <Route
                  path="create"
                  element={<FormMeeting typeForm={"create"} />}
                />
                <Route
                  path="update/:id"
                  element={<FormMeeting typeForm={"edit"} />}
                />
              </Route>
            </Route>
            <Route path="/instructions" element={<Instructions />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/admin" element={<AdminPanel />}>
              <Route path="accessiblities" element={<Accessiblities />} />
              <Route path="branches" element={<Branches />} />
              <Route path="sms" element={<SMS />} />
              <Route path="userManager" element={<UserManager />} />
              <Route path="instructure" element={<InstructionsUpdate />} />
            </Route>

            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
