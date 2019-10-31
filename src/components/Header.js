import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";

export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard" >
          <h1>Expensify</h1>
        </Link>
        <button 
          onClick={startLogout}
          className="button-link"
        >Logout</button>   
      </div> 
    </div>
  </header>
);

const mapDispatchToProps = (dispatch)=>({ //把action 的dispatch 和header map再一起
  startLogout: ()=> dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
