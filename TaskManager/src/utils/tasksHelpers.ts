import type { Task } from "../types/Task";

// פונקציות עזר לקביעת צבעים לפי סטטוס ועדיפות
export const getStatusColor = (status: Task["status"]) => {
  switch (status) {
    case "completed":
      return "success";
    case "in-progress":
      return "warning";
    default:
      return "default";
  }
};

export const getPriorityColor = (priority: Task["priority"]) => {
  switch (priority) {
    case "high":
      return "error";
    case "medium":
      return "warning";
    case "low":
      return "info";

    default:
      return "default";
  }
};
