import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";

const NewSkillPage = () => {
  const { user, token } = useContext(SessionContext);
  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState(""); // State to store error message

  // Fetch user's skills
  useEffect(() => {
    if (user) {
      console.log("Fetching skills for user ID:", user._id);
      fetch(`${import.meta.env.VITE_API_URL}/api/skills/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("User skills not found.");
          return res.json();
        })
        .then((data) => setSkills(data))
        .catch((error) => console.error("Error fetching user skills:", error));
    }
  }, [user, token]);

  // Handle new skill submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if skill already exists in the selected city
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
        setSkills([...skills, newSkill]); // Update table with new skill
        setSkillName("");
        setCity("");
        setError(""); // Clear error message
      } else {
        console.error("Failed to add skill.");
        setError("Failed to add skill."); // Set error message if the request fails
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error occurred while adding the skill.");
    }
  };

  const handleDelete = async (skillId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/skills/${skillId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 204) {
        setSkills(skills.filter((skill) => skill._id !== skillId));
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
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
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message */}
      {/* Table displaying user's skills */}
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
                  <td>{skill.skill}</td>
                  <td>{skill.city.name}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDelete(skill._id)}
                    >
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

// import { useContext, useEffect, useState } from "react";
// import { SessionContext } from "../contexts/SessionContext";

// const NewSkillPage = () => {
//   const { user, token } = useContext(SessionContext);
//   const [skills, setSkills] = useState([]);
//   const [skillName, setSkillName] = useState("");
//   const [city, setCity] = useState("");

//   // Fetch user's skills
//   useEffect(() => {
//     if (user) {
//       console.log("Fetching skills for user ID:", user._id);
//       fetch(`${import.meta.env.VITE_API_URL}/api/skills/user/${user._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//         .then((res) => {
//           if (!res.ok) throw new Error("User skills not found.");
//           return res.json();
//         })
//         .then((data) => setSkills(data))
//         .catch((error) => console.error("Error fetching user skills:", error));
//     }
//   }, [user, token]);

//   // Handle new skill submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/api/skills`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ skill: skillName, user: user._id, city }),
//         }
//       );

//       if (response.ok) {
//         const newSkill = await response.json();
//         setSkills([...skills, newSkill]); // Update table with new skill
//         setSkillName("");
//         setCity("");
//       } else {
//         console.error("Failed to add skill.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Add a Skill</h2>
//       {user ? (
//         <form onSubmit={handleSubmit}>
//           <label>Skill Name:</label>
//           <input
//             type="text"
//             value={skillName}
//             onChange={(e) => setSkillName(e.target.value)}
//             required
//           />
//           <label>City:</label>
//           <input
//             type="text"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             required
//           />
//           <button type="submit">Add Skill</button>
//         </form>
//       ) : (
//         <p>You must be logged in to add a skill.</p>
//       )}

//       {/* Table displaying user's skills */}
//       {skills.length > 0 && (
//         <div>
//           <h3>Your Skills</h3>
//           <table border="1">
//             <thead>
//               <tr>
//                 <th>Skill</th>
//                 <th>City</th>
//               </tr>
//             </thead>
//             <tbody>
//               {skills.map((skill) => (
//                 <tr key={skill._id}>
//                   <td>{skill.skill}</td>
//                   <td>{skill.city.name}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NewSkillPage;
