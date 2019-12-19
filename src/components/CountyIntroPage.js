import React from 'react';
import { connect } from "react-redux";
import HeaderPage from "./HeaderPage";



export class CountyIntroPage extends React.Component{
 
 render()
  {
    return (
    <div>
      <HeaderPage />
      <div className="content-container">
      </div>
      
    </div>
  )}
}




const mapStateToProps = (state) =>{
  return {
    viewPoints: state.viewpoint
  }
};

export default connect(mapStateToProps)(CountyIntroPage)
