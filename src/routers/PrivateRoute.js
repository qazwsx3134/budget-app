import React from 'react';
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from '../components/Header';
import LoadingPage from '../components/LoadingPage'

export const PrivateRoute = ({ 
    isAuthenticated, 
    component: Component,
    ...rest//rest operator跟SPREAD OPERATOR很像
})=> (
    <Route {...rest} component={(props)=>(
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props}/>
            </div>
        ): (
            <LoadingPage/>
        )
    )}/>
);

const mapStateToProps = (state)=> ({
    isAuthenticated: state.auth.isAdmin 
});

export default connect(mapStateToProps)(PrivateRoute)