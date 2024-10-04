import React, { useState } from "react";

const NameInput = () => {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Enter your name"
        style={{ padding: "10px", fontSize: "16px" }}
      />
      <p style={{ fontSize: "18px", marginTop: "10px" }}>
        Length: {name.length}
      </p>
    </div>
  );
};

export default NameInput;
