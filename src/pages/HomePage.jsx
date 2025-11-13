import supabase from "../assets/supabaseClient";
import AgentCard from "../components/AgentCard";
import { useState, useEffect } from "react";
const HomePage = () => {
  const [agents, setAgents] = useState(null);
  const [err, setErr] = useState(null);
  const [order, setOrder] = useState("created_at");

  const deleteCard = (id) => {
    setAgents((prev) => {
      return prev.filter((reb) => reb.id !== id);
    });
  };

  useEffect(() => {
    const getAgents = async () => {
      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .order(order, { ascending: false });

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
  }, [order]);

  {
    console.log(order);
  }
  return (
    <div className="home-container">
      <div className="btns">
        <span>Order - By :</span>
        <button onClick={() => setOrder("created_at")}>Time</button>
        <button onClick={() => setOrder("name")}>name</button>
        <button onClick={() => setOrder("evaluation")}>Evaluation</button>
      </div>

      <div className="agents-display grid">
        {err && <p> {err} </p>}
        {Array.isArray(agents) && agents.length <= 0 && <p>No Data Found</p>}
        {agents &&
          agents.map((reb) => {
            return <AgentCard key={reb.id} agent={reb} ondelete={deleteCard} />;
          })}
      </div>
    </div>
  );
};

export default HomePage;
