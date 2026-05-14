import { useEffect, useState } from "react";
import { Box, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // וודא שהתקנת את חבילת האייקונים
import CloseIcon from "@mui/icons-material/Close";
import TaskCard from "../components/TaskCard";
import TaskFormDialog from "../components/TaskFormDialog";
import type { Task } from "../types/Task";

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    try {
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (e) {
      console.log("saved tasks are not valid Json");
    }
  }, []);

  const handleAddNewTask = (task: Task) => {
    const newTasks = [...tasks, { ...task, id: crypto.randomUUID() }];
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

  // פונקציה שהופכת את הסטייט (מ-true ל-false ולהפך)
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Box sx={{ p: 3, pb: 10 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Home page
      </Typography>

      {tasks.map((t) => (
        <TaskCard
          key={t.id}
          task={t}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
        />
      ))}

      {/* כפתור ה-FAB של MUI */}
      <Fab
        color={isOpen ? "secondary" : "primary"}
        aria-label="add"
        onClick={handleToggle}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        {isOpen ? <CloseIcon /> : <AddIcon />}
      </Fab>

      {/* תצוגה מותנית לפי הסטייט */}
      {isOpen && (
        <TaskFormDialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          handleSave={handleAddNewTask}
        />
      )}
    </Box>
  );
}

export default HomePage;
