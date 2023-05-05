import { ToDoBody } from "../models/ToDo";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as ToDoApi from "../api/appApi";
import TextInputField from "./InputField";

type EditToDo = {
  data: ToDoBody;
  close: () => void;
};

export default function EditModal({ data, close }: EditToDo) {
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

  async function onEdit(input: ToDoBody) {
    try {
      await ToDoApi.updateNote(data._id, input);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal
      show
      onHide={close}
      backdrop="static"
      keyboard={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          id="addEditNoteForm"
          onSubmit={handleSubmit(onEdit)}
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
          type="submit"
          form="addEditNoteForm"
          disabled={isSubmitting}
          variant="dark"
          onClick={close}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
