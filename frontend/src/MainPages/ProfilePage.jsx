import React from "react";
import UserNavbar from "../Components/UserNavbar";
import { Card, Input, Button} from "@material-tailwind/react";
import { useState, useRef, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import BlogCard  from "../Components/BlogCard";
import Footer from "../Components/Footer";
import VerifyUser from "../authPage/VerifyUserHook";
import {useCookies} from 'react-cookie';
import { jwtDecode } from "jwt-decode";
import { FaRegUser } from "react-icons/fa";
export default function ProfilePage(props){
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const username = query.get('username');
    const [refreshCount, setRefreshCount] = useState(0);
    const [cookie] = useCookies();
    const [profileData,setProfileData] = useState({})

    const [data, setData] = useState([]);

   VerifyUser(); 
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(`http://localhost:5000/post-blog?author=${username}`, {
            method: 'GET',
          });
          if (res.status === 200) {
            const blog_json = await res.json();
            const blogs = blog_json.blogs;
            setData(blogs);         
          } 
          else
            console.error('Error fetching data');
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };
      fetchData(); 
    }, [refreshCount]);
    

    useEffect(()=>{
        const getId_and_compare = async ()=>{
            const token = jwtDecode(cookie.jwt);
            if(!token) navigate('/Login');
            const id = token.id;
            const res = await fetch(`http://localhost:5000/user?username=${encodeURIComponent(username)}`,{
                method : 'POST',
            });
            const result = await res.json();
            if(!result.status) navigate(-1);
            setProfileData({
                username: result.username,
                date: result.date,
                id: result.id
            });
            console.log(profileData.id);
            console.log(id);
        }
        getId_and_compare();
       
    },[]);
    const date = new Date(profileData.date);
    return( 
  <div className="flex flex-col overflow-x-hidden gap-5 w-screen">
  <UserNavbar query = 'Search Profiles'/>
  <div className="flex md:flex-row xxs:flex-col w-screen gap-5 justify-center align-middle">
    <div className="flex flex-col justify-center align-middle gap-3">
      <div className="flex flex-col">
        <Card className="flex flex-col py-7 px-5 gap-3 matchColor">
            <div className="flex flex-row gap-3 p-3 justify-center ">
                <FaRegUser size={30} color = 'yellow'/>
                <b><code><h1 className="text-3xl text-yellow-300">{profileData.username}</h1></code></b>
            </div>
            {profileData.id === jwtDecode(cookie.jwt).id ? <div className="flex flex-row justify-center">
                <Button className="text-yellow-300 hover:text-red-700 transition-all hover:scale-105">EDIT PROFILE</Button>
            </div> : <hr/>}
            <div className="flex text-yellow-300 justify-center">
                <code>Date Joined: {date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() }</code>
            </div>
        </Card>
      </div>
      <div className="flex flex-col justify-center align-middle p-2 matchColor rounded-lg">
        <b><h2 className="text-xl text-yellow-300">TOTAL BLOGS POSTED</h2></b>
        <code className="text-lg text-yellow-300">{data.length}</code>
      </div>
    </div>
    <div className="flex flex-col items-center gap-3">
      <div className= {`flex flex-col items-center w-fit gap-2 overflow-y-scroll overflow-x-hidden ${data.length === 0 ? "justify-center md:align-middle pl-2" : 
      data.length < 3 ? 'xxs:justify-start md:justify-center md:align-middle xxs:align-top h-fit' : 'h-96'}`}>
            {data.length === 0 ? <b><h1 className="text-xl text-yellow-300 p-3">NO BLOGS POSTED YET</h1></b>: data.map((val,index)=>{
                return <BlogCard body = {val.body} title = {val.title} author = {val.author} id = {val.id}  key = {index} likes = {val.likes}/>
            })}
      </div>
    </div>
  </div>
    <Footer/>
</div>

    )
}