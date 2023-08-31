import React, { useState } from 'react'

import TasksFilter from './TasksFilter'
export default function Footer({ doneCount, activeFilter, setFilter, completedRemove }) {
  const [filters] = useState([
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ])
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
