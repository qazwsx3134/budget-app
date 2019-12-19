

//Action
//component call action 然後 action return object 或 funtion(為了和DB溝通)
//component再拿object or funtion dispatch 到 reducer
//redux 再存 change

//ADD_Comment

export const addComment = (comment)=>({
    type: 'ADD_COMMENT',
    comment// 資料型態 {id: 由DB提供,description,note,amount,createdAt,}
});

// export const startAddComment = (commentData = {})=>{ //要設定redux thunk才能用這個
//     return (dispatch, getState) => { // get access to dispatch 所以是 ADD之後先執行這串 然後再dispatch action addComment
//         const uid = getState().auth.uid;
//         const {
//             description = '',
//             note= '',
//             amount= 0,
//             createdAt= 0,
//         } = commentData; //解構CommentData 前面是default value
//         const comment = { description , note, amount, createdAt};

//         database.ref(`users/${uid}/comments`).push(comment).then((ref)=>{
//             dispatch(addComment({
//                 id: ref.key,
//                 ...comment
//             }))
//         });
        
//     };
// };

//REMOVE_Comment

export const removeComment = ( //argu只需要提供ID 故
    {id} = {}
)=>({
    type: 'REMOVE_COMMENT',
    id
});

//EDIT_Comment
export const editComment = (id, updates)=>({
    type: 'EDIT_COMMENT' ,
    id,
    updates
})


//FETCH_CommentS
export const fetchComments = (Comments)=>({
    type: 'FETCH_COMMENT',
    Comments
});
