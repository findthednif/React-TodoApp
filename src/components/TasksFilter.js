import React from "react";

export default class TasksFilter extends React.Component {
  render() {
    const { activeFilter, setFilter } = this.props;

    return (
      <ul className="filters">
        <li>
          <button
            className={activeFilter === "all" ? "selected" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={activeFilter === "active" ? "selected" : ""}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={activeFilter === "completed" ? "selected" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
