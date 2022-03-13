import { createTask } from "../api/API";
import { useMutation } from "react-query";

const useCreateTask = (callback: () => void) => {
  return useMutation(createTask, {
    onSuccess: () => {
      callback();
    },
  });
};

export default useCreateTask;
