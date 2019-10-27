import React from 'react';
import ReactDOM from 'react-dom';
import { Provider  } from "react-redux";
import AppRouter from './routers/AppRouter';
import configureStore from "./store/configureStore";
import { addExpense } from "./actions/expenses";
import {setTextFilter} from "./actions/filters";
import expensesReducer from "./reducers/expenses";
import filtersReducer from "./reducers/filters";
import getVisibleExpenses from "./selectors/expenses";
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css'

const store = configureStore();//把configureStore return的東西 存到store

store.dispatch(addExpense({description: 'water bill', amount: 31321, createdAt:2}));
store.dispatch(addExpense({description: 'gas bill', amount: 6545641, createdAt:20}));
store.dispatch(addExpense({description: 'rent', amount: 321, createdAt:400}));
store.dispatch(setTextFilter(''))

const state = store.getState();

const visibleExpenses = getVisibleExpenses(state.expenses,state.filters);

console.log(state);

// console.log(visibleExpenses);


const jsx = (
    <Provider store = {store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx , document.getElementById('app'));
