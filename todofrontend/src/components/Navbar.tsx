import {
  Navbar,
  Container,
  Nav,
  Button,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  isAuth,
  authUser,
  RootState,
} from "../redux/reduxState";
import { Link } from "react-router-dom";
import { SignOutFunction } from "../api/appApi";

export default function Navigation() {
  const dispatch = useDispatch();
  const signoutFunc = async () => {
    try {
      await SignOutFunction();
      dispatch(isAuth(false));
      dispatch(authUser(null));
    } catch (error) {
      console.error(error);
    }
  };

  const AuthView = () => {
    return (
      <Navbar
        collapseOnSelect
        fixed="top"
        expand="sm"
        bg="primary"
        variant="dark"
      >
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="About">
                About the app
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className="d-flex gap-2 justify-content-center align-items-center">
            <Navbar.Text>{`Signed in as: ${useSelector(
              (state: RootState) =>
                state.AuthenticatedUser?.username
            )}`}</Navbar.Text>
            <Button
              variant="light"
              onClick={signoutFunc}
              as="button"
            >
              Sign out
            </Button>
          </div>
        </Container>
      </Navbar>
    );
  };

  return (
    <>
      <AuthView />
    </>
  );
}
