const AgentCard = ({ agent }) => {
  return (
    <div className="agent-card">
      <h2>
        {agent.name} - [{agent.stuff}]
      </h2>
      <p>{agent.bio}</p>
      <span>{agent.evaluation}</span>
    </div>
  );
};

export default AgentCard;
