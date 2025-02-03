import { useContext, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";

const NewSkillPage = () => {
  const navigate = useNavigate();
  const { token, user } = useContext(SessionContext); // SessionContext should provide the logged-in user's data

  const [skillName, setSkillName] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      // Fetch user details using the logged-in user's username
      const [userResponse] = await Promise.all([
        fetch(
          `${import.meta.env.VITE_API_URL}/api/users?username=${user.username}`
        ),
      ]);

      if (!userResponse.ok) throw new Error("User not found");

      const userData = await userResponse.json();

      // Create the city if it doesn't exist (the backend returns the existing city if already present)
      const cityCreateResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cities`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: city }),
        }
      );

      if (!cityCreateResponse.ok) throw new Error("Failed to create city");

      const cityData = await cityCreateResponse.json();

      // Create the skill and link it to the user and city
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
            user: userData._id,
            city: cityData._id,
          }),
        }
      );

      if (response.ok) {
        navigate("/skills");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to add skill.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>New Skill</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Skill Name:</label>
          <input
            type="text"
            required
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
          />
        </div>
        <div>
          <label>Username:</label>
          {/* Pre-filled with logged-in user's username; read-only */}
          <input type="text" value={user.username} readOnly />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <button type="submit">Add Skill</button>
      </form>
    </div>
  );
};

export default NewSkillPage;
