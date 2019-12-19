
const eventReducerDefaultState = []


export default (state = eventReducerDefaultState, action) =>{
    switch (action.type) {
        case 'ADD_EVENT':
            return [
                ...state,
                action.event
                ]

        case 'REMOVE_EVENT':
            return state.filter(( event )=> event._id !== action.id );

        case 'EDIT_EVENT':
            return state.map((event) =>{
                if (event.id === action.id) {

                    
                    return{
                        ...event,
                        ...action.updates
                    }
                }else{
                    return event
                };
            });
        
        case 'FETCH_EVENT': //從DB抓DATA之後 return 資料回去
            return action.event;
        default:
            return state ;
    }
};

