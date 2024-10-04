import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tools, setTools] = useState([]);
  const [SelectedToolComponent, setSelectedToolComponent] = useState(null);
  const [isToolListVisible, setIsToolListVisible] = useState(true); // State to track visibility of tool list

  useEffect(() => {
    const fetchTools = async () => {
      const context = require.context("./tools", false, /\.js$/);
      const fileNames = context
        .keys()
        .map((file) => file.replace("./", "").replace(".js", ""));
      setTools(fileNames);
    };

    fetchTools();
  }, []);

  const handleToolClick = (tool) => {
    // Dynamically import the selected tool's component
    import(`./tools/${tool}.js`)
      .then((module) => {
        // Set the component to be rendered
        setSelectedToolComponent(() => module.default);
        setIsToolListVisible(false); // Hide the tool list when a tool is selected
      })
      .catch((error) => {
        console.error("Error loading tool:", error);
        setSelectedToolComponent(null);
      });
  };

  const handleTitleClick = () => {
    setIsToolListVisible((prev) => !prev); // Toggle visibility of the tool list
  };

  return (
    <div className="container">
      <h1
        className="title has-text-white"
        onClick={handleTitleClick}
        style={{ cursor: "pointer" }}
      >
        Toolbox
        <span className={`arrow ${isToolListVisible ? "" : "rotate"}`}>
          {isToolListVisible ? "▼" : "▲"}{" "}
          {/* Change the arrow based on visibility */}
        </span>
      </h1>
      <table
        className={`table ${
          isToolListVisible ? "visible" : "hidden"
        } has-background-dark`}
      >
        <tbody>
          {tools.map((tool) => (
            <tr key={tool}>
              <td className="cell">
                <span
                  onClick={() => handleToolClick(tool)}
                  style={{ cursor: "pointer", color: "white" }} // Changed to white for better visibility
                >
                  {tool.replace(/([A-Z])/g, " $1").trim()}{" "}
                  {/* Format the name for readability */}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="component-container">
        {SelectedToolComponent && <SelectedToolComponent />}{" "}
        {/* Keep the tool component rendered */}
      </div>
    </div>
  );
}

export default App;
