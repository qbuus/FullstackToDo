import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import { Container } from "react-bootstrap";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
        <div>Start</div>;
      </Container>
    </BrowserRouter>
  );
}

export default App;
