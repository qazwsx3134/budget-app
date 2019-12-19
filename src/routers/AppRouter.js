import React,{ useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import NotFoundPage from '../components/NotFoundPage';
import SingIn from "../components/SingIn";
import Signup from "../components/Signup";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import SubRouterHualien from "./SubRouterHualien";
import SubRouterTaipei from "./SubRouterTaipei";
import SubRouterNewTaipei from "./SubRouterNewTaipei";
import SubRouterYilan from "./SubRouterYilan";
import  Header  from '../components/Header';
import HeaderPage from '../components/HeaderPage';
import CreatePage  from "../components/CreatePage";
import DashboardList from "../components/DashboardList";
import CreateEventForm from "../components/CreateEventForm";
import CreatePlaceForm from "../components/CreatePlaceForm";
import CreateFoodForm from "../components/CreateFoodForm";
import Footer from "../components/Footer";
import { apiUserGetinfo } from "../api/api";
import { login } from "../actions/auth";

export const history = createBrowserHistory();


const AppRouter = () => {
  const dispatch = useDispatch()
  useEffect( () => {
    async function fetchData() {
      // You can await here
      const userRes = await apiUserGetinfo()
      

      dispatch(login(userRes.data))
      
      console.log(userRes.data);
      
      // ...
    }
    fetchData()
    
      
      
  },[]);


  return (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" exact={true}>
          <Header />
          <HeaderPage />
          <DashboardList/>
          <Footer />
        </Route>
        <Route path="/login" exact={true}>
          <Header />
          <SingIn />
          
        </Route>
        <Route path="/signup" exact={true}>
          <Header />
          <Signup />
          
        </Route>
        {/* 這底下的要變成private route */}

        <PrivateRoute path="/create" component={CreatePage}  />
        <PrivateRoute path="/postevent" component={CreateEventForm}  />
        <PrivateRoute path="/postplace" component={CreatePlaceForm}  />
        <PrivateRoute path="/postfood" component={CreateFoodForm}  />
        {/* */}
        <Route path="/:id" >
          <Header />
          <HeaderPage />
          <SubRouterHualien />
          <SubRouterTaipei />
          <SubRouterNewTaipei />
          <SubRouterYilan />
        </Route>
        
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
  );
};

export default AppRouter;
