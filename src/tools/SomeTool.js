import React, { useState } from "react";
import AstromonDropdown from "../components/AstromonDropdown"; // Adjust the import path if necessary

const AstroTool = () => {
  const [selectedAstromon, setSelectedAstromon] = useState(null);

  const handleAstromonSelect = (astromon) => {
    setSelectedAstromon(astromon);
    console.log("Selected Astromon:", astromon); // You can do more with the selected astromon here
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Astromon Selection Tool</h2>
      <AstromonDropdown onSelect={handleAstromonSelect} />
      {selectedAstromon && (
        <div>
          <h3>You selected: {selectedAstromon.name}</h3>
          {/* Add more information about the selected Astromon as needed */}
        </div>
      )}
    </div>
  );
};

export default AstroTool;
