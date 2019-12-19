import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import Button from '@material-ui/core/Button';
import { apiUserLogout } from "../api/api";
import { useDispatch } from 'react-redux'


export const Header = (props) => {
  const dispatch = useDispatch()

  async function onlogout() {
    // You can await here
    const logoutRes = await apiUserLogout()
    

    dispatch(logout())
    
    console.log('log out');
    
    // ...
  }
  
  return(
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/" >
          <h2>Wayfarer</h2>
        </Link>


        {props.auth._id 
        ?
        <div>
        <Button size="small" color="secondary">Welcome Back , {props.auth.firstName} </Button>
        <Link className="header__title" to="/" >
        <Button color="primary" variant="outlined" onClick={onlogout}>
            LogOut
          </Button>
        </Link>
        
        </div>
        :
        
        <Link className="header__title" to="/login" >
        <Button color="primary" variant="outlined">
            Login
          </Button>
        </Link>}


        {props.auth.isAdmin
        ?
        <Link  className="header__title" to="/create" >
        <Button color="primary" variant="outlined">
            Create
          </Button>
        </Link>
        : null}
        

      </div> 
    </div>
  </header>
)};

const mapStateToProps = (state)=>({ //把action 的dispatch 和header map再一起
  auth: state.auth
});

export default connect(mapStateToProps)(Header);
