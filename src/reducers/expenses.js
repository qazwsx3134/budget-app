
//Expenses Reducer

const expensesReducerDefaultState = []

export default (state = expensesReducerDefaultState, action) =>{
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
                ]

        case 'REMOVE_EXPENSE':
            return state.filter(({ id })=> id !== action.id );

        case 'EDIT_EXPENSE':
            return state.map((expense) =>{
                if (expense.id === action.id) {

                    
                    return{
                        ...expense,
                        ...action.updates
                    }
                }else{
                    return expense
                };
            });
        
        case 'FETCH_EXPENSES': //從DB抓DATA之後 return 資料回去
            return action.expenses;
        default:
            return state ;
    }
};

