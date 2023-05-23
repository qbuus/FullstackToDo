import { ToDoBody } from "../models/ToDo";
import {
  Button,
  Card,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as ToDoApi from "../api/appApi";
import TextInputField from "./InputField";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reduxState";
import { ToDos } from "../redux/reduxState";
import { Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function EditModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector(
    (state: RootState) => state.EditSingleToDo
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ToDoBody>({
    defaultValues: {
      title: data?.title || "",
      text: data?.text || "",
    },
  });

  async function onSubmit(input: ToDoBody) {
    try {
      if (data === null) {
        return;
      } else {
        const response = await ToDoApi.updateNote(
          data._id,
          input
        );
        dispatch(ToDos(response));
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div>
              <div className="d-flex justify-content-center align-items-center mb-4">
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
                          Edit
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
