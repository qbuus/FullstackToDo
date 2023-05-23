import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdDone, MdMobileFriendly } from "react-icons/md";
import { BsPenFill } from "react-icons/bs";

export default function NotAuthMainPage() {
  return (
    <>
      <div className="d-flex flex-column gap-5">
        <div className="d-flex justify-content-between align-items-center py-1 mb-5">
          <div className="d-flex align-items-center gap-1">
            <div>
              <Link to="/signin">
                <Button variant="light" size="lg">
                  <div>Login</div>
                </Button>
              </Link>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div>
              <Link to="/signup">
                <Button
                  variant="dark"
                  as="button"
                  size="lg"
                >
                  <div>Sign up</div>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column align-items-center gap-5 justify-content-center">
          <div className="d-flex align-items-center justify-content-center w-100">
            <h1 className="text-center text-dark">
              Let's talk product
            </h1>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center gap-2 px-5">
            <h4 className="text-center text-secondary">
              Want to remember the notes you take ?
            </h4>
            <h5 className="text-center px-5 text-secondary">
              Some say that taking handwritten notes is a
              waste of time because they just pile up. This
              simple app lets you create notes, edit and
              remove them after completing.
            </h5>
          </div>
          <div className="mt-3">
            <Row xs={1} md={3} className="g-5">
              <Col>
                <div className="d-flex flex-column justify-content-between align-items-center h-100 p-4">
                  <BsPenFill color="blue" size={60} />
                  <h4 className="mt-5 text-center text-secondary">
                    Easy to use
                  </h4>
                </div>
              </Col>
              <Col>
                <div className="d-flex flex-column justify-content-between align-items-center h-100 p-4">
                  <MdDone color="green" size={60} />
                  <h4 className="mt-5 text-center text-secondary">
                    User authentication
                  </h4>
                </div>
              </Col>
              <Col>
                <div className="d-flex flex-column justify-content-between align-items-center h-100 p-4">
                  <MdMobileFriendly
                    color="red"
                    size={60}
                  />
                  <h4 className="mt-5 text-center text-secondary">
                    Mobile friendly
                  </h4>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

/* <Link to="/signin">
            <Button variant="light" size="lg">
              <div className="fs-1">Sign in</div>
            </Button>
          </Link>


<Link to="/signup">
            <Button variant="dark" as="button" size="lg">
              <div className="fs-4">Sign up</div>
            </Button>
          </Link> */
