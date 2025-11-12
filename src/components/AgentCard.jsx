import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import supabase from "../assets/supabaseClient";
const AgentCard = ({ agent }) => {
  const handleDelete = async () => {
    console.log("DELETE ");
    const { data, error } = await supabase
      .from("agents")
      .delete()
      .eq("id", agent.id);
  };

  return (
    <div className="agent-card">
      <h2>
        {agent.name} - [{agent.stuff}]
      </h2>
      <p>{agent.bio}</p>
      <span>{agent.evaluation}</span>
      <Link className="edit" to={`/${agent.id}`}>
        <FaEdit />
      </Link>

      <button className="del" onClick={handleDelete}>
        <FaTrash />
      </button>
    </div>
  );
};

export default AgentCard;
