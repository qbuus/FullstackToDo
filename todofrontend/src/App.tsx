import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import { Container } from "react-bootstrap";
import MainContent from "./pages/MainContent";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
