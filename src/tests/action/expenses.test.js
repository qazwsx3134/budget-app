import { addExpense, editExpense, removeExpense } from "../../actions/expenses";


//REMOVE
test('should set up remove expense action object', () => {
    const action = removeExpense({id: '123abc'})
    expect(action).toEqual({ //object 不能用toBe 因為object跟array不能用===比較
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

//EDIT
test('should set up edit expense action object', () => {
    const action = editExpense('123abc',{ note : 'New note value'})
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates:{
            note : 'New note value',
        }
    })
})

//ADD
test('should set up add expense action object with provided value', () => {
    const expenseData = {
        description : 'rent',
        note : 'cool',
        amount : 10909,
        createdAt : 1000,
    }
    const action = addExpense(expenseData)
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense:{
            ...expenseData,
            id : expect.any(String) 
        }
    })
})

test('should set up add expense action object with default value', () => {
    
    const action = addExpense()
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense:{
        id : expect.any(String),
        description : '',
        note : '',
        amount : 0,
        createdAt : 0,
        }
    })
})
