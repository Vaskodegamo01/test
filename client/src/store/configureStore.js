import thunkMiddleware from "redux-thunk";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {routerMiddleware} from "react-router-redux";
import createHistory from "history/createBrowserHistory";

import usersReducer from "./reducers/usersReducer";
import photosReducer from './reducers/photosReducer';
import {saveState, loadState} from "./localStorage";


const rootReducer = combineReducers({
    users: usersReducer,
    photos: photosReducer
});

export const history = createHistory();

const middleware = [
    thunkMiddleware,
    routerMiddleware(history)
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, enhancers);

store.subscribe(() => {
    saveState({
        users: store.getState().users
    });
});

export default store;