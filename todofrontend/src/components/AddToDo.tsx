import TextInputField from "./InputField";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToDoInput } from "../models/ToDo";
import "../styles/utils.css";
import { useNavigate } from "react-router";
import * as ToDoApi from "../api/appApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToDos } from "../redux/reduxState";

const AddToDo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ToDoInput>();

  async function onSubmit(input: ToDoInput) {
    try {
      const response = await ToDoApi.createToDo(input);
      dispatch(ToDos(response));
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error);
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
                  <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-2 text-uppercase">
                      Add to do
                    </h2>
                    <div className="mb-3 mt-4">
                      <Form
                        id="addEditNoteForm"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <TextInputField
                          name="title"
                          label="Title"
                          type="text"
                          placeholder="Title"
                          register={register}
                          maxLength={100}
                          registerOptions={{
                            required: "Required",
                          }}
                          error={errors.title}
                        />
                        <TextInputField
                          name="text"
                          label="Text"
                          as="textarea"
                          maxLength={255}
                          rows={5}
                          placeholder="Text"
                          register={register}
                        />
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="width100"
                          variant="dark"
                        >
                          Add
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
};

export default AddToDo;
