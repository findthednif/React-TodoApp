import React from 'react'

import PropTypes from 'prop-types'

import TasksFilter from './TasksFilter'

export default class Footer extends React.Component {
  state = {
    filters: [
      { label: 'All', value: 'all' },
      { label: 'Active', value: 'active' },
      { label: 'Completed', value: 'completed' },
    ],
  }
  render() {
    const { doneCount, activeFilter, setFilter, completedRemove } = this.props
    const { filters } = this.state
    return (
      <footer className="footer">
        <span className="todo-count">{doneCount} items left</span>
        <TasksFilter activeFilter={activeFilter} setFilter={setFilter} filters={filters} />
        <button
          className="clear-completed"
          onClick={() => {
            completedRemove()
          }}
        >
          Clear completed
        </button>
      </footer>
    )
  }
  static propTypes = {
    doneCount: PropTypes.number,
    activeFilter: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
    completedRemove: PropTypes.func.isRequired,
  }
  static defaultProps = {
    doneCount: 0,
    activeFilter: 'all',
  }
}
