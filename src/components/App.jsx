import React, { useState, useEffect } from 'react'

import NewTaskForm from './NewTaskForm'
import TaskList from './TaskList'
import Footer from './Footer'
export default function App() {
  const [filter, setFilter] = useState('all')
  const [todoData, setTodoData] = useState([])
  const [maxId, setMaxId] = useState(0)
  useEffect(() => {
    sessionStorage.clear()
  }, [])
  const setActiveFilter = (filter) => {
    setFilter(filter)
  }
  const filteredTodos = () => {
    return todoData.filter((todo) => {
      if (filter === 'active') {
        return !todo.completed
      } else if (filter === 'completed') {
        return todo.completed
      } else {
        return true
      }
    })
  }
  const doneCount = () => {
    return todoData.filter((todo) => {
      return !todo.completed
    }).length
  }
  const editItem = (id, text) => {
    setTodoData((prevTodoData) => {
      return prevTodoData.map((todo) => {
        if (todo.id === id) {
          return { ...todo, textContent: text }
        }
        return todo
      })
    })
  }
  const deleteItem = (id) => {
    setTodoData((prevTodoData) => {
      const index = prevTodoData.findIndex((el) => el.id === id)
      return [...prevTodoData.slice(0, index), ...prevTodoData.slice(index + 1)]
    })
    sessionStorage.removeItem(`timerState${id}`)
  }
  const addItem = (text, min, sec) => {
    const newItem = {
      textContent: text,
      completed: false,
      id: maxId,
      date: new Date(),
      timerMin: min,
      timerSec: sec,
    }
    setTodoData((prevTodoData) => [...prevTodoData, newItem])
    setMaxId((prevMaxId) => prevMaxId + 1)
  }
  const completedItem = (id) => {
    setTodoData((prevTodoData) => {
      const index = prevTodoData.findIndex((el) => el.id === id)
      const newItem = {
        ...prevTodoData[index],
        completed: !prevTodoData[index].completed,
      }
      return [...prevTodoData.slice(0, index), newItem, ...prevTodoData.slice(index + 1)]
    })
  }
  const completedRemove = () => {
    setTodoData((prevTodoData) => {
      return prevTodoData.filter((todo) => {
        return !todo.completed
      })
    })
  }
  return (
    <section className="todoapp">
      <NewTaskForm onAdded={addItem} />
      <TaskList todos={filteredTodos()} onEdited={editItem} onDeleted={deleteItem} onCompleted={completedItem} />
      <Footer
        doneCount={doneCount()}
        activeFilter={filter}
        setFilter={setActiveFilter}
        completedRemove={completedRemove}
      />
    </section>
  )
}
