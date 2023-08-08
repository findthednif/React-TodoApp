import React from "react";
import NewTaskForm from "./NewTaskForm";
import TaskList from "./TaskList";
import Footer from "./Footer";
export default class App extends React.Component {
  maxId = 0;
  state = {
    activeFilter: "all",
    todoData: [],
  };
  setFilter = (filter) => {
    this.setState({ activeFilter: filter });
  };
  filteredTodos = () => {
    const { todoData, activeFilter } = this.state;
    return todoData.filter((todo) => {
      if (activeFilter === "active") {
        return !todo.completed;
      } else if (activeFilter === "completed") {
        return todo.completed;
      } else {
        return true;
      }
    });
  };
  doneCount = () => {
    return this.state.todoData.filter((todo) => {
      return !todo.completed;
    }).length;
  };
  editItem = (id, text) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((todo) => {
          if (todo.id === id) todo.textContent = text;
          return todo;
        }),
      };
    });
  };
  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const newTodoData = [
        ...todoData.slice(0, index),
        ...todoData.slice(index + 1),
      ];
      return {
        todoData: newTodoData,
      };
    });
  };
  addItem = (text) => {
    const newItem = {
      textContent: text,
      completed: false,
      id: this.maxId++,
      date: new Date(),
    };
    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, newItem],
      };
    });
  };
  completedItem = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const newItem = {
        ...todoData[index],
        completed: !todoData[index].completed,
      };
      const newTodoData = [
        ...todoData.slice(0, index),
        newItem,
        ...todoData.slice(index + 1),
      ];
      return {
        todoData: newTodoData,
      };
    });
  };
  completedRemove = () => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter((todo) => {
        return !todo.completed;
      });
      return {
        todoData: newTodoData,
      };
    });
  };
  render() {
    const { activeFilter } = this.state;
    return (
      <section className="todoapp">
        <NewTaskForm onAdded={this.addItem} />
        <TaskList
          todos={this.filteredTodos()}
          onEdited={this.editItem}
          onDeleted={this.deleteItem}
          onCompleted={this.completedItem}
        />
        <Footer
          doneCount={this.doneCount()}
          activeFilter={activeFilter}
          setFilter={this.setFilter}
          completedRemove={this.completedRemove}
        />
      </section>
    );
  }
}
