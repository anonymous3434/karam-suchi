import React from "react";
import "./index.css";
import GradientText from "./GradientText";

export const Header = ({ darkMode, setDarkMode }) => {
  return (
    <header
      style={{
        padding: "0.5rem",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        backgroundColor: darkMode ? "#1f1f1f" : "#fff",
        color: darkMode ? "#e0e0e0" : "#333",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between", // Ensures space between header and button
          alignItems: "center",
          width: "100%", // Ensures the container takes full width
          padding: "0 10px", // Adds some padding to prevent overflow
          boxSizing: "border-box", // Ensures padding does not cause overflow
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "1.5rem",
            display: "flex",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <span>
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
              className="custom-class"
            >
              KARAM SUCHI
            </GradientText>
          </span>
        </h1>
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          style={{
            width: darkMode ? "60px" : "50px",
            height: darkMode ? "60px" : "50px",
            backgroundColor: darkMode ? "transparent" : "#ffd700",
            borderRadius: "50%",
            boxShadow: darkMode
              ? "inset -8px -8px 0 0 #fff"
              : "0 0 20px rgba(255, 215, 0, 0.8)",
            transition: "all 0.3s ease",
            animation: darkMode ? "none" : "pulse 3s infinite alternate",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
          }}
        >
          {/* Sun / Moon Inner Glow */}
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              boxShadow: darkMode ? "none" : "0 0 10px rgba(255, 215, 0, 0.8)",
              transition: "box-shadow 1 s ease",
              animation: darkMode ? "rotateMoon 0.5s ease" : "none",
            }}
          />
        </button>
      </div>
    </header>
  );
};
