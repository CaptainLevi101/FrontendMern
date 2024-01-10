import * as api from '../api';
import { CREATE, DELETE, FETCH_ALL, UPDATE,FETCH_BY_SEARCH } from '../constants/actionTypes';
export const getPosts = (page) => async (dispatch) => {
    try {
        const {data} = await api.fetchPosts(page);
        // console.log(data);
            dispatch({
                type: FETCH_ALL,
                payload: data
            });
        
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        // Dispatch an error action or handle the error situation accordingly
    }
};
export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try {
       
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({
            type: FETCH_BY_SEARCH,
            payload:data
        });
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}


export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({
            type: CREATE,
            payload: data
        });
        // You might dispatch a success action or perform other operations here.
    } catch (err) {
        console.error('Error creating post:', err.message);
        // You might dispatch an error action here if needed:
        // dispatch({ type: 'CREATE_ERROR', payload: err.message });
    }
}
export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({
            type: UPDATE,
            payload: data
        })
    } catch (err) {
        console.log(err.message);
    }
}
export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({
            type: DELETE,
            payload: id
        })
    }
    catch (err) {
        console.log(err);
    }
}
export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({
            type: UPDATE,
            payload: data
        })
    } catch (err) {
        console.log(err);
    }
}