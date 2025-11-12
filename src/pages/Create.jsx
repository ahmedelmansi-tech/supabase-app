import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import supabase from "../assets/supabaseClient";
const Create = () => {
  const [name, setName] = useState("");
  const [stuff, setStuff] = useState(null);
  const [bio, setBio] = useState("");
  const [evaluation, setEvaluation] = useState(null);

  const navigate = useNavigate("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") setName(value);
    if (name === "stuff") setStuff(value);
    if (name === "bio") setBio(value);
    if (name === "evalution") setEvaluation(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !stuff || !bio || !evaluation) {
      toast.error("please fill in all feilds");
      return;
    } else {
      const { data, error } = await supabase
        .from("agents")
        .insert([{ name, stuff, bio, evaluation }]);

      if (error) {
        toast.error("Something went Wrong");
        console.log(error.message);
        return;
      }

      navigate("/");
    }
  };

  return (
    <div className="create-parent">
      <h1>Create New Agent &#128509;</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <section className="form-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="e.g. ahmed"
              value={name}
              onChange={handleChange}
            />
          </section>

          <section className="form-field">
            <label htmlFor="stuff">Stuff id</label>
            <input
              type="number"
              value={stuff || ""}
              name="stuff"
              id="stuff"
              min={10000}
              max={99999}
              pattern="[1-9]{5}"
              placeholder="e.g. 62926"
              onChange={handleChange}
            />
          </section>

          <section className="form-field">
            <label htmlFor="bio">Bio</label>
            <textarea
              name="bio"
              id="bio"
              value={bio}
              placeholder="in less than 50 words tell us about you ...."
              maxLength={50}
              onChange={handleChange}
            ></textarea>
          </section>

          <section className="form-field">
            <label htmlFor="bio">Evaluation</label>
            <input
              type="number"
              name="evalution"
              id="evalution"
              value={evaluation || ""}
              placeholder="e.g. 5"
              min={1}
              max={10}
              step={1}
              onChange={handleChange}
            />
          </section>

          <div className="form-field">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
