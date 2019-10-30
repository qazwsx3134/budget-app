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
          <h1>Add Expense</h1>
          <ExpenseForm 
            onSubmit={this.onSubmit}
          />
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
