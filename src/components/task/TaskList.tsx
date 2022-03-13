import "./TaskList.scss";

import { useMarkDoneTask, useTasks } from "../../hooks";

import { Task } from "../../types";
import TaskCard from "./TaskCard";

const TaskList = () => {
  const { data, isLoading, refetch } = useTasks();
  const markAsDone = useMarkDoneTask(refetch);

  const handleMarkAsDone = async (task: Task) => {
    await markAsDone.mutateAsync(task);
  };

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="tasks">
      <ul className="list">
        {data?.map((task: Task) => (
          <TaskCard key={task.id} task={task} onDone={handleMarkAsDone} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
