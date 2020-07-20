import React from 'react'
import ToDoCard from './ToDoCard'

const CompletedContainer = (props) => {
    return (
        <div>
            <h1>Completed Todos</h1>
            {props.todos.map(todo => <ToDoCard key={todo.id} id={todo.id} 
                completed={todo.completed} 
                title={todo.title}
                updateComplete={props.updateComplete}
                deleteTodo={props.deleteTodo}
            />)}
            {/* Render ToDo Card for each ToDo */}
             {/* Which Array method can you use? */}
        </div>
    )
}

export default CompletedContainer