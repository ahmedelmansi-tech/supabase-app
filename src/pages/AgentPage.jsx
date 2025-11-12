import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../assets/supabaseClient";
import { useState, useEffect } from "react";
const AgentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [stuff, setStuff] = useState(null);
  const [bio, setBio] = useState("");
  const [evaluation, setEvaluation] = useState(null);

  useEffect(() => {
    const singleAgentData = async () => {
      const { data, error } = await supabase
        .from("agents")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        toast.error(`something went wrong 😔`);
        navigate("/", { replace: true });
        return;
      }

      if (data) {
        console.log(data);

        setName(data.name);
        setStuff(data.stuff);
        setBio(data.bio);
        setEvaluation(data.evaluation);
      }
    };

    singleAgentData();
  }, [id]);

  //---------------------------------------------//

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
        .update([{ name, stuff, bio, evaluation }])
        .eq("id", id);

      if (error) {
        toast.error("Something went Wrong");
        console.log(error.message);
        return;
      }

      navigate("/");
      toast.success("Data Updated successfuly 🚀");
    }
  };

  return (
    <div className="create-parent">
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
            <button type="submit">Edite </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentPage;
