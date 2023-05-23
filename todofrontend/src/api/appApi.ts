import { SignUpBody, SignInBody, User } from "../models/User";
import { ToDoInput, ToDoBody } from "../models/ToDo";

const baseUrl = "https://fulldoapi.onrender.com";

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
    `${baseUrl}/api/users/signup`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(credentials),
    }
  );
  return response.json();
}

export async function SignOutFunction() {
  await fetchData(`${baseUrl}/api/users/signout`, {
    method: "POST",
    credentials: "include",
  });
}

export async function SignInFunction(
  credentials: SignInBody
): Promise<User> {
  const response = await fetchData(
    `${baseUrl}/api/users/signin`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(credentials),
    }
  );
  return response.json();
}

export async function fetchToDos(): Promise<ToDoBody[]> {
  const reponse = await fetchData(`${baseUrl}/api/todo`, {
    method: "GET",
    credentials: "include",
  });
  return reponse.json();
}

export async function createToDo(
  toDo: ToDoInput
): Promise<ToDoBody> {
  const response = await fetchData(`${baseUrl}/api/todo`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toDo),
  });
  return response.json();
}

export async function updateNote(
  todoId: string,
  toDo: ToDoInput
): Promise<ToDoBody> {
  const response = await fetchData(
    `${baseUrl}/api/todo/` + todoId,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toDo),
    }
  );
  return response.json();
}

export async function deleteToDo(todoId: string) {
  await fetchData(`${baseUrl}api/todo/` + todoId, {
    method: "DELETE",
    credentials: "include",
  });
}
