import axios from 'axios';

//User 相關 api

axios.defaults.withCredentials = true


const userRequest = axios.create({
    baseURL: '/api/users'
  });


//User相關的api method

export const apiUserSignup = data => userRequest.post('', data);

export const apiUserGetinfo = () => userRequest.get('');

export const apiUserLogin = data => userRequest.post('/login', data);

export const apiUserLogout = () => userRequest.get('/logout');

//place api

const placeRequest = axios.create({
  baseURL: '/api/place',
  withCredentials: true
});

export const apiFilteredGetPlace = data => placeRequest.get(`/filter/${data}`)

export const apiGetPlace = data => placeRequest.get('');

export const apiDeletePlace = _id => placeRequest.delete(`/${_id}`)

export const apiPostPlace = data => placeRequest.post('',data)

export const apiUpdatePlace = (data,_id) => placeRequest.patch(`/${_id}`,data)

export const apiPushCommentPlace = (data,_id) =>placeRequest.patch(`/comment/${_id}`,data)

export const apiLikePlace = (data,_id) =>placeRequest.patch(`/comment/like/${_id}`,data)

export const apiDislikePlace = (data,_id) =>placeRequest.patch(`/comment/dislike/${_id}`,data)

//food api

const foodRequest = axios.create({
  baseURL: '/api/food',
  withCredentials: true
});

export const apiFilteredGetFood = data => foodRequest.get(`/filter/${data}`)

export const apiDeleteFood = _id => foodRequest.delete(`/${_id}`)

export const apiGetFood = data => foodRequest.get('');

export const apiPostFood = data => foodRequest.post('',data)

export const apiUpdateFood = (data,_id) => foodRequest.patch(`/${_id}`,data)

export const apiPushCommentFood = (data,_id) =>foodRequest.patch(`/comment/${_id}`,data)

export const apiLikeFood = (data,_id) =>foodRequest.patch(`/comment/like/${_id}`,data)

export const apiDislikeFood = (data,_id) =>foodRequest.patch(`/comment/dislike/${_id}`,data)


//event api

const eventRequest = axios.create({
  baseURL: '/api/event',
  withCredentials: true
});
export const apiUpdateEvent = (data,_id) => eventRequest.patch(`/${_id}`,data)

export const apiFilteredGetEvent = data => eventRequest.get(`/filter/${data}`)

export const apiDeleteEvent = _id => eventRequest.delete(`/${_id}`)

export const apiPostEvent = data => eventRequest.post(``,data)



//qanda api

const qandaRequest = axios.create({
  baseURL: '/api/qanda',
  withCredentials: true
});

export const apiUpdateQanda = (data,_id) => qandaRequest.patch(`/${_id}`,data)

export const apiFilteredGetQanda = data => qandaRequest.get(`/filter/${data}`)

export const apiDeleteQanda = _id => qandaRequest.delete(`/${_id}`)

export const apiPostQanda =  data => qandaRequest.post(``,data)

export const apiPushCommentQanda = (data,_id) =>qandaRequest.patch(`/comment/${_id}`,data)

export const apiLikeQanda = (data,_id) =>qandaRequest.patch(`/comment/like/${_id}`,data)

export const apiDislikeQanda = (data,_id) =>qandaRequest.patch(`/comment/dislike/${_id}`,data)

//create api

const createRequest = axios.create({
  baseURL: '/api/upload',
  withCredentials: true
});

export const apiUploadSingle = (data)=> createRequest.post('/single',data)

export const apiUploadMulti = (data)=> createRequest.post('/multi',data)

//delete api

const deleteRequest = axios.create({
  baseURL: '/api/delete',
  withCredentials: true
});

export const apiDeleteSingle = (data)=> deleteRequest.post('/single',data)