import React, { useState } from 'react'
import { Avatar, Button, Container, Grid, Icon, Paper, TextField, Typography } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {signup,signin} from '../../actions/auth';
const Auth = () => {
    const classes = useStyles();
    const state = null;
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword:''
    });
    const history = useHistory();
    const handleSubmit = (e) => {
      e.preventDefault();
      if(isSignUp){
        dispatch(signup(formData, history));
      }else{
        dispatch(signin(formData, history));
      }
    }
    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleShowPassword = () => {
        setShowPassword((prevState) =>
            !prevState)
    }
    const switchMode = () => {
        setIsSignUp((prevState) => !prevState);
    }
    const googleSuccess = async (res) => {
        
        
        const decoded = jwt_decode(res.credential);
        console.log(decoded);
        const { name, picture, sub } = decoded;
        const user = {
            _id: sub,
            _type: 'user',
            name:name,
            image: picture
        }

        // console.log(name);
        // console.log(picture);
        // console.log(sub);
        // console.log(decoded);
        try {
            dispatch({
                type: 'AUTH',
                data: { user }
            })
            history.push('/');
        } catch (err) {
            console.log(err);
        }

    }
    const googleFailure = () => {
        console.log("Google Sign In was Unsuccessful");

    }
    return (
        <Container component="main" maxwidth="xs" className={classes.container}>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    {isSignUp ? 'SignUp' : 'SignIn'}
                </Typography>



                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp &&
                            (<>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus seventy />
                                <Input name='lastName' label="Last Name" handleChange={handleChange} seventy />
                            </>)}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" seventy />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} seventy />
                        {isSignUp && <Input name="confirmPassword" handleChange={handleChange} label="Repeat Password" seventy />}
                    </Grid>
                    {/* <GoogleLogin
                        // clientId="709659716612-d0eh8dnk8oijfrpnq6cp1k6u0g4ls3pe.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color='primary'
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >
                                Google Sign IN
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    /> */}
                    <Button type="submit" variant="contained" color="primary" className={classes.submit} fullWidth>
                        {isSignUp ? "SignUp" : "SignIn"}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? "Already have an account? SignIN" : "Don't have an account? SignUp"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
