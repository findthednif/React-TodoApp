import React from 'react'

export default class TasksFilter extends React.Component {
  filterButtons = () => {
    const { activeFilter, setFilter, filters } = this.props
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
  render() {
    return <ul className="filters">{this.filterButtons()}</ul>
  }
}
