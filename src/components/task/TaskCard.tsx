import "./TaskCard.scss";

import { Task } from "../../types";

type Props = {
  task: Task;
  onDone: (task: Task) => void;
};

const TaskCard = (props: Props) => {
  const { task, onDone } = props;

  return (
    <li className="item">
      <div className="heading">
        <span className={task.done ? "done" : ""}>
          <strong>{task.title}</strong>
        </span>
        <span
          onClick={() => onDone(task)}
          className={`status ${task.done ? "active" : ""}`}
        />
      </div>
      <div className={`description ${task.done ? "done" : ""}`}>
        {task.description}
      </div>
    </li>
  );
};

export default TaskCard;
