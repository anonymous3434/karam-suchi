import React from "react";

export const Footer = ({ darkMode }) => {
  return (
    <footer
      style={{
        backgroundColor: darkMode ? "#1f1f1f" : "white",
        color: darkMode ? "white" : "black",
        padding: "1.5rem",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>© 2024 Task Manager. All rights reserved.</div>
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
          }}
        >
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            style={{
              color: darkMode ? "white" : "black",
              textDecoration: "none",
            }}
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            style={{
              color: darkMode ? "white" : "black",
              textDecoration: "none",
            }}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            style={{
              color: darkMode ? "white" : "black",
              textDecoration: "none",
            }}
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};
