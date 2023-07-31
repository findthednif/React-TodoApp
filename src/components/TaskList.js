import React from "react";
import Task from "./Task.js";
import PropTypes from "prop-types";
export default class TaskList extends React.Component {
  render() {
    const { todos, onDeleted, onCompleted } = this.props;
    const elements = todos.map((todo) => {
      const { id } = todo;
      return (
        <Task
          key={id}
          todo={todo}
          onDeleted={() => onDeleted(id)}
          onCompleted={() => onCompleted(id)}
        />
      );
    });
    return <ul className="todo-list">{elements}</ul>;
  }
  static propTypes ={
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleted: PropTypes.func.isRequired,
    onCompleted: PropTypes.func.isRequired
  }
  static defaultProps ={
    todos: []
  }
}
