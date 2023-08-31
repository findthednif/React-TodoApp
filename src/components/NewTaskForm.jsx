import React, { useState } from 'react'
export default function NewTaskForm({ onAdded }) {
  const [value, setValue] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const printValue = (e) => {
    setValue(e.target.value)
  }
  const printMinutes = (e) => {
    setMinutes(e.target.value)
  }
  const printSeconds = (e) => {
    setSeconds(e.target.value)
  }
  const submit = (e) => {
    e.preventDefault()
    if (value.trim() === '') {
      setValue('')
      return
    }
    const numMinutes = parseInt(minutes, 10)
    const numSeconds = parseInt(seconds, 10)
    if (isNaN(numMinutes) || isNaN(numSeconds) || numMinutes < 0 || numSeconds < 0 || numSeconds > 59) {
      return
    }
    onAdded(value, minutes, seconds)
    setValue('')
    setMinutes('')
    setSeconds('')
  }
  return (
    <header className="header">
      <h1>todos</h1>
      <form
        className="new-todo-form"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            submit(e)
          }
        }}
      >
        <input className="new-todo" placeholder="Task" autoFocus value={value} onChange={printValue} />
        <input className="new-todo-form__timer" placeholder="Min" value={minutes} onChange={printMinutes} />
        <input className="new-todo-form__timer" placeholder="Sec" value={seconds} onChange={printSeconds} />
      </form>
    </header>
  )
}
