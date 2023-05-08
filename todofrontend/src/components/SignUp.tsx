import { useState } from "react";
import { SignUpFunction } from "../api/appApi";
import { useForm } from "react-hook-form";
import { SignUpBody } from "../models/User";
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
import { useNavigate } from "react-router";
import { ConflictError } from "../errors/http_errors";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpBody>();

  const [error, setError] = useState<string | null>(null);

  async function onSubmit(credentials: SignUpBody) {
    try {
      await SignUpFunction(credentials);
      toast.success("you can now sign in");
      navigate("/");
    } catch (error) {
      if (error instanceof ConflictError) {
        setError(error.message);
      } else {
        alert(error);
        console.error(error);
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
                      Sign up
                    </h2>
                    <div className="mb-5 mt-3">
                      <p>Please enter your data!</p>
                      <div>
                        <p className="fw-bold">
                          Your account will be automatically
                          deleted after 1 hour
                        </p>
                      </div>
                    </div>

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
                          name="email"
                          label="Email"
                          type="email"
                          placeholder="Email"
                          register={register}
                          registerOptions={{
                            required: "Required",
                          }}
                          error={errors.email}
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
                          Sign Up
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
