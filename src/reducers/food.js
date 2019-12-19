
//foods Reducer

const foodsReducerDefaultState = []

export default (state = foodsReducerDefaultState, action) =>{
    switch (action.type) {
        case 'ADD_FOOD':
            return [
                ...state,
                action.food
                ]

        case 'REMOVE_FOOD':
            return state.filter(( food )=> food._id !== action.id );

        case 'EDIT_FOOD':
            return state.map((food) =>{
                if (food.id === action.id) {

                    
                    return{
                        ...food,
                        ...action.updates
                    }
                }else{
                    return food
                };
            });
        
        case 'FETCH_FOOD': //從DB抓DATA之後 return 資料回去
            return action.food;
        default:
            return state ;
    }
};

