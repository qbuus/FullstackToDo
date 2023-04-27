import { Form } from "react-bootstrap";
import {
  FieldError,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface TextInputFieldProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  error?: FieldError;
  [x: string]: any;
}

export default function TextInputField({
  name,
  label,
  register,
  registerOptions,
  error,
  ...props
}: TextInputFieldProps) {
  return (
    <Form.Group className="mb-2" controlId={name + "input"}>
      <Form.Label className="text-center">{label}</Form.Label>
      <Form.Control
        {...props}
        {...register(name, registerOptions)}
        isInvalid={!!error}
      />
      <Form.Control.Feedback type="invalid">
        {error?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
}