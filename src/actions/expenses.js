import uuid from "uuid";

//Action

//ADD_EXPENSE

export const addExpense = (
    {
        description = '',
        note= '',
        amount= 0,
        createdAt= 0,
    } = {}
)=>({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt,
    }
});
//REMOVE_EXPENSE

export const removeExpense = ( //argu只需要提供ID 故
    {id} = {}
)=>({
    type: 'REMOVE_EXPENSE',
    id
});
//EDIT_EXPENSE
export const editExpense = (id, updates)=>({
    type: 'EDIT_EXPENSE' ,
    id,
    updates
})
