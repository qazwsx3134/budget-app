import React from "react";
import { shallow } from "enzyme";
import { ExpensesSummary } from "../../components/ExpensesSummary";

test('should right render 1 expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={200} />)
    expect(wrapper).toMatchSnapshot();
});


test('should right render 2 expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={2} expensesTotal={3300} />)
    expect(wrapper).toMatchSnapshot();
});