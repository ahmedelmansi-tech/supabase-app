import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const AgentCard = ({ agent }) => {
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
    </div>
  );
};

export default AgentCard;
