import { useEffect, useState } from "react";
import { fetchTickets, updateTicket } from "../api/ticketsApi";
import { useContext } from "react";
import { TicketContext } from "../context/TicketContext";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { triggerRefresh } = useContext(TicketContext);

  const [filters, setFilters] = useState({
    category: "",
    priority: "",
    status: "",
    search: "",
  });

  // Fetch tickets whenever filters change
  useEffect(() => {
    const loadTickets = async () => {
      try {
        setLoading(true);

        const params = {};
        if (filters.category) params.category = filters.category;
        if (filters.priority) params.priority = filters.priority;
        if (filters.status) params.status = filters.status;
        if (filters.search) params.search = filters.search;

        const data = await fetchTickets(params);
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateTicket(id, { status: newStatus });
      triggerRefresh();

      // Refresh tickets
      const data = await fetchTickets(filters);
      setTickets(data);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <>
      <h2 style={{ marginBottom: "30px" }}>All Tickets</h2>

      {/* FILTER SECTION */}
      <div className="card" style={{ marginBottom: "25px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px" }}>

          <input
            type="text"
            name="search"
            placeholder="Search tickets..."
            value={filters.search}
            onChange={handleFilterChange}
          />

          <select name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="">All Categories</option>
            <option value="billing">Billing</option>
            <option value="technical">Technical</option>
            <option value="account">Account</option>
            <option value="general">General</option>
          </select>

          <select name="priority" value={filters.priority} onChange={handleFilterChange}>
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>

          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        tickets.map((ticket) => (
          <div key={ticket.id} className="ticket-card" style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <h4>{ticket.title}</h4>
                <p style={{ margin: "8px 0", color: "#64748b" }}>
                  {ticket.description?.substring(0, 120)}...
                </p>

                <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                  <span className="badge badge-blue">
                    {ticket.category}
                  </span>
                  <span className="badge badge-red">
                    {ticket.priority}
                  </span>
                </div>
              </div>

              {/* STATUS DROPDOWN */}
              <div>
                <select
                  value={ticket.status}
                  onChange={(e) =>
                    handleStatusChange(ticket.id, e.target.value)
                  }
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Tickets;
