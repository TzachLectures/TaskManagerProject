import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import ROUTES from "./routes";
import TaskPage from "../pages/TaskPage";

function Router() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.CONTACT} element={<ContactPage />} />
      <Route path={"/task/:id"} element={<TaskPage />} />
    </Routes>
  );
}

export default Router;
