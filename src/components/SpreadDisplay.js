import React from "react";

const SpreadDisplay = ({ result }) => {
  return (
    <div>
      <label>
        Spread:
        <input readOnly value={result} />
      </label>
    </div>
  );
};

export default SpreadDisplay;
