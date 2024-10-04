import React, { useState, useEffect } from "react";

const AstromonDropdown = ({ onSelect }) => {
  const [astromons, setAstromons] = useState([]);
  const [filteredAstromons, setFilteredAstromons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeElements, setActiveElements] = useState({
    fire: false,
    water: false,
    wood: false,
    light: false,
    dark: false,
  });

  useEffect(() => {
    // Fetch the astromon data from the JSON file
    const fetchAstromons = async () => {
      try {
        const response = await fetch("data/astromon-db-reduced.json"); // Ensure correct path here
        const data = await response.json();
        setAstromons(data);
        setFilteredAstromons(data);
      } catch (error) {
        console.error("Error loading astromon data:", error);
      }
    };

    fetchAstromons();
  }, []);

  // Toggle element filtering
  const toggleElement = (element) => {
    setActiveElements((prev) => ({
      ...prev,
      [element]: !prev[element],
    }));
  };

  // Filter astromons based on the search query and active elements
  useEffect(() => {
    const filtered = astromons.filter((astromon) => {
      const matchesSearch =
        astromon.family_slug
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        astromon.name.toLowerCase().includes(searchQuery.toLowerCase());

      const activeElementKeys = Object.keys(activeElements).filter(
        (el) => activeElements[el]
      );
      const matchesElement =
        activeElementKeys.length === 0 ||
        activeElementKeys.includes(astromon.element);

      return (
        matchesSearch &&
        matchesElement &&
        (astromon.evolution === 3 || astromon.evolution === 4)
      );
    });

    setFilteredAstromons(filtered.slice(0, 20)); // Limit to first 20 results
  }, [searchQuery, activeElements, astromons]);

  return (
    <div>
      {/* Search box */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by family slug or name"
      />

      {/* Element toggle buttons */}
      <div>
        {["fire", "water", "wood", "light", "dark"].map((element) => (
          <button
            key={element}
            onClick={() => toggleElement(element)}
            style={{
              backgroundColor: activeElements[element] ? "lightblue" : "white",
            }}
          >
            {element}
          </button>
        ))}
      </div>

      {/* Filtered astromon results */}
      <div className="astromon-list">
        {filteredAstromons.map((astromon) => (
          <div
            key={astromon.uid}
            className="astromon-item"
            onClick={() => onSelect(astromon)} // Pass the selected astromon back to the parent
            style={{
              cursor: "pointer",
              padding: "10px",
              border: "1px solid black",
              margin: "5px",
            }}
          >
            <img
              src={`icons/${astromon.icon_name}`} // Path to the icons folder
              alt={astromon.icon_name} // Alternative text for the image
              style={{ width: "50px", height: "50px" }} // Adjust size as needed
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AstromonDropdown;
