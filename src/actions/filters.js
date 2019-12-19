//SET_TITLE_FILTER

export const setTitleFilter = (title='')=>({
    type: 'SET_TITLE_FILTER',
    title,
})

//SET_TOPIC_FILTER

export const setTopicFilter = (topic='')=>({
    type: 'SET_TOPIC_FILTER',
    topic,
})

//SET_LABEL_FILTER

export const setLabelFilter = (label='')=>({
    type: 'SET_LABEL_FILTER',
    label,
})
//SET_CITY_FILTER

export const setCityFilter = (city='')=>({
    type: 'SET_CITY_FILTER',
    city,
})

//SET_TEXT_FILTER

export const setTextFilter = (text='')=>({
    type: 'SET_TEXT_FILTER',
    text,
})
//SORT_BY_DATE

export const sortByDate = ()=>({
    type:'SORT_BY_DATE',
})
//SORT_BY_AMOUNT

export const sortByAmount = ()=>({
    type:'SORT_BY_AMOUNT',
})


export const sortByLike =()=>({
    type:'SORT_BY_LIKE',
})
