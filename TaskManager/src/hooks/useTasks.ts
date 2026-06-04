import { useState, useCallback, useContext } from "react";
import type { Task } from "../types/Task";
import { SnackContext } from "../providers/SnackProvider";
import { editTasks, getTasks } from "../services/tasksDataService";
function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { raiseSnack } = useContext(SnackContext) as any;

  const handleGetTasks = useCallback(() => {
    try {
      const savedTasks = getTasks();
      setTasks(savedTasks);
    } catch (e) {
      raiseSnack("error", "התרחשה שגיאה בייבוא הנתונים");
    }
  }, []);

  const handleAddNewTask = useCallback(
    (task: Task) => {
      if (!task.column) {
        raiseSnack("error", "יש לבחור עמודה למשימה");
        return;
      }

      const newTask: Task = {
        ...task,
        id: crypto.randomUUID(),
        likes: 0,
      };

      setTasks((prev) => {
        const newTasks = [...prev, newTask];
        editTasks(newTasks);
        return newTasks;
      });

      raiseSnack("success", "משימה חדשה התווספה בהצלחה");
    },
    [raiseSnack],
  );

  const moveTaskToColumn = useCallback((taskId: string, columnId: string) => {
    setTasks((prev) => {
      const task = prev.find((t) => t.id === taskId);
      if (!task || task.column === columnId) return prev;

      const newTasks = prev.map((t) =>
        t.id === taskId ? { ...t, column: columnId } : t,
      );
      editTasks(newTasks);
      return newTasks;
    });
  }, []);

  const handleEditTask = useCallback((task: Task) => {
    setTasks((prev) => {
      const newTasks = prev.map((t) => (t.id === task.id ? task : t));
      editTasks(newTasks);
      return newTasks;
    });
    raiseSnack("success", "משימה נערכה בהצלחה");
  }, []);

  const handleDeleteTask = useCallback((id: string) => {
    if (confirm("האם את/ה בטוח/ה שברצונך למחוק את המשימה?")) {
      setTasks((prev) => {
        const newTasks = prev.filter((t) => t.id !== id);
        editTasks(newTasks);
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
      editTasks(newTasks);
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
    moveTaskToColumn,
  };
}

export default useTasks;
