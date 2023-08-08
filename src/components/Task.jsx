import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default class Task extends React.Component {
  state = {
    value: '',
    editing: false,
  }
  printingNewTask = (e) => {
    this.setState({
      value: e.target.value,
    })
  }
  editingTask = () => {
    this.setState({
      editing: true,
    })
  }
  submitingTask = (e) => {
    e.preventDefault()
    if (this.state.value.trim() === '') {
      this.setState({
        value: '',
        editing: false,
      })
      return
    }
    this.props.onEdited(this.state.value)
    this.setState({
      value: '',
      editing: false,
    })
  }
  editTaskForm = () => {
    let editTaskForm = null
    const { textContent } = this.props.todo
    if (this.state.editing) {
      editTaskForm = (
        <form onSubmit={this.submitingTask}>
          <input
            type="text"
            className="new-todo"
            defaultValue={textContent}
            onChange={this.printingNewTask}
            autoFocus
          ></input>
        </form>
      )
    }
    return editTaskForm
  }
  taskCreateTime = () => {
    const { date } = this.props.todo
    return formatDistanceToNow(date, {
      includeSeconds: true,
      addSuffix: true,
    })
  }
  className = () => {
    const { completed } = this.props.todo
    let className = 'task'
    if (completed) {
      className += ' completed'
    }
    if (this.state.editing) {
      className += ' editing'
    }
    return className
  }
  render() {
    const { todo, onDeleted, onCompleted } = this.props
    const { textContent, completed } = todo
    return (
      <li className={this.className()}>
        <div className="view">
          <input className="toggle" type="checkbox" defaultChecked={completed} onClick={onCompleted} />
          <label>
            <span className="description">{textContent}</span>
            <span className="created">{`created ${this.taskCreateTime()}`}</span>
          </label>
          <button className="icon icon-edit" onClick={this.editingTask}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {this.editTaskForm()}
      </li>
    )
  }
  static propTypes = {
    todo: PropTypes.object.isRequired,
    onDeleted: PropTypes.func,
    onCompleted: PropTypes.func,
  }
  static defaultProps = {
    onCompleted: () => {},
    onDeleted: () => {},
  }
}
