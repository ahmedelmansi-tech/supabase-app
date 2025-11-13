import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import supabase from "../assets/supabaseClient";
import { toast } from "react-toastify/unstyled";

const AgentCard = ({ agent, ondelete }) => {
  const handleDelete = async () => {
    console.log("DELETE ");
    const { data, error } = await supabase
      .from("agents")
      .delete()
      .eq("id", agent.id)
      .select();

    if (error) {
      console.log(error);
      toast.error("Failed to delete");
    }

    if (data) {
      console.log(data);
      ondelete(agent.id);
      toast.success("Card deleted successfully");
    }
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
