import { useState } from "react";

export default function Category({ isOpen, setIsOpen, setCategory }) {
  const [newCategory, setNewCategory] = useState("");
  const handleClose = () => {
      setIsOpen((prev) => !prev);
    },
    handleSubmit = (e) => {
      e.preventDefault();
      if (!newCategory) return;
      const newCategoryObj = { name: newCategory, count: 0 };
      setCategory((prev) => [...prev, newCategoryObj]);
      setIsOpen(false);
      setNewCategory("");
    };
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        backgroundColor: "#ffffff",
      }}
    >
      {isOpen && (
        <>
          (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(5px)",
              zIndex: 10,
              animation: "fadeIn 0.3s ease-out",
              "@keyframes fadeIn": {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            }}
            onClick={handleClose}
          />
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              padding: "2.5rem",
              borderRadius: "1.5rem",
              boxShadow:
                "0 15px 35px rgba(0, 0, 0, 0.2), 0 0 15px rgba(0, 255, 255, 0.1)",
              zIndex: 11,
              width: "90%",
              maxWidth: "400px",
              animation: "modalSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              "@keyframes modalSlideIn": {
                from: {
                  transform: "translate(-50%, -45%)",
                  opacity: 0,
                },
                to: {
                  transform: "translate(-50%, -50%)",
                  opacity: 1,
                },
              },
              backdropFilter: "blur(10px)",
            }}
          >
            <button
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                padding: "0.5rem",
                color: "#666",
                transition: "all 0.2s ease",
                transform: "scale(1)",
                ":hover": {
                  color: "#000",
                  transform: "scale(1.1) rotate(90deg)",
                },
              }}
            >
              ×
            </button>
            <h2
              style={{
                margin: "0 0 1.5rem 0",
                background: "linear-gradient(135deg, #000 0%, #333 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "2rem",
                fontWeight: "700",
                letterSpacing: "-0.5px",
              }}
            >
              Add Category
            </h2>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <label
                  htmlFor="name"
                  style={{
                    fontSize: "0.9rem",
                    color: "#666",
                  }}
                >
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="Exercise....."
                  id="name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  style={{
                    padding: "0.75rem",
                    borderRadius: "0.75rem",
                    border: "2px solid #eee",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                    outline: "none",
                    ":focus": {
                      borderColor: "#00ffff",
                      boxShadow: "0 0 0 3px rgba(0, 255, 255, 0.1)",
                    },
                    ":hover": {
                      borderColor: "#00ffff",
                    },
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: "0.85rem",
                  background:
                    "linear-gradient(135deg, #00ffff 0%, #00cccc 100%)",
                  color: "#000",
                  border: "none",
                  borderRadius: "0.75rem",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  marginTop: "1.5rem",
                  transition: "all 0.3s ease",
                  transform: "translateY(0)",
                  boxShadow: "0 4px 15px rgba(0, 255, 255, 0.2)",
                  ":hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(0, 255, 255, 0.3)",
                    background:
                      "linear-gradient(135deg, #00ffff 0%, #00e6e6 100%)",
                  },
                  ":active": {
                    transform: "translateY(1px)",
                  },
                }}
              >
                Submit
              </button>
            </form>
          </div>
          )
        </>
      )}
    </div>
  );
}
