const Dashboard = () => {
  return (
    <>
      <h2 style={{ marginBottom: "30px" }}>Overview</h2>

      <div className="grid-3">
        <div className="card">
          <h4>Total Tickets</h4>
          <h2>0</h2>
        </div>

        <div className="card">
          <h4>Open Tickets</h4>
          <h2>0</h2>
        </div>

        <div className="card">
          <h4>Average Per Day</h4>
          <h2>0</h2>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
