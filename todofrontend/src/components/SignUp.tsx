import React from "react";
import { SignUpFunction } from "../api/appApi";
import { useForm } from "react-hook-form";
import { SignUpBody } from "../models/User";
import TextInputField from "./InputField";
import { Button, Form, Modal } from "react-bootstrap";
import "../styles/utils.css";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpBody>();

  const [signupSuccessful, setSignupSuccessful] =
    React.useState<boolean>(false);

  async function onSubmit(credentials: SignUpBody) {
    try {
      await SignUpFunction(credentials);
      setSignupSuccessful(true);
    } catch (error) {
      console.error(error);
    }
  }

  const closeModal = () => {
    setSignupSuccessful(false);
  };

  return (
    <>
      <Modal show onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TextInputField
              name="username"
              label="Username"
              type="text"
              placeholder="Username"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.username}
            />

            <TextInputField
              name="email"
              label="Email"
              type="email"
              placeholder="Email"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.email}
            />

            <TextInputField
              name="password"
              label="Password"
              type="password"
              placeholder="Password"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.password}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="width100"
            >
              Sign Up
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
