import { useContext, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";

const NewSkillPage = () => {
  const navigate = useNavigate();

  const { token } = useContext(SessionContext);

  const [skillName, setSkillName] = useState("");
  const [user, setUser] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/skills`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            skill: skillName, 
            user, 
            city, 
          }),
        }
      );
      if (response.status === 201) {
        navigate("/skills");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>New skill</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Skill name
          <input
            required
            value={skillName}
            onChange={(event) => setSkillName(event.target.value)}
          />
        </label>
        <label>
          User
          <input
            required
            value={user}
            onChange={(event) => setUser(event.target.value)}
          />
        </label>
        <label>
          City
          <input
            required
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </label>

        <button type="submit">Add skill</button>
      </form>
    </>
  );
};

export default NewSkillPage;
