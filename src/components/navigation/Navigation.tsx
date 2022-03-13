import "./Navigation.scss";

import { HOME, NEW_TASK } from "../../routes";

import { NavLink } from "react-router-dom";

const Navigation = () => {
  const pages = [
    {
      to: HOME,
      name: "List",
    },
    {
      to: NEW_TASK,
      name: "New Task",
    },
  ];

  return (
    <nav>
      {pages.map((page) => (
        <NavLink to={page.to} key={page.name} className="nav-link">
          {page.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
