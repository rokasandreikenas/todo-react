import "./App.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HOME, NEW_TASK } from "./routes";
import { NewTask, Tasks } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME} element={<Tasks />} />
        <Route path={NEW_TASK} element={<NewTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
