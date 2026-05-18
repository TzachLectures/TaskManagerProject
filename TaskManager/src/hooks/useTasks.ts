import { useState, useCallback } from "react";
import type { Task } from "../types/Task";

function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleGetTasks = useCallback(() => {
    const savedTasks = localStorage.getItem("tasks");
    try {
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (e) {
      console.log("saved tasks are not valid Json");
    }
  }, []);

  const handleAddNewTask = useCallback((task: Task) => {
    setTasks((prev) => {
      const newTasks = [
        ...prev,
        { ...task, id: crypto.randomUUID(), likes: 0 },
      ];
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    });
  }, []);

  const handleEditTask = useCallback((task: Task) => {
    setTasks((prev) => {
      const newTasks = prev.map((t) => (t.id === task.id ? task : t));
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    });
  }, []);

  const handleDeleteTask = useCallback((id: string) => {
    if (confirm("האם את/ה בטוח/ה שברצונך למחוק את המשימה?")) {
      setTasks((prev) => {
        const newTasks = prev.filter((t) => t.id !== id);
        localStorage.setItem("tasks", JSON.stringify(newTasks));
        return newTasks;
      });
    }
  }, []);

  const updateLikes = useCallback((id: string, action: "inc" | "dec") => {
    setTasks((prev) => {
      const newTasks = prev.map((t) =>
        t.id === id
          ? { ...t, likes: action === "inc" ? t.likes + 1 : t.likes - 1 }
          : t,
      );
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    });
  }, []);

  return {
    tasks,
    handleAddNewTask,
    handleEditTask,
    handleDeleteTask,
    handleGetTasks,
    updateLikes,
  };
}

export default useTasks;
