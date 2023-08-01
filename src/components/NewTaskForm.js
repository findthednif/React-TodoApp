import React from 'react'
import PropTypes from 'prop-types'
export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }

  printValue(e) {
    this.setState({
      value: e.target.value,
    })
  }
  submit(e) {
    e.preventDefault()
    if (this.state.value.trim() === '') {
      this.setState({
        value: '',
      })
      return
    }
    this.props.onAdded(this.state.value)
    this.setState({
      value: '',
    })
  }
  render() {
    return (
      <form className="header" onSubmit={this.submit.bind(this)}>
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.value}
          onChange={this.printValue.bind(this)}
        />
      </form>
    )
  }
}
NewTaskForm.propTypes = {
  onAdded: PropTypes.func.isRequired,
}
