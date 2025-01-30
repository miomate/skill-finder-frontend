import { useContext, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";

const NewSkillPage = () => {
  const navigate = useNavigate();
  const { token } = useContext(SessionContext);

  const [skillName, setSkillName] = useState("");
  const [username, setUsername] = useState(""); // Changed from "user" to "username"
  const [city, setCity] = useState(""); // City input field
  const [error, setError] = useState(null); // Added state for error messages

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      // Check if the user exists (no changes here)
      const [userResponse] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/users?username=${username}`),
      ]);

      if (!userResponse.ok) throw new Error("User not found");

      const userData = await userResponse.json();

      // Send city data from the user input to the backend
      const cityCreateResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cities`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: city, // Use the city entered by the user
          }),
        }
      );

      if (!cityCreateResponse.ok) throw new Error("Failed to create city");

      const cityData = await cityCreateResponse.json();

      // Continue only if user and city are valid
      if (!userData?._id || !cityData?._id) {
        setError("Invalid user or city.");
        return;
      }

      // Create the skill and link to user and city
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
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h1>New Skill</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Skill Name
          <input
            type="text"
            required
            value={skillName}
            onChange={(event) => setSkillName(event.target.value)}
          />
        </label>
        <label>
          Username
          <input
            type="text"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          City
          <input
            type="text"
            required
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </label>
        <button type="submit">Add Skill</button>
      </form>
    </>
  );
};

export default NewSkillPage;

// import { useContext, useState } from "react";
// import { SessionContext } from "../contexts/SessionContext";
// import { useNavigate } from "react-router-dom";

// const NewSkillPage = () => {
//   const navigate = useNavigate();
//   const { token } = useContext(SessionContext);

//   const [skillName, setSkillName] = useState("");
//   const [username, setUsername] = useState(""); // Changed from "user" to "username"
//   const [city, setCity] = useState("");
//   const [error, setError] = useState(null); // Added state for error messages

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError(null);

//     try {
//       const [userResponse] = await Promise.all([
//         fetch(`${import.meta.env.VITE_API_URL}/api/users?username=${username}`),
//       ]);

//       if (!userResponse.ok) throw new Error("User not found");

//       const userData = await userResponse.json();

//       // Hardcode city creation here
//       const cityCreateResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/cities`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ name: "Berlin" }), // Hardcoded city name
//       });

//       if (!cityCreateResponse.ok) throw new Error("Failed to create city");

//       const cityData = await cityCreateResponse.json();

//       if (!userData?._id || !cityData?._id) {
//         setError("Invalid user or city.");
//         return;
//       }

//       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/skills`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           skill: skillName,
//           user: userData._id,
//           city: cityData._id,
//         }),
//       });

//       if (response.ok) {
//         navigate("/skills");
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || "Failed to add skill.");
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <>
//       <h1>New Skill</h1>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <label>
//           Skill Name
//           <input
//             type="text"
//             required
//             value={skillName}
//             onChange={(event) => setSkillName(event.target.value)}
//           />
//         </label>
//         <label>
//           Username
//           <input
//             type="text"
//             required
//             value={username}
//             onChange={(event) => setUsername(event.target.value)}
//           />
//         </label>
//         <label>
//           City
//           <input
//             type="text"
//             required
//             value={city}
//             onChange={(event) => setCity(event.target.value)}
//           />
//         </label>
//         <button type="submit">Add Skill</button>
//       </form>
//     </>
//   );
// };

// export default NewSkillPage;
