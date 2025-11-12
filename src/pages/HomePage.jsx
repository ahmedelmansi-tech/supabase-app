import supabase from "../assets/supabaseClient";
import AgentCard from "../components/AgentCard";
import { useState, useEffect } from "react";
const HomePage = () => {
  const [agents, setAgents] = useState(null);
  const [err, setErr] = useState(null);
  useEffect(() => {
    const getAgents = async () => {
      const { data, error } = await supabase.from("agents").select("*");

      if (error) {
        setErr("Failed to Fetch Data");
        console.log(error);
        setAgents(null);
      }
      if (data) {
        setAgents(data);
        console.log(data);
        setErr(null);
      }
    };

    getAgents();
  }, []);

  return (
    <div className="home-container">
      <div className="agents-display grid">
        {err && <p> {err} </p>}
        {agents &&
          agents.map((reb) => {
            return <AgentCard key={reb.id} agent={reb} />;
          })}
      </div>
    </div>
  );
};

export default HomePage;
