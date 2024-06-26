import React from "react";
import UserNavbar from "../Components/UserNavbar";
import { Card, Button} from "@material-tailwind/react";
import { useState,  useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import BlogCard  from "../Components/BlogCard";
import Footer from "../Components/Footer";
import { FaRegUser } from "react-icons/fa";
export default function ProfilePage(){
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const username = query.get('username');
    const [profileData,setProfileData] = useState({});
    const [data, setData] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;
    const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiUrl}/post-blog?author=${username}`, {
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
  }, []);
    

    useEffect(()=>{
        const getId_and_compare = async ()=>{
      
            const res = await fetch(`${apiUrl}/user?username=${encodeURIComponent(username)}`,{
                method : 'POST',
            });
            const result = await res.json();
            if(!result.status) navigate(-1);
            setProfileData({
                username: result.username,
                date: result.date,
                id: result.id, 
                bio: result.bio
            });
            const resp = await fetch(`${apiUrl}/verify`,{
              method: 'POST',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json',
              },
          })
          const resp_json = await resp.json();
          if(resp_json.status === false){
              navigate('/Login'); 
          }
          const id = resp_json.id;
          setIsOwner(id === result.id);
        }
        getId_and_compare();
       
    },[]);
    useEffect(()=>{
      const fetchData = async () => {
          try {
              const response = await fetch(`${apiUrl}/pfp?username=${encodeURIComponent(username)}`, {
              method: 'GET',
          });
          const result = await response.json();
          setImageUrl(result.url);
          } catch (error) {
              console.error('Error fetching image:', error);
          }
      };
      fetchData();
  },[]);
    const date = new Date(profileData.date);
    
    return( 
  <div className="flex flex-col overflow-x-hidden gap-5 w-screen">
  <UserNavbar query = 'Search Profiles'/>
  <div className="flex flex-col w-screen gap-5 justify-center align-middle">
    <div className="flex flex-col justify-center align-middle gap-3">
      <div className="flex flex-col">
        <Card className="flex flex-col py-7 px-5 gap-3 matchColor">
            <div className="flex flex-row align-middle justify-center gap-5">
              <div className="flex flex-col gap-3 p-3 align-middle items-center">
                  {imageUrl ? <img src = {imageUrl} alt="pfp" width={200} height={200} className="rounded-full"/> : <FaRegUser color="yellow" size={30} />}
                  <b><code><h1 className="text-3xl text-yellow-300">{profileData.username}</h1></code></b>
              </div>
              <div className="pr-3 pl-5 border-l-2 border-l-yellow-300 flex flex-col text-yellow-300 gap-2 align-middle justify-center">
                <h1 className="text-xl font-bold">About Me</h1>
                <p>{profileData.bio}</p>
              </div>
            </div>

            {isOwner ? <div className="flex flex-row justify-center">
                <Button onClick={()=>navigate(`/Update?username=${encodeURIComponent(profileData.username)}&id=${encodeURIComponent(profileData.id)}`)}
                 className="text-yellow-300 hover:text-red-700 transition-all hover:scale-105">EDIT PROFILE</Button>
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
    <div className={`mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 ${
        data.length === 0 ? "justify-center md:align-middle pl-2" : 
        data.length < 3 ? 'justify-center items-center h-fit overflow-x-hidden' : 'h-96 overflow-y-scroll'
    }`}>
        {data.length === 0 ? (
            <b><h1 className="text-xl text-yellow-300 p-3">NO BLOGS POSTED YET</h1></b>
        ) : (
            data.map((val, index) => (
                <BlogCard 
                    body={val.body} 
                    title={val.title} 
                    author={val.author} 
                    id={val.id} 
                    key={index} 
                    likes={val.likes}
                />
            ))
        )}
    </div>
</div>


  </div>
    <Footer/>
</div>

    )
}