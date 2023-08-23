import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default class Task extends React.Component {
  state = {
    value: '',
    editing: false,
    minutes: this.props.todo.timerMin,
    seconds: this.props.todo.timerSec,
    timerRunning: false,
  }
  componentDidMount() {
    const { id } = this.props
    const timerState = sessionStorage.getItem(`timerState${id}`)
    if (timerState) {
      clearInterval(this.timerInterval)
      const { minutes, seconds } = JSON.parse(timerState)
      this.setState({ minutes, seconds })
      sessionStorage.removeItem(`timerState${id}`)
      this.startTimer()
    }
  }
  componentWillUnmount() {
    const { minutes, seconds, timerRunning } = this.state
    if (timerRunning) {
      const { id } = this.props
      sessionStorage.setItem(`timerState${id}`, JSON.stringify({ minutes, seconds }))
      this.stopTimer()
      this.timerInterval = setInterval(this.unmountedTimerTick, 1000)
    }
  }
  onDeleted = () => {
    const { onDeleted } = this.props
    clearInterval(this.timerInterval)
    this.setState(
      {
        timerRunning: false,
      },
      onDeleted
    )
  }
  startTimer = () => {
    this.setState({ timerRunning: true })
    this.timerInterval = setInterval(this.timerTick, 1000)
  }
  stopTimer = () => {
    this.setState({
      timerRunning: false,
    })
    clearInterval(this.timerInterval)
  }
  timerTick = () => {
    this.setState((prevState) => {
      const { minutes, seconds } = prevState
      if (Number(minutes) === 0 && Number(seconds) === 0) {
        clearInterval(this.timerInterval)
        return {
          timerRunning: false,
        }
      }
      if (Number(seconds) === 0) {
        return {
          minutes: minutes - 1,
          seconds: 59,
        }
      }
      return {
        seconds: seconds - 1,
      }
    })
  }
  unmountedTimerTick = () => {
    const { id } = this.props
    let timerState = sessionStorage.getItem(`timerState${id}`)
    if (timerState) {
      let { minutes, seconds } = JSON.parse(timerState)
      if (Number(minutes) === 0 && Number(seconds) === 0) {
        clearInterval(this.timerInterval)
        sessionStorage.setItem(`timerState${id}`, JSON.stringify({ minutes, seconds }))
        return
      }
      if (Number(seconds) === 0) {
        minutes -= 1
        seconds = 60
      }
      seconds -= 1
      sessionStorage.setItem(`timerState${id}`, JSON.stringify({ minutes, seconds }))
    }
  }
  printingNewTask = (e) => {
    if (e.key === 'Escape') {
      console.log('Esc!')
      this.setState({
        value: '',
        editing: false,
      })
    } else {
      this.setState({
        value: e.target.value,
      })
    }
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
            onKeyDown={this.printingNewTask}
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
    const { todo, onCompleted } = this.props
    const { textContent, completed } = todo
    const { minutes, seconds } = this.state
    return (
      <li className={this.className()}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            defaultChecked={completed}
            onClick={() => {
              onCompleted()
              this.stopTimer()
            }}
          />
          <label>
            <span className="title">{textContent}</span>
            <span className="description">
              <button className="icon icon-play" onClick={this.startTimer}></button>
              <button className="icon icon-pause" onClick={this.stopTimer}></button>
              <span>
                {minutes}:{seconds}
              </span>
            </span>
            <span className="description">{`created ${this.taskCreateTime()}`}</span>
          </label>
          <button className="icon icon-edit" onClick={this.editingTask}></button>
          <button className="icon icon-destroy" onClick={this.onDeleted}></button>
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
