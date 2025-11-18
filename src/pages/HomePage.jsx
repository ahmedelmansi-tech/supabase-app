import supabase from "../assets/supabaseClient";
import AgentCard from "../components/AgentCard";
import { useState, useEffect } from "react";
const HomePage = () => {
  const [agents, setAgents] = useState(null);
  const [err, setErr] = useState(null);
  const [order, setOrder] = useState("created_at");
  const [session, setSesson] = useState(null);

  const deleteCard = (id) => {
    setAgents((prev) => {
      return prev.filter((reb) => reb.id !== id);
    });
  };

  const arrangeName = async () => {
    const { data, error } = await supabase
      .from("agents")
      .select("name ,evaluation")
      .order("evaluation", { ascending: false });

    if (data) {
      console.log(data);
    }
  };

  useEffect(() => {
    const news = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("NEWS FUNC RETURN ", data.session);
      setSesson(data.session);
    };

    news();
  }, []);

  useEffect(() => {
    const getAgents = async () => {
      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .order(order, { ascending: false });

      if (error) {
        setErr("Failed to Fetch Data");
        // console.log(error);
        setAgents(null);
      }
      if (data) {
        setAgents(data);
        // console.log(data);
        setErr(null);
      }
    };

    if (session) {
      getAgents();
    } else {
      setSesson(null);
    }
    arrangeName();
  }, [order, session]);

  return (
    <div className="home-container">
      <div className="btns">
        <span>Order - By :</span>
        <button
          onClick={function () {
            setOrder("created_at");
            this.classList.add("active");
          }}
        >
          Time
        </button>
        <button onClick={() => setOrder("name")}>name</button>
        <button onClick={() => setOrder("evaluation")}>Evaluation</button>
      </div>

      <div className="agents-display grid">
        {err && <p> {err} </p>}
        {(!session && <p>Log in to See what's new</p>) ||
          (Array.isArray(agents) && agents.length <= 0 && <p>No Data Found</p>)}
        {agents &&
          agents.map((reb) => {
            return <AgentCard key={reb.id} agent={reb} ondelete={deleteCard} />;
          })}
      </div>
    </div>
  );
};

export default HomePage;
