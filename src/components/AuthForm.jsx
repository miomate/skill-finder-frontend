import React, { useState } from "react";
const AuthForm = ({submitCallback}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const handleSubmit = (event) => {
    event.preventDefault();
submitCallback({ username, password });
}
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username
        <input
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          type="text"
        />
      </label>
      <label>
        Password
        <input
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
        />
      </label>
      <button type="submit">Signup</button>
    </form>
  );
};

export default AuthForm;
