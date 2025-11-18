import { FaSignOutAlt } from "react-icons/fa";
import supabase from "../assets/supabaseClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [ps, setPs] = useState("");

  //   ---------------- FUNC --------------   //

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPs(value);
  };

  const logIn = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password: ps,
    };

    const { data, error: erroWhileLogin } =
      await supabase.auth.signInWithPassword(user);

    if (erroWhileLogin) {
      console.error("while logging in", erroWhileLogin);
    }

    if (data) {
      console.log("data >>", data);
      navigate("/home");
    }
  };

  return (
    <div className="auth-wrapper-auth">
      <h1>
        Log in{" "}
        <FaSignOutAlt size={30} style={{ transform: "translateY(10px)" }} />
      </h1>

      <div className="form-wrapper">
        <form onSubmit={logIn}>
          <section className="form-field">
            <label htmlFor="bio">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </section>

          <section className="form-field">
            <label htmlFor="name">Password</label>
            <input
              type="password"
              name="password"
              value={ps}
              onChange={handleChange}
            />
          </section>

          <div className="form-field auth-btns">
            <button type="submit">Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
