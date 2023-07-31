import React from "react";
import TasksFilter from './TasksFilter';
import PropTypes from "prop-types";
export default class Footer extends React.Component {
  render() {
    const { doneCount, activeFilter, setFilter, completedRemove} = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{doneCount} items left</span>
        <TasksFilter activeFilter={activeFilter} setFilter={setFilter} />
        <button className="clear-completed"
        onClick={()=>{completedRemove()}}>Clear completed</button>
      </footer>
    );
  }
  static propTypes ={
    doneCount: PropTypes.number,
    activeFilter: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
    completedRemove: PropTypes.func.isRequired
  }
  static defaultProps = {
    doneCount: 0,
    activeFilter: 'all',
  }
}
