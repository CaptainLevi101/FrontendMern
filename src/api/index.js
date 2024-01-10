import axios from 'axios';
const API=axios.create({baseURL:'https://mernback-xzoc.onrender.com'});
API.interceptors.request.use((req)=>{
   if(localStorage.getItem('profile')){
      // console.log(localStorage.getItem('profile'));
    req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
   //  console.log(JSON.parse(localStorage.getItem('profile')).token);
   }
   return req;
})

export const fetchPostsBySearch=(searchQuery)=>API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const fetchPosts = (page) =>API.get(`/posts?page=${page}`);
export const createPost = (newPost) =>API.post('/posts', newPost);
export const updatePost = (id,updatePost) =>API.patch(`/posts/${id}`, updatePost);
export const deletePost=(id)=>API.delete(`/posts/${id}`);
export const likePost=(id)=>API.patch(`/posts/${id}/likePost`);

export const signin=(formData)=>API.post('/user/signin',formData);
export const signup=(formData)=>API.post('/user/signup',formData);