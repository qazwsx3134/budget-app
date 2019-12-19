import React from 'react';
import ReactDOM from 'react-dom';
import { Provider  } from "react-redux";
import AppRouter, { history } from './routers/AppRouter';
import configureStore from "./store/configureStore";
import {login, logout} from "./actions/auth";
import filtersReducer from "./reducers/filters";
import 'normalize.css/normalize.css';
import './styles/styles.scss';


import LoadingPage from './components/LoadingPage'
import { fetchViewpoints } from "./actions/viewpoint";
import { fetchQanda } from "./actions/qanda";
import { fetchFood } from "./actions/food";
import { fetchEvent } from "./actions/event";
import { viewpoint,qanda,food,event } from "./store/store";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; 



export const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#fd9ea3',
        main: '#fd868c',
        dark: '#b15d62',
        contrastText: '#fff',
      },
      secondary: {
        light: '#f381a7',
        main: '#f06292',
        dark: '#a84466',
        contrastText: '#fff',
      },  
    },typography: {
      fontFamily: [
        'Segoe UI',
        'SegoeUI',
        'Microsoft JhengHei',
        '微軟正黑體',
        "Helvetica Neue",
        'Helvetica',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });


const store = configureStore();//把configureStore return的東西 存到store
// store.dispatch(fetchViewpoints(viewpoint))
// store.dispatch(fetchQanda(qanda))
// store.dispatch(fetchFood(food))
// store.dispatch(fetchEvent(event))

const jsx = (
    
        <Provider store = {store}>
            <MuiThemeProvider theme = { theme }>
                <AppRouter />
            </MuiThemeProvider>
        </Provider>
   
    
);


ReactDOM.render(<LoadingPage /> , document.getElementById('app'));

ReactDOM.render(jsx, document.getElementById('app')
 );

        