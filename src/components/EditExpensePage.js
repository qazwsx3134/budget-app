import React from 'react';
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";

const EditExpensePage = (props) => {
  return (
    <div>
      <ExpenseForm
        expense={props.expense} //把props傳下去給expenseForm
        onSubmit={(expense)=>{
          props.dispatch(startEditExpense(props.expense.id, expense))
          props.history.push('/')
        }}
      />
      <button onClick={()=>{
        props.dispatch(startRemoveExpense({id: props.expense.id})); //格式很重要
        props.history.push('/')
    }}>Remove</button>
    </div>
  );
};

const mapStateToProps = (state, props)=>{
  return {
    expense: state.expenses.find((expense)=>expense.id === props.match.params.id)
  }
};

export default connect(mapStateToProps)(EditExpensePage);
