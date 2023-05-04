import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          <span className="text-dark">Page not found</span>
        </p>
        <p className="lead">
          The page you're looking for doesn't exist
        </p>
        <Link to="/" className="btn btn-dark fs-3 px-3 py-2">
          Home
        </Link>
      </div>
    </div>
  );
}
