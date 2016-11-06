import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(rootReducer, sagas, middlewares, initialState) {
    const allMiddlewares = applyMiddleware(
        ...middlewares,
        sagaMiddleware,
        routerMiddleware(hashHistory)
    );

    const devtools = window.devToolsExtension ? window.devToolsExtension() : f => f;

    const store = createStore(rootReducer, initialState, compose(allMiddlewares, devtools));
    sagaMiddleware.run(sagas);
    return store;
}
