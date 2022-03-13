import { markDoneTask } from "../api/API";
import { useMutation } from "react-query";

const useMarkDoneTask = (callback: () => void) => {
  return useMutation(markDoneTask, {
    onSuccess: () => {
      callback();
    },
  });
};

export default useMarkDoneTask;
