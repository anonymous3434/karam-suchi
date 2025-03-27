import React, { useState } from "react";
import { Tasks } from "./Tasks";
import CircularProgress from "@mui/joy/CircularProgress";
import { alpha } from "@mui/material/styles";

export function Main({
  category,
  tasks,
  onAddTask,
  onDeleteTask,
  selectedStatus,
  selectedCategory,
  onUpdate,
  darkMode,
}) {
  const [newTask, setNewTask] = React.useState(""),
    [newCategory, setNewCategory] = React.useState(""),
    completedTasks = tasks.filter((task) => task.completed === true).length,
    [toggleDisplay, setToggleDisplay] = useState("1"),
    handleSubmit = (e) => {
      e.preventDefault();
      if (!newTask) return;
      const newTaskObj = {
        name: newTask,
        category: newCategory ? newCategory : "home",
        priority: "low",
        completed: false,
        id: crypto.randomUUID(),
      };
      onAddTask(newTaskObj);
      setNewCategory("");
      setNewTask("");
    };
  return (
    <main
      style={{
        flex: 1,
        background: darkMode
          ? "linear-gradient(135deg, #1a1a1a 0%, #333 100%)"
          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: darkMode ? "#fff" : "#000",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: darkMode
            ? alpha("#3C3D37", 0.5)
            : "rgba(255, 255, 255, 0.95)",
          color: darkMode ? "#fff" : "#333",
          borderRadius: "15px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: darkMode ? "#fff" : "#000",
            marginBottom: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
          }}
        >
          <span style={{ flexGrow: 1, textAlign: "center" }}>
            {selectedStatus === "All"
              ? "All Tasks"
              : selectedStatus === "Done"
              ? "Completed"
              : "TO-DO"}
          </span>
          <CircularProgress
            determinate
            value={(completedTasks / tasks.length) * 100}
            sx={{
              "--CircularProgress-size": "80px",
              "--CircularProgress-thickness": "8px",
            }}
            color={
              completedTasks === tasks.length
                ? "success"
                : completedTasks < tasks.length / 2
                ? "danger"
                : "primary"
            }
            onClick={() => setToggleDisplay((prev) => !prev)}
          >
            {toggleDisplay
              ? `${completedTasks} /${tasks.length}`
              : `${(completedTasks / tasks.length) * 100} %`}
          </CircularProgress>
        </h1>

        <form
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
          }}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              border: "2px solid #eee",
              borderRadius: "8px",
              fontSize: "16px",
              outline: "none",
              transition: "border-color 0.3s ease",
              backgroundColor: darkMode ? "#333" : "#fff",
              color: darkMode ? "#fff" : "#000",
            }}
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            style={{
              padding: "12px",
              border: "2px solid #eee",
              borderRadius: "8px",
              fontSize: "16px",
              outline: "none",
              backgroundColor: darkMode ? "#333" : "#fff",
              color: darkMode ? "#fff" : "#000",
              minWidth: "120px",
            }}
          >
            <option>Choose Category</option>
            {category.map((category) => (
              <option value={category.name} key={crypto.randomUUID()}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            style={{
              padding: "12px 24px",
              backgroundColor: darkMode ? "#444" : "#667eea",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "transform 0.5s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.2)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Add
          </button>
        </form>
        <Tasks
          tasks={tasks}
          onDeleteTask={onDeleteTask}
          selectedStatus={selectedStatus}
          selectedCategory={selectedCategory}
          onUpdate={onUpdate}
          darkMode={darkMode}
        />
      </div>
    </main>
  );
}
