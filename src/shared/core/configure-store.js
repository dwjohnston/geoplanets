import { createStore } from 'redux';

import rootReducer from '../redux/reducers';

/**
 * This methods creates a redux store based on the root reducer.
 * It can be enhanced by middleware, like redux-thunk or redux-devtools.
 *
 * For more information on the store, see https://redux.js.org/docs/basics/Store.html
 *
 * @param preloadedState
 * @returns {Store<any>}
 */
export default (preloadedState, isClientSide) => {
    const store = createStore(rootReducer, preloadedState,
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        isClientSide && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

    );

    // this piece of code enables hot reload of state with redux
    if (process.env.NODE_ENV === 'development' && module.hot) {
        module.hot.accept('../redux/reducers', () => {
            store.replaceReducer(require('../redux/reducers').default);
        });
    }

    return store;
};
