import React, { Component } from 'react';
import CompletedContainer from './CompletedContainer'
import IncompleteContainer from './IncompleteContainer'
import NewToDoForm from './NewToDoForm'

export default class ToDoContainer extends Component {
  
  state = {
    todos: []
  }

  componentDidMount(){
    fetch("http://localhost:3000/todos")
    .then(r => r.json())
    .then( todos =>
      this.setState({todos})
    )
  }

  updateComplete = (id) => {
    console.log(id)
    const todo = this.state.todos.find(todo => todo.id === id)
    console.log("todo", todo)
    const body = {
      completed: !todo.completed
    }
    console.log(body)
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify({completed: !todo.completed})
    })
    .then(r => r.json())
    .then(updatedTodo => {
      // do a fetch to get?
      const updatedTodos = this.state.todos.map(todo => {
        if (todo.id === updatedTodo.id){
          console.log("hello", todo)
          return {...todo, completed: !todo.completed}
        }
        else{
          return todo
        }
      })
      this.setState({
        todos: updatedTodos
      })
    })
  }

  addTodo = (title) => {
    const body = {
      title,
      completed: false
    }
    fetch(`http://localhost:3000/todos`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(r => r.json())
    .then(newTodo => {
      this.setState({
        todos: [...this.state.todos, newTodo]
      })
    })
  }

  deleteTodo = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(resp => {
      const updatedTodos = this.state.todos.filter(todo => todo.id !== id)
      this.setState({
        todos: updatedTodos
      })
    })
  }

  renderTodos(){
    console.log(this.state)
  }

  render() {
    return (
      <div id="todo-container">
        <NewToDoForm addTodo={this.addTodo}/>
        <CompletedContainer 
          todos={this.state.todos.filter(todo => todo.completed)} 
          updateComplete={this.updateComplete}
          deleteTodo={this.deleteTodo}
        />
        <IncompleteContainer 
          todos={this.state.todos.filter(todo => !todo.completed)}
          updateComplete={this.updateComplete}
          deleteTodo={this.deleteTodo}
        />
      </div>
    );
  }
}
