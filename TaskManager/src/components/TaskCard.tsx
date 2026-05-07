import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Task } from "../types/Task";
import ROUTES from "../router/routes";

interface TaskProps {
  task: Task;
}
function TaskCard({ task }: TaskProps) {
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
    </Card>
  );
}
export default TaskCard;
