import {Route,Routes} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Login from './AuthorizationPages/Login';
import SignIn from './AuthorizationPages/SignIn';
import LandingPage from './MainPages/LandingPage'
import DashBoard from './MainPages/Dashboard';
import RegisteredPage from './AuthorizationPages/RegisteredPage';
import BlogPage from './MainPages/BlogPage';
import ProfilePage from './MainPages/ProfilePage'
import MainPage from './MainPages/MainPage';
import SearchPage from './MainPages/SearchPage';
import UpdateProfile from './MainPages/UpdateProfile';


import React from 'react';
function App() {
  const [log,setLog] = useState(false);
   
  const [user,setUser] = useState({
    username: '',
    email: '',
    isLogged : false
  });
  useEffect(()=>{
    const userDetails_JSON = localStorage.getItem("user");
    if(userDetails_JSON){
        let userDetails = JSON.parse(userDetails_JSON);
        setUser(userDetails);
    }
  },[log]);
  return (
    <div className="App">
        <Routes>
        <Route path = '/' exact element = {<LandingPage/>}/>
        <Route path = '/Login'  exact element = {<Login 
        logged = {user} setLogged = {setUser} log = {setLog}/>}/>
        <Route path = '/Signup'  exact element = {<SignIn/>}/>
        <Route path = '/Registered' exact element = {<RegisteredPage/>}/>
        <Route path = {`/DashBoard`} exact element = {<DashBoard user = {user}/>}/>
        <Route path = {'/Blog'} exact element = {<BlogPage/>}/>
        <Route path = {'/Profile'} exact element = {<ProfilePage/>}/>
        <Route path = {'/Blogs'} exact element = {<MainPage/>}/>
        <Route path = {'/Search'} exact element = {<SearchPage/>}/>
        <Route path = {'/Update'} exact element = {<UpdateProfile/>}/>
        </Routes>
    </div>
  );
}

export default App;
