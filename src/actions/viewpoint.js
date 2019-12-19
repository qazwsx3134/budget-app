
export const addViewpoint = (viewpoint)=>({
    type: 'ADD_VIEWPOINT',
    viewpoint// 資料型態 {id: 由DB提供,description,note,amount,createdAt,}
});

//REMOVE_EXPENSE

export const removeViewpoint = ( //argu只需要提供ID 故
    id 
)=>({
    type: 'REMOVE_VIEWPOINT',
    id
});

//EDIT_EXPENSE
export const editViewpoint = (id, updates)=>({
    type: 'EDIT_VIEWPOINT' ,
    id,
    updates
})


//FETCH_EXPENSES
export const fetchViewpoints = (viewpoint)=>({
    type: 'FETCH_VIEWPOINT',
    viewpoint
});
