import { Task } from "../types";
import { getTasks } from "../api/API";
import { useQuery } from "react-query";

const useTasks = () => {
  return useQuery<Task[], Error>("tasks", getTasks);
};

export default useTasks;
