import React from 'react'
import PropTypes from 'prop-types'

import Task from './Task.js'
export default class TaskList extends React.Component {
  render() {
    const { todos, onEdited, onDeleted, onCompleted } = this.props
    const elements = todos.map((todo) => {
      const { id } = todo
      return (
        <Task
          key={id}
          todo={todo}
          onEdited={(text) => onEdited(id, text)}
          onDeleted={() => onDeleted(id)}
          onCompleted={() => onCompleted(id)}
        />
      )
    })
    return <ul className="todo-list">{elements}</ul>
  }
}
TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
}
TaskList.defaultProps = {
  todos: [],
}
