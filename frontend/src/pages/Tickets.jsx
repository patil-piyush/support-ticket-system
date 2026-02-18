const Tickets = () => {
  return (
    <>
      <h2 style={{ marginBottom: "30px" }}>All Tickets</h2>

      <div className="ticket-card">
        <h4>Sample Ticket Title</h4>
        <p style={{ margin: "10px 0", color: "#64748b" }}>
          Short preview of ticket description...
        </p>

        <div style={{ display: "flex", gap: "10px" }}>
          <span className="badge badge-blue">Technical</span>
          <span className="badge badge-red">High</span>
        </div>
      </div>
    </>
  );
};

export default Tickets;
