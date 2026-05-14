import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Task } from "../types/Task";
import ROUTES from "../router/routes";
import EditIcon from "@mui/icons-material/Edit";
import TaskFormDialog from "./TaskFormDialog";
import { useState } from "react";
interface TaskProps {
  task: Task;
  handleEditTask: (data: Task) => void;
}
function TaskCard({ task, handleEditTask }: TaskProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        minHeight: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: "background.paper",
      }}
      elevation={3}
    >
      <CardActionArea
        onClick={() => {
          navigate(ROUTES.TASK_PAGE + task.id);
        }}
      >
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            {task.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {task.description}
          </Typography>
        </CardContent>
        <Box sx={{ p: 2, pt: 0 }}>
          <Chip
            label={task.status}
            color={task.status === "completed" ? "success" : "warning"}
            variant="filled"
            sx={{ textTransform: "capitalize" }}
          />
        </Box>
      </CardActionArea>
      <CardActions>
        <IconButton onClick={() => setIsOpen(true)} aria-label="Edit task">
          <EditIcon />
        </IconButton>
      </CardActions>
      {isOpen && (
        <TaskFormDialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          initialValues={task}
          handleSave={handleEditTask}
        />
      )}
    </Card>
  );
}
export default TaskCard;
