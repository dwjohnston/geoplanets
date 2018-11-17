import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';

import './app.styl';

import { addTodo } from './actions/todos';
import Helmet from 'react-helmet';

import { Typography, Card, withStyles } from '@material-ui/core';

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
 * This is also the entry point for react router, declare any
 * of your top-level routes here.
//  */
// @connect(mapStateToProps, {
//     addTodo
// })
class App extends Component {

    constructor(props) {
        super();

        console.log(props);
    }

    handleAddTodoClick = () => {
        this.props.addTodo(`Random Todo #${Math.round(Math.random() * 100)}`);
    };

    componentDidUpdate() {
        console.log("did update");
    }


    render() {

        const { classes, todos } = this.props;
        return (

            <div>
                <div>
                    <Helmet>
                        <title>App Component | React Universal</title>
                    </Helmet>

                </div >


                <Card elevation={24} className={classes.card}>
                    <Typography color="primary" variant="h1"> Hello world! </Typography>
                    <UniversalComponent name="getting-started" />

                    {/* <ul>
                        {todos.map(todo =>
                            <li key={todo.id}>{todo.name}</li>
                        )}
                    </ul> */}
                    <button onClick={this.handleAddTodoClick}>Add random todo</button>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/about' component={About} />
                        <Route component={NotFound} />
                    </Switch>
                </Card>


            </div >

            // <Switch>
            //     <Route exact path='/' component={Home} />
            //     <Route path='/about' component={About} />
            //     <Route component={NotFound} />
            // </Switch>

        );
    }
}

const styles = theme => ({
    root: {

    },

    card: {
        padding: 20,
    }
})

export default withStyles(styles)(App);
