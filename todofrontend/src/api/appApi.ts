import { SignUpBody, SignInBody, User } from "../models/User";
import { ToDoInput, ToDoBody } from "../models/ToDo";

const mainRoute = "backend-cmucbk199-qbuus.vercel.app";

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
  const response = await fetchData(
    `${mainRoute}/api/users/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(credentials),
    }
  );
  return response.json();
}

export async function SignOutFunction() {
  await fetchData(`${mainRoute}/api/users/signout`, {
    method: "POST",
  });
}

export async function SignInFunction(
  credentials: SignInBody
): Promise<User> {
  const response = await fetchData(
    `${mainRoute}/api/users/signin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(credentials),
    }
  );
  return response.json();
}

export async function fetchToDos(): Promise<ToDoBody[]> {
  const reponse = await fetchData(`${mainRoute}/api/todo`, {
    method: "GET",
  });
  return reponse.json();
}

export async function createToDo(
  toDo: ToDoInput
): Promise<ToDoBody> {
  const response = await fetchData(`${mainRoute}/api/todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toDo),
  });
  return response.json();
}

export async function updateNote(
  toDoId: string,
  toDo: ToDoInput
): Promise<ToDoBody> {
  const response = await fetchData(
    `${mainRoute}/api/todo/${toDoId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toDo),
    }
  );
  return response.json();
}

export async function deleteToDo(toDoId: string) {
  await fetchData(`${mainRoute}/api/todo/` + toDoId, {
    method: "DELETE",
  });
}
