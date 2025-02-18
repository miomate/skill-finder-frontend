import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";

const NewSkillPage = () => {
  const { user, token } = useContext(SessionContext);
  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      fetch(`${import.meta.env.VITE_API_URL}/api/skills/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setSkills(data))
        .catch((error) => console.error("Error fetching user skills:", error));
    }
  }, [user, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const skillExists = skills.some(
      (skill) => skill.skill === skillName && skill.city.name === city
    );
    if (skillExists) {
      setError("This skill already exists in this city.");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/skills`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ skill: skillName, user: user._id, city }),
        }
      );
      if (response.ok) {
        const newSkill = await response.json();
        setSkills([...skills, newSkill]);
        setSkillName("");
        setCity("");
        setError("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (skillId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/skills/${skillId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 204) {
        setSkills(skills.filter((skill) => skill._id !== skillId));
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  const handleUpdate = async (skillId, updatedSkill, updatedCity) => {
    console.log("Updating skill with ID:", skillId); // Debugging
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/skills/${skillId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ skill: updatedSkill, city: updatedCity }),
        }
      );
      if (response.ok) {
        setSkills(
          skills.map((skill) =>
            skill._id === skillId
              ? { ...skill, skill: updatedSkill, city: { name: updatedCity } }
              : skill
          )
        );
      } else {
        console.error("Failed to update skill:", await response.json());
      }
    } catch (error) {
      console.error("Error updating skill:", error);
    }
  };

  return (
    <div>
      <h2>Add a Skill</h2>
      {user ? (
        <form onSubmit={handleSubmit}>
          <label>Skill Name:</label>
          <input
            type="text"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            required
          />
          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <button type="submit">Add Skill</button>
        </form>
      ) : (
        <p>You must be logged in to add a skill.</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {skills.length > 0 && (
        <div>
          <h3>Your Skills</h3>
          <table border="1">
            <thead>
              <tr>
                <th>Skill</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill._id}>
                  <td>
                    <input
                      type="text"
                      value={skill.skill}
                      onChange={(e) =>
                        setSkills(
                          skills.map((s) =>
                            s._id === skill._id
                              ? { ...s, skill: e.target.value }
                              : s
                          )
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={skill.city.name}
                      onChange={(e) =>
                        setSkills(
                          skills.map((s) =>
                            s._id === skill._id
                              ? { ...s, city: { name: e.target.value } }
                              : s
                          )
                        )
                      }
                    />
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleUpdate(skill._id, skill.skill, skill.city.name)
                      }
                    >
                      Update
                    </button>
                    <button onClick={() => handleDelete(skill._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NewSkillPage;
