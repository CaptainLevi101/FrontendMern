import React from 'react';
import useStyles from './styles';
import { Container } from '@material-ui/core'
import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min.js';
import Auth from './components/Auth/Auth.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails from './components/PostDetails/PostDetails.jsx';
const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const classes = useStyles();
  return (
    <GoogleOAuthProvider clientId="709659716612-d0eh8dnk8oijfrpnq6cp1k6u0g4ls3pe.apps.googleusercontent.com">
      <BrowserRouter>
        <Container className={classes.mainContainer} direction="column-reverse" maxWidth="xl">
          <Navbar />
          <Switch>
            <Route path='/' exact component={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/posts/:id" exact component={PostDetails} />
            <Route path='/auth' exact component={() => (!user ?<Auth/>:<Redirect to ="/posts/"/>)} />
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>

  )
}
export default App;