import uuid from "uuid";
import database from "../firebase/firebase";

//Action
//component call action 然後 action return object 或 funtion(為了和DB溝通)
//component再拿object or funtion dispatch 到 reducer
//redux 再存 change

//ADD_EXPENSE

export const addExpense = (expense)=>({
    type: 'ADD_EXPENSE',
    expense// 資料型態 {id: 由DB提供,description,note,amount,createdAt,}
});

export const startAddExpense = (expenseData = {})=>{ //要設定redux thunk才能用這個
    return (dispatch) => { // get access to dispatch 所以是 ADD之後先執行這串 然後再dispatch action addExpense
        const {
            description = '',
            note= '',
            amount= 0,
            createdAt= 0,
        } = expenseData; //解構expenseData 前面是default value
        const expense = { description , note, amount, createdAt};

        database.ref('expenses').push(expense).then((ref)=>{
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }))
        });
        
    };
};

//REMOVE_EXPENSE

export const removeExpense = ( //argu只需要提供ID 故
    {id} = {}
)=>({
    type: 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpense = ({ id}= { })=>{  
    return (dispatch)=>{
        return database.ref(`expenses/${id}`).remove().then(()=>{
            dispatch(removeExpense({id}));
        })
    }
    
}
//EDIT_EXPENSE
export const editExpense = (id, updates)=>({
    type: 'EDIT_EXPENSE' ,
    id,
    updates
})

export const startEditExpense = (id, updates) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).update(updates).then(()=>{
            dispatch(editExpense(id,updates))
        })
    }
}

//FETCH_EXPENSES
export const fetchExpenses = (expenses)=>({
    type: 'FETCH_EXPENSES',
    expenses
});

export const startFetchExpenses= ()=>{
    return (dispatch) => {
        return database.ref('expenses') //要確認return promise
        .once('value')
        .then((snapshot)=>{ //把snapshot 是抓到的expenses
            const expenses = [];

            snapshot.forEach((childSnapshot)=>{
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(fetchExpenses(expenses))
        })
    }

};

//1.Fetch all expense data once
//2.parse that data into an array
//3.dsipatch FETCH_EXPENSES

// database.ref('expenses')
// .once('value')
// .then((snapshot)=>{
//     const expenses = [];

//     snapshot.forEach((childSnapshot)=>{
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });

//     console.log(expenses);
    
// });