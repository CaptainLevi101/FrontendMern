import React,{useState,useEffect} from 'react'
import useStyles from './styles';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch,useSelector} from 'react-redux';
import { createPost,updatePost } from '../../actions/posts';
import ChipInput from 'material-ui-chip-input';
import {useHistory} from 'react-router-dom';
const Form = ({currentId,setCurrentId}) => {
  const classes = useStyles();
  const dispatch=useDispatch();
  const post=useSelector((state)=>currentId?state.posts.find((p)=>p._id==currentId):null);
   const history=useHistory();
  //get the current id of post we are on
  const [postdata,setPostData]=useState({
    title:'',
    message:'',
    tags:'',
    SelectedFile:''
    });
    useEffect(()=>{
      if(post)setPostData(post);
  },[post])
    // console.log(postdata.selectedFile);
const user=JSON.parse(localStorage.getItem('profile'));

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(currentId){
      dispatch(updatePost(currentId,{...postdata,name:user?.result?.name}));

    }else{
      dispatch(createPost({...postdata,name:user?.result?.name}));
    }
    clear();
    // console.log(postdata.SelectedFile);
   
  }

  const clear=()=>{
    setCurrentId(null);
    setPostData({
      title:'',
      message:'',
      tags:'',
      SelectedFile:''
      });


  }
  // if(!user?.result?.name){
  //   return (
  //     <Paper className={classes.paper}>
  //       <Typography variant="h6" align ="center">
  //         Please Sign In To see the content of this site
  //       </Typography>
  //     </Paper>
  //   )
  // }
  return (
  <Paper className={classes.paper}>
    <form autoComplete='off' noValidate className={` ${classes.root} ${classes.form}` } onSubmit={handleSubmit}>
      <Typography variant='h6'>
        {currentId ?'Editing ':'Creating '}
        a Memory
      </Typography>
          <TextField
       name="title" 
       variant='outlined'
        label='title'
         fullWidth
         value={postdata.title}
         onChange={(e)=>{
          setPostData({
            ...postdata,
            title: e.target.value
          })
         }}/>
          <TextField
       name="message" 
       variant='outlined'
        label='message'
         fullWidth
         value={postdata.message}
         onChange={(e)=>{
          setPostData({
            ...postdata,
            message: e.target.value
          })
         }}/>
          <TextField
       name="tags" 
       variant='outlined'
        label='tags'
         fullWidth
         value={postdata.tags}
         onChange={(e)=>{
          setPostData({
            ...postdata,
            tags: e.target.value
          })
         }}/>


        <div className={classes.fileInput}>
        <FileBase type="file"
        multiple={false}
        onDone={
          ({base64})=>
          setPostData({
            ...postdata,
            SelectedFile: base64
          })
        }/>
        </div>
        <Button className={classes.buttonSubmit} variant='contained' color="primary" size="large" type='submit' fullWidth margin="dense">submit</Button>
        <Button  variant='contained' color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
    </form>
  </Paper>
  )
}

export default Form;
