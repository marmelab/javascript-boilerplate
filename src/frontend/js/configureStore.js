import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(rootReducer, initialState) {
    const middlewares = applyMiddleware(
        sagaMiddleware,
        routerMiddleware(hashHistory),
    );

    const devtools = window.devToolsExtension ? window.devToolsExtension() : f => f;

    const store = createStore(rootReducer, initialState, compose(middlewares, devtools));
    sagaMiddleware.run(sagas);
    return store;
}
