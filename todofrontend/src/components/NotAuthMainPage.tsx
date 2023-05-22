import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotAuthMainPage() {
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center gap-5">
      <div className="d-flex justify-content-center align-items-center w-100 py-3 py-3">
        <div>
          <Link to="/signin">
            <Button variant="light" size="lg">
              <div className="fs-1">Sign in</div>
            </Button>
          </Link>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div>
          <Link to="/signup">
            <Button variant="dark" as="button" size="lg">
              <div className="fs-4">Sign up</div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
