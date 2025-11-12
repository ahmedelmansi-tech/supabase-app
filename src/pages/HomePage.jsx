import supabase from "../assets/supabaseClient";
import AgentCard from "../components/AgentCard";
import { useState, useEffect } from "react";
const HomePage = () => {
  const [agents, setAgents] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getAgents = async () => {
      const { data, err } = await supabase.from("agents").select("*");

      if (err) {
        setError("Failed to Fetch Data");
        console.log(err);
        setAgents(null);
      }
      if (data) {
        setAgents(data);
        console.log(data);
        setError(null);
      }
    };

    getAgents();
  }, []);

  return (
    <div className="home-container">
      <div className="agents-display grid">
        {error && <p> Can't Get Any Data </p>}
        {agents &&
          agents.map((reb) => {
            return <AgentCard key={reb.id} agent={reb} />;
          })}
      </div>
    </div>
  );
};

export default HomePage;
