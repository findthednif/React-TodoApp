import React from 'react'

export default function TasksFilter({ activeFilter, setFilter, filters }) {
  const filterButtons = () => {
    return filters.map((filter) => {
      return (
        <li key={filter.value}>
          <button className={activeFilter === filter.value ? 'selected' : ''} onClick={() => setFilter(filter.value)}>
            {filter.label}
          </button>
        </li>
      )
    })
  }
  return <ul className="filters">{filterButtons()}</ul>
}
