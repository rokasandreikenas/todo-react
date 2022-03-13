import "./CreateTask.scss";

import * as yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";

import { HOME } from "../../routes";
import { Task } from "../../types";
import { useCreateTask } from "../../hooks";
import { useNavigate } from "react-router-dom";

interface FormValues {
  name: string;
  description: string;
}

const CreateTask = () => {
  const navigate = useNavigate();
  const navigateHome = () => navigate(HOME);

  const createTask = useCreateTask(navigateHome);

  const initialValues: FormValues = { name: "", description: "" };

  const validation = yup.object().shape({
    name: yup.string().required("Required").min(5, "Minimum 5 letters"),
    description: yup.string().required("Required").min(5, "Minimum 5 letters"),
  });

  const handleSubmit = async (
    values: FormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const { name, description } = values;

    const task: Omit<Task, "id"> = {
      title: name,
      description: description,
      done: false,
    };

    await createTask.mutateAsync(task);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={(values, { setSubmitting }) =>
        handleSubmit(values, setSubmitting)
      }
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit} className="form">
          <h2>Create new task</h2>
          <div className="field">
            <Field
              id="name"
              name="name"
              placeholder="Task name"
              className="input"
            />
            <ErrorMessage
              name="name"
              render={(msg) => <div className="error">{msg}</div>}
            />
          </div>
          <div className="field">
            <Field
              id="description"
              name="description"
              placeholder="Description"
              as="textarea"
              className="input"
            />
            <ErrorMessage
              name="description"
              render={(msg) => <div className="error">{msg}</div>}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
          >
            Create
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateTask;
