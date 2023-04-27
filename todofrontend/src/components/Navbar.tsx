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

  return (
    <>
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
              <Navbar.Text>{`Signed in as: ${useSelector(
                (state: RootState) =>
                  state.AuthenticatedUser?.username
              )}`}</Navbar.Text>
              <Button onClick={signoutFunc}>Sign out</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
