import SearchBarComponent from './SearchBarComponent'
import ToDoCard from './ToDoCard'
import React, { Component } from 'react';

export default class IncompleteContainer extends Component {

    // When implementing the search bar, consider implementing state here to make it dynamic. 
    // i.e everytime you type in the input field, the ToDos are immediately filtered
    
    state = {
        searchTerm: ""
    }

    // When implementing the search bar, consider implementing a function that handles setState and pass this function down to 
    // SearchBarComponent
  
    handleOnChange = (searchTerm) => {
      this.setState({searchTerm})  
    }

    // When implementing the search term, consider implementing a function that FILTERs the todos.
    // To determine which to filter, find out which ToDo title INCLUDES the search term typed.
    renderTodoCards(){
    const filteredTodos =  this.props.todos.filter(todo => todo.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
      
      return filteredTodos.map(todo => <ToDoCard key={todo.id} id={todo.id} 
        completed={todo.completed} 
        title={todo.title}
        updateComplete={this.props.updateComplete}
        deleteTodo={this.props.deleteTodo}
      />)
    }


  render() {
    return (
        <div>
            <h1>Incomplete Todos</h1>
            <SearchBarComponent handleOnChange={this.handleOnChange}/>
            {this.renderTodoCards()}
            {/* Render ToDo Card for each ToDo */} 
            {/* Which Array method can you use? */}
        </div>
    )
  }
}
