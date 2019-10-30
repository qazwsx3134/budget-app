import React from 'react';
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export const LoginPage = ({ startLogin }) =>( //把props裡面的東西解構
    <div>
        <button onClick={startLogin}>Login</button>
    </div>
);

const mapDispatchToProps = (dispatch) =>({
    startLogin: ()=> dispatch(startLogin()) //把dispatch(startLogin()) 綁到props裡面
})

export default connect(undefined, mapDispatchToProps)(LoginPage)
