import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";

const AllSkillsPage = () => {
  const { token } = useContext(SessionContext);

  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [skillSearch, setSkillSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [userSearch, setUserSearch] = useState("");

  const fetchAllSkills = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/skills`
      );
      if (response.ok) {
        const skillsData = await response.json();
        setSkills(skillsData);
        setFilteredSkills(skillsData);
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    fetchAllSkills();
  }, []);

  const handleDelete = async (currentSkillId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/skills/${currentSkillId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 204) {
        fetchAllSkills();
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  const handleSearch = () => {
    let filtered = skills;
    if (skillSearch) {
      filtered = filtered.filter((skill) =>
        skill.skill.toLowerCase().includes(skillSearch.toLowerCase())
      );
    }
    if (citySearch) {
      filtered = filtered.filter((skill) =>
        skill.city?.name.toLowerCase().includes(citySearch.toLowerCase())
      );
    }
    if (userSearch) {
      filtered = filtered.filter((skill) =>
        skill.user?.username.toLowerCase().includes(userSearch.toLowerCase())
      );
    }
    setFilteredSkills(filtered);
  };

  return (
    <>
      <h1>All Skills</h1>
      <div>
        <input
          type="text"
          placeholder="Search by skill"
          value={skillSearch}
          onChange={(e) => setSkillSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by city"
          value={citySearch}
          onChange={(e) => setCitySearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by user"
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Skill Name</th>
            <th>City</th>
            <th>User</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSkills.map((currentSkill) => (
            <tr key={currentSkill._id}>
              <td>{currentSkill.skill}</td>
              <td>{currentSkill.city?.name || "N/A"}</td>
              <td>{currentSkill.user?.username || "N/A"}</td>
              <td>{currentSkill.user?.email || "N/A"}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleDelete(currentSkill._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AllSkillsPage;
