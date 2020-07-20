import React, { Component } from 'react';

export default class NewToDoForm extends Component {

  state = {
    newTodo: ""
  }

  handleChange = (e) => {
    this.setState({
      newTodo: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
    this.props.addTodo(this.state.newTodo)
  }
  render() {
    return (
      <div>
        <form className="ui form">
            <h1>New ToDo</h1>
            <div className="field">
                <label>Title</label>
                <input type="text" name="title" placeholder="Title" value={this.state.newTodo} onChange={this.handleChange}/>
            </div>
            <button className="ui button" type="submit" onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}
