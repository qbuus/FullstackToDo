import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotAuthMainPage() {
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center gap-5">
      <div>
        <Row>
          <Col>
            <Button variant="light" as="button">
              <Link to="/signup">
                <div className="d-flex px-5 text-black px-5 py-3 fs-2">
                  Sign up
                </div>
              </Link>
            </Button>
          </Col>
        </Row>
      </div>
      <div>
        <Button variant="dark" as="button">
          <Link to="/signin">
            <div className="d-flex px-3 text-white px-2">
              Already have an account
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
}
