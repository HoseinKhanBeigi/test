import React, {  Suspense } from "react";
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
// import { Login } from "./pages/login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { CreateUserSingle } from "./pages/users/singlForm";
import { CreateUserCouple } from "./pages/users/coupleForm";
import { CreateClientCouple } from "./pages/clients/coupleForm";
import { CreateClientSingle } from "./pages/clients/singleForm";
import { CompareUser } from "./pages/users/compareUser";
import { ReportDetail } from "./pages/reports/reportDetail";
import LinearProgress from "@mui/material/LinearProgress";


const Login = React.lazy(() => import("./pages/login"));



function App() {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
        setProgress((oldProgress) => {
            const diff = Math.random() * 30;
            return Math.min(oldProgress + diff, 100);
        });
    }, 500);
  
    return () => {
        clearInterval(timer);
    };
  }, []);
  return (
    <Suspense fallback={<>...</>}>
    <Routes>
    
      <Route path="login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/reports">
            <Route index element={<Reports />} />
            <Route path=":id" element={<ReportDetail />} />
          </Route>
          <Route path="/users">
            <Route index element={<Users />} />
            {/* <Route path=":id" element={<CreateUser />} /> */}
            <Route path="compare" element={<CompareUser />} />
            <Route path="createSingle" element={<CreateUserSingle />} />
            <Route path="createCouple" element={<CreateUserCouple />} />
          </Route>

          <Route path="/clients">
            <Route index element={<Clients />} />
            <Route path="createSingle" element={<CreateClientSingle />} />
            <Route path="createCouple" element={<CreateClientCouple />} />
          </Route>
          <Route path="/interactions" element={<Interactions />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/checkouts" element={<Checkouts />} />
          <Route path="/checkouts" element={<Checkouts />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
    </Suspense>
  );
}

export default App;
