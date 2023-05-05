import { useState } from "react";
import { SignInFunction } from "../api/appApi";
import { useForm } from "react-hook-form";
import { SignInBody } from "../models/User";
import TextInputField from "./InputField";
import {
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
  Alert,
} from "react-bootstrap";
import "../styles/utils.css";
import { useDispatch } from "react-redux";
import { isAuth, authUser } from "../redux/reduxState";
import { useNavigate } from "react-router";
import { UnauthorizedError } from "../errors/http_errors";
import { Link } from "react-router-dom";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInBody>();

  const [error, setError] = useState<string | null>(null);

  async function onSubmit(credentials: SignInBody) {
    try {
      await SignInFunction(credentials);
      dispatch(isAuth(true));
      dispatch(authUser(credentials));
      navigate("/");
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setError(error.message);
      } else {
        alert(error);
        console.log(error);
      }
      console.error(error);
    }
  }

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="d-flex align-items-center justify-content-center mb-4">
              <Link to="/">
                <Button
                  variant="dark"
                  as="button"
                  className="px-4 py-2 fs-4"
                >
                  Home
                </Button>
              </Link>
            </div>
            <div>
              <Card className="shadow">
                <Card.Body>
                  {error && (
                    <Alert variant="danger">{error}</Alert>
                  )}
                  <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-2 text-uppercase">
                      Sign in
                    </h2>
                    <p className="mb-5">
                      Please enter your username and password
                    </p>
                    <div className="mb-3">
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <TextInputField
                          name="username"
                          label="Username"
                          type="text"
                          placeholder="Username"
                          register={register}
                          registerOptions={{
                            required: "Required",
                          }}
                          error={errors.username}
                        />
                        <TextInputField
                          name="password"
                          label="Password"
                          type="password"
                          placeholder="Password"
                          register={register}
                          registerOptions={{
                            required: "Required",
                          }}
                          error={errors.password}
                        />
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="width100"
                          variant="dark"
                        >
                          Sign In
                        </Button>
                      </Form>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
