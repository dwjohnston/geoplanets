import React, { Component } from 'react';
import { connect } from 'react-redux';

import './app.styl';

import { addTodo } from './actions/todos';
import Helmet from 'react-helmet';


import UniversalComponent from './components/UniversalComponent';
/**
 * This method combines the state of the reducers with the props passed to the component.
 * A component that connects to the store is commonly referred to as 'container'.
 * To connect to the store, the '@connect' decorator is used.
 *
 * @param todos
 * @returns {{todos: *}}
 */
const mapStateToProps = ({ todos }) => ({
    todos
});


/**
 * The `App` component is the entry point for the react app.
 * It is rendered on the client as well as on the server.
 *
 * You can start developing your react app here.
 */
@connect(mapStateToProps, {
    addTodo
})
class App extends Component {

    handleAddTodoClick = () => {
        this.props.addTodo(`Random Todo #${Math.round(Math.random() * 100)}`);
    };

    render() {
        const { todos } = this.props;
        console.log(todos);
        return (
            <div>
                <h1>Welcome to React Fiber with Redux.</h1>
                <ul>
                    {todos.map(todo =>
                        <li key={todo.id}>{todo.name}</li>
                    )}
                </ul>
                <button onClick={this.handleAddTodoClick}>Add random todo</button>
                <Helmet>
                    <title>App Component | React Universal</title>
                </Helmet>

                <h1>Welcome to React Fiber.</h1>
                <UniversalComponent name="getting-started" />
            </div >
        );
    }
}

export default App; 