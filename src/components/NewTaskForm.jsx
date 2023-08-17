import React from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends React.Component {
  state = {
    value: '',
    minutes: '',
    seconds: '',
  }
  printValue = (e) => {
    this.setState({
      value: e.target.value,
    })
  }
  printMinutes = (e) => {
    this.setState({
      minutes: e.target.value,
    })
  }
  printSeconds = (e) => {
    this.setState({
      seconds: e.target.value,
    })
  }
  submit = (e) => {
    e.preventDefault()
    const { value, minutes, seconds } = this.state
    if (value.trim() === '') {
      this.setState({
        value: '',
      })
      return
    }
    const numMinutes = parseInt(minutes, 10)
    const numSeconds = parseInt(seconds, 10)
    if (isNaN(numMinutes) || isNaN(numSeconds) || numMinutes < 0 || numSeconds < 0 || numSeconds > 59) {
      return
    }
    this.props.onAdded(value, minutes, seconds)
    this.setState({
      value: '',
      minutes: '',
      seconds: '',
    })
  }
  render() {
    const { value, minutes, seconds } = this.state
    return (
      <header className="header">
        <h1>todos</h1>
        <form
          className="new-todo-form"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              this.submit(e)
            }
          }}
        >
          <input className="new-todo" placeholder="Task" autoFocus value={value} onChange={this.printValue} />
          <input className="new-todo-form__timer" placeholder="Min" value={minutes} onChange={this.printMinutes} />
          <input className="new-todo-form__timer" placeholder="Sec" value={seconds} onChange={this.printSeconds} />
        </form>
      </header>
    )
  }
  static propTypes = {
    onAdded: PropTypes.func.isRequired,
  }
}
