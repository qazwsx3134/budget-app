import React from 'react';
import ExpenseForm from "./ExpenseForm";
import { connect } from "react-redux";
import { startAddExpense } from "../actions/expenses";

export class AddExpensePage extends React.Component {
  onSubmit = (expense)=>{ //把這個fuction 作為props傳下去

    this.props.startAddExpense(expense)//expense是ExpenseForm 傳上來的object
    this.props.history.push('/')//導向到path dashboard
  };
  render(){
    return (
        <div>
          <div className="page-header">
            <div className="content-container">
              <h1 className="page-header__title">Add Expense</h1>
            </div>
          </div>
          <div className="content-container">
            <ExpenseForm 
              onSubmit={this.onSubmit}
            />
          </div>
          
        </div>
    )
  }
}


const mapDispatchToProps = (dispatch) =>{
  return {
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
  }
};

export default connect(undefined, mapDispatchToProps)(AddExpensePage)
