import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import sonam from '../../images/sonam.jpg'
import logo from '../../images/logo.png';
import useStyles from './styles';
import { Link, useHistory,useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    // console.log(user.user.userName);
    // console.log(user);
    const dispatch=useDispatch();
    const location=useLocation();
   const history=useHistory();
   const apnaUser = user ? (user.user ? user.user : user.result) : null;

    const logout=()=>{
          dispatch({
            type:'LOGOUT'
          })
          history.push('/');
        //   setUser(null);
    }

    useEffect(()=>{
        const token=user?.token;
        if(token){
            const decodedToken=decode(token);
            if(decodedToken.exp*1000<new Date().getTime()){
                logout();
            }
        }
        const _id=apnaUser?._id;
      setUser(JSON.parse(localStorage.getItem('profile')));
    },[location])



    //useEffect(()=>{},)

    return (
        <AppBar position="static" color="inherit" className={classes.appBar}>
            <div className={classes.brandContainer}>
            <img src={logo} alt="network" height="60" className={classes.image} />
                <Typography variant='h4' component={Link} to="/" className={classes.heading}>CT</Typography>
                
            </div>
            <Toolbar className={classes.toolbar}>
                {
                    user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={apnaUser.name} src={apnaUser.image}>
                                {apnaUser.name.charAt(0)}
                            </Avatar>
                            <Typography className={classes.userName} variant="h6">
                                {apnaUser.name}
                            </Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>LogOut</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">
                            SignIn
                        </Button>

                    )
                }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
