import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NoToDo() {
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center gap-4">
      <div>
        <Row>
          <Col>
            <div className="d-flex px-5 text-black px-5 py-3 fs-3">
              You dont have any to do's
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <Row>
          <Col>
            <Button variant="dark" as="button">
              <Link to="/add">
                <div className="d-flex px-3 text-white px-2 fs-3">
                  Add task
                </div>
              </Link>
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}
