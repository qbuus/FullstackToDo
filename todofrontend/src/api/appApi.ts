import { SignUpBody, SignInBody, User } from "../models/User";

async function fetchData(
  input: RequestInfo,
  init?: RequestInit
) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    if (response.status === 409) {
      throw new Error(errorMessage);
    } else if (response.status === 401) {
      throw new Error(errorMessage);
    } else {
      throw new Error(
        `Request failed with status: ${response.status} and message: ${errorMessage}`
      );
    }
  }
}

export async function SignUpFunction(
  credentials: SignUpBody
): Promise<User> {
  const response = await fetchData("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}
