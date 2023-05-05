import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import { Container } from "react-bootstrap";
import MainContent from "./pages/MainContent";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import Navigation from "./components/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "./redux/reduxState";
import SignIn from "./components/SignIn";
import AddToDo from "./components/AddToDo";

function App() {
  const isUserAuthorized = useSelector(
    (state: RootState) => state.isUserAuthenticated
  );

  return (
    <>
      <BrowserRouter>
        {isUserAuthorized ? <Navigation /> : ""}
        <Container>
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/*" element={<NotFoundPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/add" element={<AddToDo />} />
          </Routes>
        </Container>
        {isUserAuthorized ? <Footer /> : ""}
      </BrowserRouter>
    </>
  );
}

export default App;
