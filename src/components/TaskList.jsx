import React from 'react'
import PropTypes from 'prop-types'

import Task from './Task'
export default class TaskList extends React.Component {
  elements = () => {
    const { todos, onEdited, onDeleted, onCompleted } = this.props
    return todos.map((todo) => {
      const { id } = todo
      return (
        <Task
          key={id}
          id={id}
          todo={todo}
          onEdited={(text) => onEdited(id, text)}
          onDeleted={() => onDeleted(id)}
          onCompleted={() => onCompleted(id)}
        />
      )
    })
  }
  render() {
    return <ul className="todo-list">{this.elements()}</ul>
  }
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleted: PropTypes.func.isRequired,
    onCompleted: PropTypes.func.isRequired,
  }
  static defaultProps = {
    todos: [],
  }
}
