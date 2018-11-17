import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { addTodo } from '../actions/todos';

const mapStateToProps = ({ todos }) => ({
    todos
});

@connect(mapStateToProps, {
    addTodo
})
class Home extends Component {


  handleAddTodoClick = () => {
      this.props.addTodo(`Random Todo #${Math.round(Math.random() * 100)}`);
  };

  render() {

      const { todos } = this.props;

      return (
          <div>
              <h1>Welcome to React Fiber.</h1>

              <ul>
                  {todos.map(todo =>
                      <li key={todo.id}>{todo.name}</li>
                  )}
              </ul>
              <button onClick={this.handleAddTodoClick}>Add random todo</button>

              <ul>
                  <li>
                      <Link to='/about'>About</Link>
                  </li>
                  <li>
                      <Link to='/random-link'>Not Found</Link>
                  </li>
              </ul>
          </div>
      );
  }

}

export default Home; 
