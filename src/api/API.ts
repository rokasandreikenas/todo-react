import { Task } from "../types";

const api = "http://localhost:8080/";
const json = "application/json";

enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
}

export const createTask = (task: Omit<Task, "id">) => {
  return fetch(api, {
    method: Method.POST,
    headers: {
      "Content-Type": json,
    },
    body: JSON.stringify(task),
  });
};

export const getTasks = () => {
  return fetch(api).then((response: any) => response.json());
};

export const markDoneTask = (task: Task) => {
  return fetch(api + task.id, {
    method: Method.PUT,
    headers: {
      "Content-Type": json,
    },
    body: JSON.stringify({ ...task, done: true }),
  });
};
