import passwordValidator from "password-validator";

export function validatePassword(
  password: string
): string | undefined {
  const schema = new passwordValidator();
  schema
    .is()
    .min(6)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits()
    .has()
    .not()
    .spaces();

  const validationResult = schema.validate(password, {
    list: true,
  });
  if (Array.isArray(validationResult)) {
    return validationResult.join("\n");
  }

  return undefined;
}
