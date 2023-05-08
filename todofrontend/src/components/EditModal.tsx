import { ToDoBody } from "../models/ToDo";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as ToDoApi from "../api/appApi";
import TextInputField from "./InputField";
import { useDispatch } from "react-redux";
import { ToDos } from "../redux/reduxState";

type EditToDo = {
  data: ToDoBody;
  close: () => void;
};

export default function EditModal({ data, close }: EditToDo) {
  const dispatch = useDispatch();
  console.log(data);
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
      await ToDoApi.updateNote(data._id, input);
      close();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={close} backdrop keyboard={true}>
      <Modal.Header closeButton>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            registerOptions={{ required: "Required" }}
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="button"
          disabled={isSubmitting}
          variant="light"
          onClick={close}
        >
          Close
        </Button>
        <Button
          type="submit"
          form="addEditNoteForm"
          disabled={isSubmitting}
          variant="dark"
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
