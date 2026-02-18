import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Support System</div>

      <NavLink to="/" end className="nav-link">
        Dashboard
      </NavLink>

      <NavLink to="/tickets" className="nav-link">
        Tickets
      </NavLink>

      <NavLink to="/new-ticket" className="nav-link">
        New Ticket
      </NavLink>
    </div>
  );
};

export default Sidebar;
