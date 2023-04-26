import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import { Container } from "react-bootstrap";
import MainContent from "./pages/MainContent";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
