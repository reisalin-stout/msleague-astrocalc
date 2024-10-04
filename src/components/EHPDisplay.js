import React from "react";

const EHPDisplay = ({ ehp }) => {
  return (
    <div>
      <label>
        eHP:
        <input readOnly value={ehp} />
      </label>
    </div>
  );
};

export default EHPDisplay;
