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
} from "react-bootstrap";
import "../styles/utils.css";
import { useDispatch } from "react-redux";
import { isAuth, authUser } from "../redux/reduxState";

export default function SignIn() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInBody>();

  async function onSubmit(credentials: SignInBody) {
    try {
      await SignInFunction(credentials);
      dispatch(isAuth(true));
      dispatch(authUser(credentials));
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
                          variant="primary"
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
