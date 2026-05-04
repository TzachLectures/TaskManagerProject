import Router from "./router/Router";
import Layout from "./layout/Layout";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
