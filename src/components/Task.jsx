import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'

export default function Task({ todo, id, onCompleted, onDeleted, onEdited }) {
  const [timerInterval, setTimerInterval] = useState(null)
  const [value, setValue] = useState('')
  const [editing, setEditing] = useState(false)
  const [minutes, setMinutes] = useState(todo.timerMin)
  const [seconds, setSeconds] = useState(todo.timerSec)
  useEffect(() => {
    const timerState = sessionStorage.getItem(`timerState${id}`)
    if (timerState) {
      clearInterval(timerInterval)
      const { minutes, seconds } = JSON.parse(timerState)
      setMinutes(minutes)
      setSeconds(seconds)
      sessionStorage.removeItem(`timerState${id}`)
      startTimer()
    }
    return () => {
      sessionStorage.setItem(`timerState${id}`, JSON.stringify({ minutes, seconds }))
      stopTimer()
      setTimerInterval(setInterval(unmountedTimerTick, 1000))
    }
  }, [])
  const timerTick = () => {
    if (minutes <= 0 && seconds <= 0) {
      clearInterval(timerInterval)
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
  }
  const deleteTask = () => {
    clearInterval(timerInterval)
    onDeleted()
  }
  const unmountedTimerTick = () => {
    let timerState = sessionStorage.getItem(`timerState${id}`)
    if (timerState) {
      let { minutes, seconds } = JSON.parse(timerState)
      if (Number(minutes) === 0 && Number(seconds) === 0) {
        clearInterval(timerInterval)
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
    setTimerInterval(setInterval(timerTick, 1000))
  }
  const stopTimer = () => {
    clearInterval(timerInterval)
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
// class Task extends React.Component {
//   state = {
//     value: '',
//     editing: false,
//     minutes: props.todo.timerMin,
//     seconds: props.todo.timerSec,
//     timerRunning: false,
//   }
//   componentDidMount() {
//     const { id } = props
//     const timerState = sessionStorage.getItem(`timerState${id}`)
//     if (timerState) {
//       clearInterval(timerInterval)
//       const { minutes, seconds } = JSON.parse(timerState)
//       setState({ minutes, seconds })
//       sessionStorage.removeItem(`timerState${id}`)
//       startTimer()
//     }
//   }
//   componentWillUnmount() {
//     const { minutes, seconds, timerRunning } = state
//     if (timerRunning) {
//       const { id } = props
//       sessionStorage.setItem(`timerState${id}`, JSON.stringify({ minutes, seconds }))
//       stopTimer()
//       timerInterval = setInterval(unmountedTimerTick, 1000)
//     }
//   }
//   onDeleted = () => {
//     const { onDeleted } = props
//     clearInterval(timerInterval)
//     setState(
//       {
//         timerRunning: false,
//       },
//       onDeleted
//     )
//   }
//   startTimer = () => {
//     setState({ timerRunning: true })
//     timerInterval = setInterval(timerTick, 1000)
//   }
//   stopTimer = () => {
//     setState({
//       timerRunning: false,
//     })
//     console.log('Stop timer')
//     clearInterval(timerInterval)
//   }
//   timerTick = () => {
//     setState((prevState) => {
//       const { minutes, seconds } = prevState
//       if (Number(minutes) === 0 && Number(seconds) === 0) {
//         clearInterval(timerInterval)
//         return {
//           timerRunning: false,
//         }
//       }
//       if (Number(seconds) === 0) {
//         return {
//           minutes: minutes - 1,
//           seconds: 59,
//         }
//       }
//       return {
//         seconds: seconds - 1,
//       }
//     })
//   }
//   unmountedTimerTick = () => {
//     const { id } = props
//     let timerState = sessionStorage.getItem(`timerState${id}`)
//     if (timerState) {
//       let { minutes, seconds } = JSON.parse(timerState)
//       if (Number(minutes) === 0 && Number(seconds) === 0) {
//         clearInterval(timerInterval)
//         sessionStorage.setItem(`timerState${id}`, JSON.stringify({ minutes, seconds }))
//         return
//       }
//       if (Number(seconds) === 0) {
//         minutes -= 1
//         seconds = 60
//       }
//       seconds -= 1
//       sessionStorage.setItem(`timerState${id}`, JSON.stringify({ minutes, seconds }))
//     }
//   }
//   printingNewTask = (e) => {
//     if (e.key === 'Escape') {
//       setState({
//         value: '',
//         editing: false,
//       })
//     } else {
//       setState({
//         value: e.target.value,
//       })
//     }
//   }
//   editingTask = () => {
//     setState({
//       editing: true,
//     })
//   }
//   submitingTask = (e) => {
//     e.preventDefault()
//     if (state.value.trim() === '') {
//       setState({
//         value: '',
//         editing: false,
//       })
//       return
//     }
//     props.onEdited(state.value)
//     setState({
//       value: '',
//       editing: false,
//     })
//   }
//   editTaskForm = () => {
//     let editTaskForm = null
//     const { textContent } = props.todo
//     if (state.editing) {
//       editTaskForm = (
//         <form onSubmit={submitingTask}>
//           <input
//             type="text"
//             className="new-todo"
//             defaultValue={textContent}
//             onKeyDown={printingNewTask}
//             autoFocus
//           ></input>
//         </form>
//       )
//     }
//     return editTaskForm
//   }
//   taskCreateTime = () => {
//     const { date } = props.todo
//     return formatDistanceToNow(date, {
//       includeSeconds: true,
//       addSuffix: true,
//     })
//   }
//   className = () => {
//     const { completed } = props.todo
//     let className = 'task'
//     if (completed) {
//       className += ' completed'
//     }
//     if (state.editing) {
//       className += ' editing'
//     }
//     return className
//   }
//   render() {
//     const { todo, onCompleted } = props
//     const { textContent, completed } = todo
//     const { minutes, seconds } = state
//     return (
//       <li className={className()}>
//         <div className="view">
//           <input
//             className="toggle"
//             type="checkbox"
//             defaultChecked={completed}
//             onClick={() => {
//               onCompleted()
//               stopTimer()
//             }}
//           />
//           <label>
//             <span className="title">{textContent}</span>
//             <span className="description">
//               <button className="icon icon-play" onClick={startTimer}></button>
//               <button className="icon icon-pause" onClick={stopTimer}></button>
//               <span>
//                 {minutes}:{seconds}
//               </span>
//             </span>
//             <span className="description">{`created ${taskCreateTime()}`}</span>
//           </label>
//           <button className="icon icon-edit" onClick={editingTask}></button>
//           <button className="icon icon-destroy" onClick={onDeleted}></button>
//         </div>
//         {editTaskForm()}
//       </li>
//     )
//   }
//   static propTypes = {
//     todo: PropTypes.object.isRequired,
//     onDeleted: PropTypes.func,
//     onCompleted: PropTypes.func,
//   }
//   static defaultProps = {
//     onCompleted: () => {},
//     onDeleted: () => {},
//   }
// }
