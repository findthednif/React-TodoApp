import React from "react";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
export default class Task extends React.Component {
  
  render() {
    const {todo, onDeleted, onCompleted } = this.props;
    const { textContent, completed, edited, date } = todo;
    let taskCreateTime = formatDistanceToNow(date, {
      includeSeconds: true,
      addSuffix: true,
    });
    let className = "task";
    if (completed) {
      className += " completed";
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
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        
      </li>
    );
  }
  static propTypes ={
    todo: PropTypes.object.isRequired,
    onDeleted: PropTypes.func,
    onCompleted: PropTypes.func
  }
  static defaultProps = {
    todo: {},
    onCompleted: () => {},
    onDeleted: () => {}
  }
}
