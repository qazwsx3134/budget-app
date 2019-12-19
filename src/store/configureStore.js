import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import filtersReducer from "../reducers/filters";
import authReducer from "../reducers/auth";
import viewpointReducer from "../reducers/viewpoint";
import qandaReducer from "../reducers/qanda";
import commentsReducer from "../reducers/comments";
import foodReducer from "../reducers/food";
import eventReducer from "../reducers/event";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default ()=>{
    const store = createStore(
        combineReducers({
            filters:filtersReducer,
            auth: authReducer,
            viewpoint: viewpointReducer,
            qanda: qandaReducer,
            comments: commentsReducer,
            food: foodReducer,
            event: eventReducer,
        }),
        composeEnhancers(applyMiddleware(thunk)) //要使用redux devtool藥用 redux的compose然後再打上面那行
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        );
        
    return store;
};

