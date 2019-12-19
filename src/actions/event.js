
//Action
//component call action 然後 action return object 或 funtion(為了和DB溝通)
//component再拿object or funtion dispatch 到 reducer
//redux 再存 change

//ADD_Event

export const addEvent = (event)=>({
    type: 'ADD_EVENT',
    event// 資料型態 {id: 由DB提供,description,note,amount,createdAt,}
});

// export const startAddEvent = (commentData = {})=>{ //要設定redux thunk才能用這個
//     return (dispatch, getState) => { // get access to dispatch 所以是 ADD之後先執行這串 然後再dispatch action addEvent
//         const uid = getState().auth.uid;
//         const {
//             description = '',
//             note= '',
//             amount= 0,
//             createdAt= 0,
//         } = commentData; //解構EventData 前面是default value
//         const event = { description , note, amount, createdAt};

//         database.ref(`users/${uid}/comments`).push(event).then((ref)=>{
//             dispatch(addEvent({
//                 id: ref.key,
//                 ...event
//             }))
//         });
        
//     };
// };

//REMOVE_Event

export const removeEvent = ( //argu只需要提供ID 故
    id 
)=>({
    type: 'REMOVE_EVENT',
    id
});


//EDIT_Event
export const editEvent = (id, updates)=>({
    type: 'EDIT_EVENT' ,
    id,
    updates
})

//FETCH_Event
export const fetchEvent = (event)=>({
    type: 'FETCH_EVENT',
    event
});
