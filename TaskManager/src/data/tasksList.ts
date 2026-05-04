import type { Task } from "../types/Task";

const tasks: Task[] = [
  {
    id: "1111111",
    title: "to do homework",
    description: "build a website",
    status: "completed",
    priority: "high",
    dueDate: new Date(2026, 1, 1),
  },
  {
    id: "222222",

    title: "go to gym",
    description: "xyz",
    status: "pending",
    priority: "low",
    dueDate: new Date(2026, 1, 10),
  },
  {
    id: "3333333",
    title: "making food",
    description: "cook pasta",
    status: "completed",
    priority: "high",
    dueDate: new Date(2026, 1, 20),
  },
];

export default tasks;
