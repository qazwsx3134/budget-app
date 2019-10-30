import React from 'react';
import ReactDOM from 'react-dom';
import { Provider  } from "react-redux";
import AppRouter, { history } from './routers/AppRouter';
import configureStore from "./store/configureStore";
import { startFetchExpenses } from "./actions/expenses";
import {login, logout} from "./actions/auth";
import expensesReducer from "./reducers/expenses";
import filtersReducer from "./reducers/filters";
import getVisibleExpenses from "./selectors/expenses";
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {firebase} from './firebase/firebase';

const store = configureStore();//把configureStore return的東西 存到store

const jsx = (
    <Provider store = {store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;

const renderApp=()=>{
    if(!hasRendered){
        ReactDOM.render(jsx , document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<p>Loading...</p> , document.getElementById('app'));

firebase.auth().onAuthStateChanged((user)=>{
    
    if (user) {
        store.dispatch(login(user.uid))
        store.dispatch(startFetchExpenses()).then(()=>{ //抓完資料 再render一次
            renderApp();
            if(history.location.pathname === '/'){
                history.push('/dashboard')
            }
        })
        
        
    }else{
        store.dispatch(logout())
        renderApp();
        history.push('/');
        
    }
});