
//comments Reducer

const commentsReducerDefaultState = []

export default (state = commentsReducerDefaultState, action) =>{
    switch (action.type) {
        case 'ADD_COMMENT':
            return [
                ...state,
                action.comment
                ]

        case 'REMOVE_COMMENT':
            return state.filter(({ id })=> id !== action.id );

        case 'EDIT_COMMENT':
            return state.map((comment) =>{
                if (comment.id === action.id) {

                    
                    return{
                        ...comment,
                        ...action.updates
                    }
                }else{
                    return comment
                };
            });
        
        case 'FETCH_COMMENT': //從DB抓DATA之後 return 資料回去
            return action.comment;
        default:
            return state ;
    }
};

