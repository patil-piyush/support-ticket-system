import { useEffect, useState } from "react";
import { fetchTickets } from "../api/ticketsApi";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await fetchTickets();
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, []);

  if (loading) return <p>Loading tickets...</p>;

  return (
    <>
      <h2 style={{ marginBottom: "30px" }}>All Tickets</h2>

      {tickets.length === 0 ? (
        <p>No tickets available.</p>
      ) : (
        tickets.map((ticket) => (
          <div key={ticket.id} className="ticket-card">
            <h4>{ticket.title}</h4>
            <p style={{ margin: "10px 0", color: "#64748b" }}>
              {ticket.description?.substring(0, 120)}...
            </p>

            <div style={{ display: "flex", gap: "10px" }}>
              <span className="badge badge-blue">
                {ticket.category}
              </span>
              <span className="badge badge-red">
                {ticket.priority}
              </span>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Tickets;
