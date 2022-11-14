import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Reports } from "./pages/reports";
import { Users } from "./pages/users";
import { Clients } from "./pages/clients";
import {Instructions} from "./pages/instructions";
import {Interactions} from "./pages/interactions";

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
        <Route path="clients" element={<Clients />} />
        <Route path="clients" element={<Clients />} />
      </Route>
    </Routes>
  );
}

export default App;
