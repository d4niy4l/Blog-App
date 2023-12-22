import React from "react";
import UserNavbar from "../Components/UserNavbar";
import { Card, Input, Button, textarea} from "@material-tailwind/react";
import { useState, useRef, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import BlogCard  from "../Components/BlogCard";
import Footer from "../Components/Footer";
export default function DashBoard(props){
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const username = query.get('username');
    const [refreshCount, setRefreshCount] = useState(0);
    const [wordCount, setCount] = useState(0);
    const [serverError, setError] = useState(false);
    const [inputError, setInputError] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        author: ''
    })
    const [data, setData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(`http://localhost:5000/post-blog?username=${username}`, {
            method: 'GET',
          });
          if (res.status === 200) {
            const blog_json = await res.json();
            const blogs = blog_json.blogs;
            setData(blogs);         
            console.log(blogs);
            console.log(data);
          } 
          else
            console.error('Error fetching data');
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };
      fetchData(); 
    }, [refreshCount]);
    
    const title = useRef(null);
    const body = useRef(null);
    const handleChange= (event)=>{
        const{value, name} = event.target;
        setCount(value.length);
        setFormData({ 
            ...formData,
            [name]: value
        })
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    }
    const submit = async (event)=>{
      event.preventDefault();
      try{
        setFormData({
          ...formData,
          title: title.current.value,
          author: username
        })
        const res = await fetch('http://localhost:5000/post-blog',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
          })
          const message = await res.json();
          if(res.status === 400){
            if(message.message === 'Server Error')
                setError(true);
            else if(message.message === 'Input Error')
              setInputError(true);
            return;
          }
          setRefreshCount(refreshCount + 1);
          title.current.value = "";
          body.current.value = ""; 
          setCount(0);
          setInputError(false);
          setError(false);
      }
      catch(err){
        console.log(err);
      }
    }
    return( 
        <div className="flex flex-col align-middle items-center justify-center gap-5 overflow-x-hidden">
  <UserNavbar />
  <div>
    <Card className="flex flex-col p-10 gap-3">
      <form className="flex flex-col gap-5">
        <div>
          <Input 
          type="textarea" label="Title"
          inputRef={title}
          required = {true}
          onChange={handleChange}
          />
        </div>
        <div className="w-cover">
          <textarea
            placeholder="Start writing...."
            name="body"
            maxLength={10000}
            className="lg:w-600 md:w-400 sm:w-200 resize-y overflow-hidden"
            onInput={handleChange}
            ref = {body}
            required = {true}
          />
        </div>
        <Button ripple = {true} onClick={submit} disabled = {formData.body.length < 200 || title.current.value.length < 3}>
          {formData.body.length >= 200 && title.current.value.length >= 3?"POST" : "YOU CAN DEFINITELY WRITE MORE"}</Button>
      </form>
      <small className="text-xs text-black">{wordCount + '/10000'}</small> 
      {inputError && <small className="text-xs text-red-500">INPUT ERROR</small> }
      {serverError && <small className="text-xs text-red-500">SERVER ERROR</small> }
    </Card>
  </div>
  <div className="flex flex-col align-middle justify-center items-center">
        {data.length === 0 ? <h1 className="text-xl text-white p-3">NO BLOGS POSTED YET</h1>: data.map((val)=>{
            return <BlogCard body = {val.body} title = {val.title} author = {val.author}/>
        })}
  </div>
    <Footer/>
</div>

    )
}