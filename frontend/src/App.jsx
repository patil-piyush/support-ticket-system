import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import NewTicket from "./pages/NewTickets";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="tickets" element={<Tickets />} />
        <Route path="new-ticket" element={<NewTicket />} />
      </Route>
    </Routes>
  );
}

export default App;
