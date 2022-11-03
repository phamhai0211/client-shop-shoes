import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
//import {compose} from 'redux'
//import { createLogger } from 'redux-logger';

// const middleware = [thunk];

// if(process.env.NODE_ENV != "production") {
//     middleware.push(createLogger());
// }

// export const store = createStore(
//     reducers,
//     applyMiddleware(...middleware)
// )

// const configureStore = () => {
//     const middlewares = [thunk]
//     const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//     const enhancers = composeEnhancers(applyMiddleware(...middlewares));
//     const store = createStore(reducers(), enhancers);

//     return store;
// }

// export default configureStore;

const middleware = [thunk]
if (process.env.NODE_ENV === "development"){
    middleware.push(logger);
}

const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

export default store;