import React from "react";
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
} from "react-bootstrap";
import "../styles/utils.css";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpBody>();

  async function onSubmit(credentials: SignUpBody) {
    try {
      await SignUpFunction(credentials);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div>
              <Card className="shadow">
                <Card.Body>
                  <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-2 text-uppercase">
                      Sign in
                    </h2>
                    <p className="mb-5">
                      Please enter your data!
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
                          variant="primary"
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
