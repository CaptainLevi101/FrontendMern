import {Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './styles';
import moment from 'moment';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {useDispatch} from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
const Post = ({post,setCurrentId}) => {
  // console.log(post.SelectedFile);
  // console.log(post);
  const dispatch=useDispatch();
  const mj=post.tags.split(' ');
 const classes=useStyles();
 const user=JSON.parse(localStorage.getItem('profile'));
 const Likes = () => {
  // console.log(post);
  const likedByUser = post.likes.find(
    like =>
      like === (user?.result?.googleId || user?.result?._id)
  );

  if (post.likes.length > 0) {
    return likedByUser ? (
      <>
        <ThumbUpAltIcon fontSize="small" />&nbsp;
        {post.likes.length > 2
          ? ` You and ${post.likes.length - 1} others`
          : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
      </>
    ) : (
      <>
        <ThumbUpAltOutlined fontSize="small" />&nbsp;
        {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
      </>
    );
  }

  return <><ThumbUpAltOutlined fontSize="small" />&nbsp;</>;
};

//console.log(post.creator);
  return (
   <Card className={classes.card} raised elevation={6}>
      {post.SelectedFile && (
        // <img src={post.SelectedFile}/>
  <CardMedia className={classes.media} image={post.SelectedFile} title={post.title} />
)}

        <div className={classes.overlay}>
          <Typography variant="h6">
            {post.name}
          </Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div> 
        {(user?.result?.googleId===post.creator || user?.result?._id==post?.creator) &&

        (<div className={classes.overlay2}>
          <Button style={{color:'black'}}
          size="small"
           onClick={()=>setCurrentId(post._id)}>
            <MoreHorizIcon fontSize="medium"/>
          </Button> 
        </div>)
}
          <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
  {mj.map((tag) => `#${tag} `)}
</Typography>
     
          </div>
          <Typography className={classes.title} variant='h5' gutterBottom>
            {post.title}
            </Typography>
          <CardContent>
          <Typography  variant='body2' color="textSecondary" component="p">
            {post.message}
          </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>

{/*    //////////         Like Post       ////////           */}
  <Button size="small" color="primary" disabled={!user?.result}  onClick={() => dispatch(likePost(post._id))}>
     <Likes/>
  </Button>

{/*    ////               Delete Post /////////////////       */}
{(user?.result?.googleId===post.creator || user?.result?._id==post?.creator)
 &&
  (<Button size="small" color="primary" onClick={() =>dispatch(deletePost(post._id))}>
  &nbsp;
    <DeleteIcon fontSize="small" />
    <Typography variant="body2">
     Delete
    </Typography>
  </Button>)
}
</CardActions>

    
   </Card>
  )
}

export default Post
