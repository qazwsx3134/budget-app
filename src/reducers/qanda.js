
const qandaReducerDefaultState = []


export default (state = qandaReducerDefaultState, action) =>{
    switch (action.type) {
        case 'ADD_QANDA':
            return [
                ...state,
                action.qanda
                ]

        case 'REMOVE_QANDA':
            return state.filter((qanda)=> qanda._id !== action.id );

        case 'EDIT_QANDA':
            return state.map((qanda) =>{
                if (qanda._id === action.id) {

                    
                    return{
                        ...qanda,
                        ...action.updates
                    }
                }else{
                    return qanda
                };
            });
        case 'COMMENT_QANDA':
            return state.map((qanda) =>{
                if (qanda._id === action.id) {

                    
                    return{

                        comment: qanda.comment.push(action.comment),
                        ...qanda
                        
                    }
                }else{
                    return qanda
                };
            });
        
        case 'FETCH_QANDA': //從DB抓DATA之後 return 資料回去
            return action.qanda;
        default:
            return state ;
    }
};

