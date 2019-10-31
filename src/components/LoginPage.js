import React from 'react';
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export const LoginPage = ({ startLogin }) =>( //把props裡面的東西解構
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Expensify</h1>
            <p>USE ME</p>
            <button 
                onClick={startLogin}
                className="button">Login with Google</button>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) =>({
    startLogin: ()=> dispatch(startLogin()) //把dispatch(startLogin()) 綁到props裡面
})

export default connect(undefined, mapDispatchToProps)(LoginPage)
