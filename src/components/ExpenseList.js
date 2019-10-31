import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpensesListItem";
import selectExpenses from "../selectors/expenses";

export const ExpenseList = (props)=> (
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>
            <div className="show-for-desktop">Expense</div>
            <div className="show-for-desktop">Amount</div>
        </div>
        <div className="list-body">
        {
        props.expenses.length === 0 ? (
            <div className="list-item list-item__message">
                <span>No expenses</span>
            </div>
      ) : (
          props.expenses.map((expense) => {
            return <ExpenseListItem key={expense.id} {...expense} />;
          })
        )
    }
        </div>
    </div>
);

const mapStateToProps = (state)=>{
    return {
        expenses: selectExpenses(state.expenses,state.filters) //用selector搭配filter去把state map 到 props
    };
}

export default connect(mapStateToProps)(ExpenseList); //前面放用arrow func return的object(從物件裡挑的) 後面放要連結的component 然後對於後面的component就能用props 擷取資料

