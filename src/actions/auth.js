import {AUTH} from '../constants/actionTypes';
import * as api from '../api/index.js';
import { useDispatch } from 'react-redux';
// const dispatch = useDispatch();

export const signin=(formData,history)=>async(dispatch)=>{
    try{
       const {data}=await api.signin(formData);
       dispatch({
        type:AUTH,
        data
       })
        history.push('/');

    }catch(err){
        console.log(err);

    }
}
export const signup=(formData,history)=>async(dispatch)=>{
    try{
        const {data}=await api.signup(formData);
        console.log(data);
        dispatch({
            type:AUTH,
            data
        })

        //signUp the user
        history.push('/');

    }catch(err){
        console.log(err);

    }

}