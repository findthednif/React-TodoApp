import React, { useState, useEffect, useRef } from 'react'
import { formatDistanceToNow } from 'date-fns'

export default function Task({ todo, id, onCompleted, onDeleted, onEdited }) {
  const timerIntervalRef = useRef(null)
  const [value, setValue] = useState('')
  const [editing, setEditing] = useState(false)
  const [minutes, setMinutes] = useState(todo.timerMin)
  const [seconds, setSeconds] = useState(todo.timerSec)
  const [timerRunning, setTimerRun] = useState(false)
  useEffect(() => {
    return () => {
      clearInterval(timerIntervalRef.current)
      sessionStorage.setItem(`timerState${id}`, JSON.stringify({ minutes, seconds }))
    }
  }, [id, minutes, seconds])
  useEffect(() => {
    const timerState = sessionStorage.getItem(`timerState${id}`)
    if (timerState) {
      clearInterval(timerIntervalRef.current)
      const { minutes, seconds } = JSON.parse(timerState)
      setMinutes(minutes)
      setSeconds(seconds)
      sessionStorage.removeItem(`timerState${id}`)
      startTimer()
    }
  }, [id])
  useEffect(() => {
    if (timerRunning) {
      timerIntervalRef.current = setInterval(() => {
        if (minutes <= 0 && seconds <= 0) {
          clearInterval(timerIntervalRef.current)
          setTimerRun(false)
        }
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1)
        }
        if (seconds <= 0 && minutes > 0) {
          setSeconds(() => {
            return 59
          })
          setMinutes((minutes) => minutes - 1)
        }
      }, 1000)
    }
    return () => clearInterval(timerIntervalRef.current)
  }, [seconds, minutes, timerRunning])

  const deleteTask = () => {
    clearInterval(timerIntervalRef.current)
    onDeleted()
    sessionStorage.clear()
  }
  const printingNewTask = (e) => {
    if (e.key === 'Escape') {
      setValue('')
      setEditing(false)
    } else {
      setValue(e.target.value)
    }
  }
  const editingTask = () => {
    setEditing(true)
  }
  const submitingTask = (e) => {
    e.preventDefault()
    if (value.trim() === '') {
      setValue('')
      setEditing(false)
      return
    }
    onEdited(value)
    setValue('')
    setEditing(false)
  }
  const editTaskForm = () => {
    let editTaskForm = null
    const { textContent } = todo
    if (editing) {
      editTaskForm = (
        <form onSubmit={submitingTask}>
          <input
            type="text"
            className="new-todo"
            defaultValue={textContent}
            onKeyDown={printingNewTask}
            autoFocus
          ></input>
        </form>
      )
    }
    return editTaskForm
  }
  const taskCreateTime = () => {
    const { date } = todo
    return formatDistanceToNow(date, {
      includeSeconds: true,
      addSuffix: true,
    })
  }
  const className = () => {
    const { completed } = todo
    let className = 'task'
    if (completed) {
      className += ' completed'
    }
    if (editing) {
      className += ' editing'
    }
    return className
  }
  const startTimer = () => {
    if (!timerRunning) {
      setTimerRun(true)
    }
  }
  const stopTimer = () => {
    if (timerRunning) {
      setTimerRun(false)
    }
  }
  return (
    <li className={className()}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          defaultChecked={todo.completed}
          onClick={() => {
            onCompleted()
            stopTimer()
          }}
        />
        <label>
          <span className="title">{todo.textContent}</span>
          <span className="description">
            <button className="icon icon-play" onClick={startTimer}></button>
            <button className="icon icon-pause" onClick={stopTimer}></button>
            <span>
              {minutes}:{seconds}
            </span>
          </span>
          <span className="description">{`created ${taskCreateTime()}`}</span>
        </label>
        <button className="icon icon-edit" onClick={editingTask}></button>
        <button className="icon icon-destroy" onClick={deleteTask}></button>
      </div>
      {editTaskForm()}
    </li>
  )
}
