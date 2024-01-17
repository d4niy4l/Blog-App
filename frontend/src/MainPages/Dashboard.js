import React from "react";
import UserNavbar from "../Components/UserNavbar";
import { Card, Input, Button} from "@material-tailwind/react";
import { useState, useRef, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import BlogCard  from "../Components/BlogCard";
import Footer from "../Components/Footer";
import VerifyUser from "../authPage/VerifyUserHook";
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

    const notifyDeletion = (data_id) => {
      const updated_data = data.filter( data => data.id != data_id);
      setData(updated_data);
    }  

    const deleteAll = async () => {
      try {
        const res = await fetch(`http://localhost:5000/post-blog`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({author: data[0].author})
        });
        if(res.ok){          
          setData([]);
        }
    }
    catch(err){
      console.error(err);
    }
  }
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
          body.current.style.height = 'auto';
          setCount(0);
          setInputError(false);
          setError(false);
      }
      catch(err){
        console.log(err);
      }
    }
    console.log(data[0]?.id);
    return( 
  <div className="flex flex-col overflow-x-hidden gap-5 w-screen">
  <UserNavbar />
  <div className="flex md:flex-row xxs:flex-col w-screen gap-5 justify-center align-middle">
    <div className="flex flex-col justify-center align-middle gap-3">
      <div className="flex flex-col">
        <Card className="flex flex-col py-7 px-5 gap-3 matchColor">
          <form className="flex flex-col gap-5">
            <div>
              <Input 
              type="textarea" label="Title"
              inputRef={title}
              required = {true}
              className="text-yellow-300"
              onChange={handleChange}
              />
            </div>
            <div className="w-cover">
              <textarea
                placeholder="Start writing...."
                name="body"
                maxLength={10000}
                className="matchColor w-400 rounded-lg resize-y overflow-hidden text-yellow-300"
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
      <div className="flex flex-col justify-center align-middle p-2 matchColor rounded-lg">
        <b><h2 className="text-xl text-yellow-300">TOTAL BLOGS POSTED</h2></b>
        <code className="text-lg text-yellow-300">{data.length}</code>
      </div>
    </div>
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-row align-middle">
        <Button disabled = {data.length === 0}  onClick={deleteAll} className="text-yellow-300 hover:text-red-500 transition-al">DELETE ALL BLOGS</Button>
      </div>
      <div className= {`flex flex-col items-center w-fit gap-2 overflow-y-scroll overflow-x-hidden ${data.length === 0 ? "justify-center md:align-middle pl-2" : 
      data.length < 3 ? 'xxs:justify-start md:justify-center md:align-middle xxs:align-top h-fit' : 'h-96'}`}>
            {data.length === 0 ? <b><h1 className="text-xl text-yellow-300 p-3">NO BLOGS POSTED YET</h1></b>: data.map((val)=>{
                return <BlogCard body = {val.body} title = {val.title} author = {val.author} id = {val.id} notifyDeletion = {notifyDeletion} key = {1}/>
            })}
      </div>
    </div>
  </div>
    <Footer/>
</div>

    )
}