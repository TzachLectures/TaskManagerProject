import TaskCard from "../components/TaskCard";
import tasks from "../data/tasksList";

function HomePage() {
  return (
    <div>
      <h1>Home page</h1>
      {tasks.map((t) => (
        <TaskCard key={t.id} task={t} />
      ))}
    </div>
  );
}

export default HomePage;
