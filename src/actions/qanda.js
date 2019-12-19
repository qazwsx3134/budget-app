
export const addQanda = (qanda)=>({
    type: 'ADD_QANDA',
    qanda// 資料型態 {id: 由DB提供,description,note,amount,createdAt,}
});


//REMOVE_EXPENSE

export const removeQanda = ( //argu只需要提供ID 故
    id
)=>({
    type: 'REMOVE_QANDA',
    id
});

//EDIT_EXPENSE
export const editQanda = (id, updates)=>({
    type: 'EDIT_QANDA' ,
    id,
    updates
})

//COMMENT_EXPENSE
export const commentQanda = (id, comment)=>({
    type: 'COMMENT_EXPENSE' ,
    id,
    comment
})

//FETCH_EXPENSES
export const fetchQanda = (qanda)=>({
    type: 'FETCH_QANDA',
    qanda
});

