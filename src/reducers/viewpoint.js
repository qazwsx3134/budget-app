
const viewpointReducerDefaultState = []


export default (state = viewpointReducerDefaultState, action) =>{
    switch (action.type) {
        case 'ADD_VIEWPOINT':
            return [
                ...state,
                action.viewpoint
                ]

        case 'REMOVE_VIEWPOINT':
            return state.filter(( viewpoint )=> viewpoint._id !== action.id );

        case 'EDIT_VIEWPOINT':
            return state.map((viewpoint) =>{
                if (viewpoint.id === action.id) {

                    
                    return{
                        ...viewpoint,
                        ...action.updates
                    }
                }else{
                    return viewpoint
                };
            });
        
        case 'FETCH_VIEWPOINT': //從DB抓DATA之後 return 資料回去
            return action.viewpoint;
        default:
            return state ;
    }
};

