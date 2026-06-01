import Router from "./router/Router";
import Layout from "./layout/Layout";
import { BrowserRouter } from "react-router-dom";
import { ProjectThemeProvider } from "./providers/ProjectThemeProvider";
function App() {
  return (
    <>
      <BrowserRouter>
        <ProjectThemeProvider>
          <Layout>
            <Router />
          </Layout>
        </ProjectThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
