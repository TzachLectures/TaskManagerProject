import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Divider,
  Stack,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Task } from "../types/Task";
import { getPriorityColor, getStatusColor } from "../utils/tasksHelpers";

export default function TaskPage() {
  const [task, setTask] = useState<Task | null>();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      try {
        const tasks = JSON.parse(localStorage.getItem("tasks") ?? "");
        const savedTask = tasks.find((t: Task) => t.id === id);
        savedTask.dueDate = new Date(savedTask.dueDate);
        setTask(savedTask);
      } catch (e) {
        console.log("tasks is not a valid json");
      }
    }
  }, [id]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 4,
        bgcolor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{ maxWidth: 500, width: "100%", borderRadius: 2, boxShadow: 2 }}
      >
        {task ? (
          <CardContent sx={{ p: 3 }}>
            {/* כותרת ותגים */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 2,
              }}
            >
              <Typography variant="h5" component="h1" color="text.primary">
                {task.title}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip
                  label={task.priority.toUpperCase()}
                  color={getPriorityColor(task.priority)}
                  size="small"
                  variant="outlined"
                />
                <Chip
                  label={task.status.toUpperCase()}
                  color={getStatusColor(task.status)}
                  size="small"
                />
              </Stack>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* תיאור */}
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {task.description}
            </Typography>

            {/* תאריך יעד */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "text.secondary",
              }}
            >
              <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">
                Due: {task.dueDate.toLocaleDateString("en-GB")}
              </Typography>
            </Box>
          </CardContent>
        ) : null}
      </Card>
    </Box>
  );
}
