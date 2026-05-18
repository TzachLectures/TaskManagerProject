import { useEffect, useState } from "react";
import { Box, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // וודא שהתקנת את חבילת האייקונים
import CloseIcon from "@mui/icons-material/Close";
import TaskCard from "../components/TaskCard";
import TaskFormDialog from "../components/TaskFormDialog";
import useTasks from "../hooks/useTasks";

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    tasks,
    handleAddNewTask,
    handleEditTask,
    handleDeleteTask,
    handleGetTasks,
    updateLikes,
  } = useTasks();

  useEffect(() => {
    handleGetTasks();
  }, []);
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
          updateLikes={updateLikes}
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
