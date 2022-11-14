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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<Home />} />
        <Route path="reports" element={<Reports />} />
        <Route path="users" element={<Users />} />
        <Route path="clients" element={<Clients />} />
        <Route path="interactions" element={<Interactions />} />
        <Route path="instructions" element={<Instructions />} />
        <Route path="notes" element={<Notes />} />
        <Route path="admin" element={<AdminPanel />} />
        <Route path="checkouts" element={<Checkouts />} />
        <Route path="checkouts" element={<Checkouts />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
