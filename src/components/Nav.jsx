import { FaHome, FaSignOutAlt, FaUser, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../assets/supabaseClient";
import { useEffect, useState } from "react";
const Nav = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(true);
  const iconStyles = {
    cursor: "pointer",
    color: "rgba(0,0,0,.6)",
  };

  // LOG---OUT
  const logOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  useEffect(() => {
    const currentSessionIs = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    currentSessionIs();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log("Session From Auth State Change", session);
        setSession(session);
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  return (
    <nav>
      <div>
        <Link to={"/home"}>
          <FaHome size={40} style={iconStyles} />
        </Link>
      </div>
      <div>
        {session ? (
          <>
            <Link to={"/create"}>
              <FaEdit size={34} style={iconStyles} />
            </Link>
            <button className="logout" onClick={logOut}>
              Log Out
            </button>
          </>
        ) : (
          <div>
            <Link to={"/"}>
              <FaUser
                size={34}
                style={{ marginRight: "25px", color: "#4b4b4bff" }}
              />
            </Link>
            <Link to={"/login"}>
              <FaSignOutAlt size={34} color="#4b4b4bff" />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
