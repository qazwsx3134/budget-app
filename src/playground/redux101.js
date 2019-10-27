import { createStore } from "redux";

//Action generators 
const incrementCount = ({ incrementBy = 1})=>( { //default要設定 object 不然 條件那邊會變undefined
    type: 'INCREMENT',
    incrementBy: incrementBy
    
});

const decrementCount =({decrementBy = 1})=>({
    type: 'DECREMENT',
    decrementBy: decrementBy,
})

const resetCount =()=>({
    type: 'RESET',
})

const setCount =({count })=>({
    type: 'SET',
    count: count,
})

//Reducers
//Reducers are pure functions
//Never change state or action

const countReducer = (state = { count :0}, action)=>{
    
    switch(action.type){
        case 'INCREMENT' :
            return {
                count: state.count + action.incrementBy 
            };
        case 'DECREMENT' :
                 return {
                count: state.count - action.decrementBy 
            };
        case 'RESET' :
            return {
                count: 0
            };
        case 'SET' :
            return {
                count: action.count
            }
        default:
            return state;
    } 
};

const store = createStore()
const unsubscribe = store.subscribe(()=>{
    console.log(store.getState());
})


//incre, decre ,reset
store.dispatch(incrementCount({incrementBy: 56}));


store.dispatch(decrementCount({decrementBy: 10}));


store.dispatch(resetCount());

store.dispatch(setCount({count : 10}));
