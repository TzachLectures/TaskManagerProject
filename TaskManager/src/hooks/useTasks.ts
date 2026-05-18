import { useState } from "react";
import type { Task } from "../types/Task";

function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleGetTasks = () => {
    const savedTasks = localStorage.getItem("tasks");
    try {
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (e) {
      console.log("saved tasks are not valid Json");
    }
  };

  const handleAddNewTask = (task: Task) => {
    const newTasks = [...tasks, { ...task, id: crypto.randomUUID(), likes: 0 }];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleEditTask = (task: Task) => {
    const newTasks = tasks.map((t) => (t.id === task.id ? task : t));
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleDeleteTask = (id: string) => {
    if (confirm("האם את/ה בטוח/ה שברצונך למחוק את המשימה?")) {
      const newTasks = tasks.filter((t) => t.id !== id);
      setTasks(newTasks);
      localStorage.setItem("tasks", JSON.stringify(newTasks));
    }
  };

  const updateLikes = (id: string, newLikesCount: number) => {
    const task = tasks.find((t) => t.id === id);
    const newTask = {
      ...task,
      likes: newLikesCount,
    };
    handleEditTask(newTask);
  };

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
