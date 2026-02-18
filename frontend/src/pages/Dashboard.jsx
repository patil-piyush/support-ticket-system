import { useEffect, useState, useContext } from "react";
import { fetchStats } from "../api/ticketsApi";
import { TicketContext } from "../context/TicketContext";

const Dashboard = () => {
  const { refreshKey } = useContext(TicketContext);

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await fetchStats();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [refreshKey]); // 🔥 reacts to changes

  if (loading) return <p>Loading stats...</p>;

  return (
    <>
      <h2 style={{ marginBottom: "30px" }}>Overview</h2>

      <div className="grid-3" style={{ marginBottom: "30px" }}>
        <div className="card">
          <h4>Total Tickets</h4>
          <h2>{stats?.total_tickets || 0}</h2>
        </div>

        <div className="card">
          <h4>Open Tickets</h4>
          <h2>{stats?.open_tickets || 0}</h2>
        </div>

        <div className="card">
          <h4>Average Per Day</h4>
          <h2>{stats?.avg_tickets_per_day || 0}</h2>
        </div>
      </div>

      {/* Priority Breakdown */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <h4 style={{ marginBottom: "15px" }}>Priority Breakdown</h4>
        {Object.entries(stats?.priority_breakdown || {}).map(
          ([key, value]) => (
            <p key={key}>
              {key}: <strong>{value}</strong>
            </p>
          )
        )}
      </div>

      {/* Category Breakdown */}
      <div className="card">
        <h4 style={{ marginBottom: "15px" }}>Category Breakdown</h4>
        {Object.entries(stats?.category_breakdown || {}).map(
          ([key, value]) => (
            <p key={key}>
              {key}: <strong>{value}</strong>
            </p>
          )
        )}
      </div>
    </>
  );
};

export default Dashboard;
