import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
