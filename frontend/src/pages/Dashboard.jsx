import { useEffect, useState } from "react";
import { fetchStats } from "../api/ticketsApi";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchStats();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) return <p>Loading stats...</p>;

  return (
    <>
      <h2 style={{ marginBottom: "30px" }}>Overview</h2>

      <div className="grid-3">
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
    </>
  );
};

export default Dashboard;
