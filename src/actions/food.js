

//Action
//component call action 然後 action return object 或 funtion(為了和DB溝通)
//component再拿object or funtion dispatch 到 reducer
//redux 再存 change

//ADD_Food

export const addFood = (food)=>({
    type: 'ADD_FOOD',
    food// 資料型態 {id: 由DB提供,description,note,amount,createdAt,}
});

// export const startAddFood = (commentData = {})=>{ //要設定redux thunk才能用這個
//     return (dispatch, getState) => { // get access to dispatch 所以是 ADD之後先執行這串 然後再dispatch action addFood
//         const uid = getState().auth.uid;
//         const {
//             description = '',
//             note= '',
//             amount= 0,
//             createdAt= 0,
//         } = commentData; //解構FoodData 前面是default value
//         const food = { description , note, amount, createdAt};

//         database.ref(`users/${uid}/comments`).push(food).then((ref)=>{
//             dispatch(addFood({
//                 id: ref.key,
//                 ...food
//             }))
//         });
        
//     };
// };

//REMOVE_Food

export const removeFood = ( //argu只需要提供ID 故
    id
)=>({
    type: 'REMOVE_FOOD',
    id
});

//EDIT_Food
export const editFood = (id, updates)=>({
    type: 'EDIT_FOOD' ,
    id,
    updates
})


//FETCH_Food
export const fetchFood = (food)=>({
    type: 'FETCH_FOOD',
    food
});
