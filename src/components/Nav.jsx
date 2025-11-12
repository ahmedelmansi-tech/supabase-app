import { FaHome } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Nav = () => {
  const iconStyles = {
    cursor: "pointer",
    color: "rgba(0,0,0,.6)",
  };

  return (
    <nav>
      <div>
        <Link to={"/"}>
          <FaHome size={40} style={iconStyles} />
        </Link>
      </div>
      <div>
        <Link to={"/create"}>
          <FaPenToSquare size={34} style={iconStyles} />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
