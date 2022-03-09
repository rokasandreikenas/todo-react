import "./TaskList.scss";

import { getTasks, markDoneTask } from "../../api/API";
import { useMutation, useQuery } from "react-query";

import { Task } from "../../types";
import TaskCard from "./TaskCard";

const TaskList = () => {
  const { data, isLoading, refetch } = useQuery<Task[], Error>(
    "tasks",
    getTasks
  );

  const markAsDoneMutation = useMutation(markDoneTask, {
    onSuccess: () => {
      refetch();
    },
  });

  const handleMarkAsDone = async (task: Task) => {
    await markAsDoneMutation.mutateAsync(task);
  };

  if (isLoading) {
    <div>Loading...</div>;
  }

  return (
    <div id="tasks">
      <ul>
        {data &&
          data.map((task: Task) => (
            <TaskCard key={task.id} task={task} onDone={handleMarkAsDone} />
          ))}
      </ul>
    </div>
  );
};

export default TaskList;
