import React from 'react';
import ExpenseForm from "./ExpenseForm";
import { connect } from "react-redux";
import { addExpense } from "../actions/expenses";


const AddExpensePage = (props) => ( //必須把props丟進來 因為connect把dispatch 整合到props裡
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm 
      onSubmit={(expense)=>{ //把這個fuction 作為props傳下去
        props.dispatch(addExpense(expense))//expense是ExpenseForm 傳上來的object
        props.history.push('/')//導向到path dashboard
      }}
    />
  </div>
);

export default connect()(AddExpensePage)
