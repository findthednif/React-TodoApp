import React from "react";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
export default class Task extends React.Component {
  state = {
    value: "",
    editing: false,
  };
  printingNewTask = (e) =>{
    this.setState({
      value: e.target.value
    })
  }
  editingTask = () => {
    this.setState({
      editing: true
    });
  };
  submitingTask = (e) => {
    e.preventDefault()
    this.props.onEdited(this.state.value)
    this.setState({
      value: "",
      editing: false
    })

  };

  render() {
    const { todo, onDeleted, onCompleted } = this.props;
    const { textContent, completed, date } = todo;
    let editTaskForm = null;
    if (this.state.editing) {
      editTaskForm = (
        <form onSubmit={this.submitingTask}>
          <input type="text" className="new-todo"
          defaultValue={textContent}
          onChange={this.printingNewTask}
          autoFocus></input>
        </form>
      );
    }
    let taskCreateTime = formatDistanceToNow(date, {
      includeSeconds: true,
      addSuffix: true,
    });
    let className = "task";
    if (completed) {
      className += " completed";
    }
    if (this.state.editing) {
      className += " editing";
    }
    return (
      <li className={className}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            defaultChecked={completed}
            onClick={onCompleted}
          />
          <label>
            <span className="description">{textContent}</span>
            <span className="created">{`created ${taskCreateTime}`}</span>
          </label>
          <button
            className="icon icon-edit"
            onClick={this.editingTask}
          ></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {editTaskForm}
      </li>
    );
  }
  static propTypes = {
    todo: PropTypes.object.isRequired,
    onDeleted: PropTypes.func,
    onCompleted: PropTypes.func,
  };
  static defaultProps = {
    onCompleted: () => {},
    onDeleted: () => {},
  };
}
