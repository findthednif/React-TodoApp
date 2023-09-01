import React from 'react'

import Task from './Task'
export default function TaskList({ todos, onEdited, onDeleted, onCompleted }) {
  const elements = () => {
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
  return <ul className="todo-list">{elements()}</ul>
}
// export default class TaskList extends React.Component {
//   elements = () => {
//     const { todos, onEdited, onDeleted, onCompleted } = this.props
//     return todos.map((todo) => {
//       const { id } = todo
//       return (
//         <Task
//           key={id}
//           id={id}
//           todo={todo}
//           onEdited={(text) => onEdited(id, text)}
//           onDeleted={() => onDeleted(id)}
//           onCompleted={() => onCompleted(id)}
//         />
//       )
//     })
//   }
//   render() {
//     return <ul className="todo-list">{this.elements()}</ul>
//   }
// }
