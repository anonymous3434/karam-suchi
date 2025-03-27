import React, { useState, useEffect } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import SideNav from "./SideNav";
import { Main } from "./Main";
import Category from "./Category";
const initialCategory = [
  { name: "study", count: 0 },
  { name: "work", count: 0 },
  { name: "home", count: 0 },
];
const tasks = [
  {
    name: "Learn React",
    completed: false,
    priority: "high",
    category: "study",
    id: "1",
  },
  {
    name: "Standup",
    completed: false,
    priority: "low",
    category: "work",
    id: "2",
  },
  {
    name: "Grocery",
    completed: true,
    priority: "medium",
    category: "home",
    id: "3",
  },
  {
    name: "TV",
    completed: false,
    priority: "low",
    category: "home",
    id: "4",
  },
];
export default function App() {
  const [category, setCategory] = useState(initialCategory),
    [initialTasks, setInitialTasks] = useState(tasks),
    [selectedStatus, setSelectedStatus] = useState("All"),
    [selectedCategory, setSelectedCategory] = useState(null),
    [isOpen, setIsOpen] = useState(false),
    [darkMode, setDarkMode] = useState(() => {
      const savedTheme = localStorage.getItem("darkMode");
      return savedTheme !== null ? JSON.parse(savedTheme) : false; // Default to false
    }),
    handleAddTasks = (task) => {
      setInitialTasks((tasks) => [...tasks, task]);
    },
    handleDeleteTask = (id) => {
      setInitialTasks((tasks) => tasks.filter((task) => task.id !== id));
    },
    handleSelectStatus = (status) => {
      if (status === "All") setSelectedCategory(null);
      setSelectedStatus(status);
    },
    handleSelectCategory = (category) => {
      // setSelectedStatus(null);
      setSelectedCategory(category);
    },
    handleUpdate = (id, updateData) => {
      setInitialTasks(
        initialTasks.map((tasks) =>
          tasks.id === id ? { ...tasks, ...updateData } : tasks
        )
      );
    };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", darkMode);
    }
    console.log(localStorage.darkMode);
  }, [darkMode]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 100,
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      <div style={{ display: "flex", flex: 1 }}>
        <SideNav
          category={category}
          selectedStatus={selectedStatus}
          setSelectedStatus={handleSelectStatus}
          selectedCategory={selectedCategory}
          setSelectedCategory={handleSelectCategory}
          setIsOpen={setIsOpen}
          tasks={initialTasks}
          darkMode={darkMode}
        />
        <Main
          category={category}
          tasks={initialTasks}
          onAddTask={handleAddTasks}
          onDeleteTask={handleDeleteTask}
          selectedStatus={selectedStatus}
          selectedCategory={selectedCategory}
          onUpdate={handleUpdate}
          darkMode={darkMode}
        />
      </div>
      <Category
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setCategory={setCategory}
      />
      <Footer darkMode={darkMode} />
    </div>
  );
}
