import Router from "./router/Router";
import Layout from "./layout/Layout";
import { BrowserRouter } from "react-router-dom";
import { ProjectThemeProvider } from "./providers/ProjectThemeProvider";
import { SnackProvider } from "./providers/SnackProvider";

function App() {
  return (
    <>
      <BrowserRouter>
        <ProjectThemeProvider>
          <SnackProvider>
            <Layout>
              <Router />
            </Layout>
          </SnackProvider>
        </ProjectThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
