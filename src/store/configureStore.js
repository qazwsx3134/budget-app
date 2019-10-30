import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";
import authReducer from "../reducers/auth";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default ()=>{
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters:filtersReducer,
            auth: authReducer,
        }),
        composeEnhancers(applyMiddleware(thunk)) //要使用redux devtool藥用 redux的compose然後再打上面那行
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        );
        
    return store;
};

