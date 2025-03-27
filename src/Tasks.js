import React from "react";

export function Tasks({
  tasks,
  onDeleteTask,
  selectedStatus,
  selectedCategory,
  onUpdate,
  darkMode,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {tasks
        .filter((task) => {
          // if (selectedStatus === "All") return true; // Show all tasks
          if (selectedStatus === "Done") return task.completed; // Show only completed tasks
          if (selectedStatus === "Not Done")
            return (
              !task.completed &&
              (selectedCategory === null || selectedCategory === task.category)
            );
          // Show only uncompleted tasks
          if (selectedStatus === "All")
            return (
              true &&
              (selectedCategory === null || selectedCategory === task.category)
            );
          return false;
        })
        .map((task) => (
          <Task
            task={task}
            key={task.id}
            onDeleteTask={onDeleteTask}
            onUpdate={onUpdate}
            darkMode={darkMode}
          />
        ))}
    </div>
  );
}

function Task({ task, onDeleteTask, onUpdate, darkMode }) {
  const handleDeleteTask = (id) => {
    onDeleteTask(id);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "15px",
        backgroundColor: darkMode ? "#222" : "white",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        border: "1px solid white", // Keep main border white
        borderLeft: `4px solid ${
          task.priority === "high"
            ? "#ef4444"
            : task.priority === "low"
            ? "#22c55e"
            : "#f59e0b"
        }`, // Left border with priority color
        opacity: task.completed ? 0.7 : 1,
        transition: "all 0.3s ease",
        color: darkMode ? "#fff" : "#333",
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={(e) => onUpdate(task.id, { completed: e.target.checked })}
        // }}
        style={{
          width: "20px",
          height: "20px",
          marginRight: "15px",
        }}
      />
      <span
        style={{
          flex: 1,
          textDecoration: task.completed ? "line-through" : "none",
          color: task.completed
            ? darkMode
              ? "#aaa"
              : "#666"
            : darkMode
            ? "#fff"
            : "#333",
        }}
      >
        {task.name}
        <span
          style={{
            marginLeft: "10px",
            fontSize: "0.85em",
            padding: "2px 8px",
            borderRadius: "12px",
            backgroundColor: darkMode ? "#444" : "#e2e8f0",
            color: darkMode ? "#ddd" : "#64748b",
          }}
        >
          {task.category}
        </span>
      </span>
      <select
        value={task.priority}
        style={{
          padding: "5px",
          marginRight: "10px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          backgroundColor: darkMode ? "#333" : "#fff",
          color: darkMode ? "#fff" : "#000",
        }}
        onChange={(e) => onUpdate(task.id, { priority: e.target.value })}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        onClick={() => handleDeleteTask(task.id)}
        style={{
          padding: "6px 12px",
          backgroundColor: darkMode ? "#7f1d1d" : "#fee2e2",
          color: darkMode ? "#fff" : "#ef4444",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      >
        Delete
      </button>
    </div>
  );
}
