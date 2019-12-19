
//Filters reducer
const filtersReducerDefaultState = {
    city: '',
    title:'',
    text: '',
    sortBy: 'like', //date or amount or like
    topic:'',
    label:'',
}

export default (state = filtersReducerDefaultState, action) =>{
    switch (action.type) {
        case 'SET_TITLE_FILTER':
            return{
                ...state,
                title : action.title
            };
        case 'SET_TOPIC_FILTER':
            return{
                ...state,
                topic : action.topic
            };
        case 'SET_LABEL_FILTER':
            return{
                ...state,
                label : action.label
            };
        case 'SET_CITY_FILTER':
            return{
                ...state,
                city : action.city
            };
        case 'SET_TEXT_FILTER':
            return{
                ...state,
                text : action.text
            };
        case 'SORT_BY_DATE':
            return{
                ...state,
                sortBy : 'date',
            }
        case 'SORT_BY_AMOUNT':
            return{
                ...state,
                sortBy : 'amount',
            }
        case 'SORT_BY_LIKE':
            return{
                ...state,
                sortBy : 'like',
            }
        default:
            return state ;

        
    };
    

};