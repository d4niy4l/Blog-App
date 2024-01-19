import { useState,useCallback,useEffect,useRef } from "react";
import VerifyUser from "./../authPage/VerifyUserHook";
import Footer from "../Components/Footer";
import UserNavbar from "../Components/UserNavbar";
import BlogCard from "../Components/BlogCard";
import logo from './../authPage/logo.png'
import {debounce} from 'lodash'
export default function MainPage(){
    VerifyUser();
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [offset, setOffset] = useState(6);
    const [blogsSize,setBlogSize] = useState(0);
    const container = useRef();
    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try{
                const res = await fetch(`http://localhost:5000/blogs`,{
                    method: 'GET',
                });
                    const commentObj = await res.json();
                    setBlogs(commentObj.items);
                    setBlogSize(commentObj.size);
                } 
                catch (error) {
                console.log('error:', error);
                }
                setIsLoading(false);
        };
        getData();
    },[]);
    const fetchData = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);
        const res = await fetch(`http://localhost:5000/blogs?offset=${offset}`,{
            method: 'GET',
        });
        const blogObj = await res.json();
        if(blogObj.end <= blogsSize){
            setBlogs((prev)=>[...prev,...blogObj.items]);
            setOffset(blogObj.end+1);
        }
        setIsLoading(false);
      }, [offset, isLoading]);
      const debouncedFetchData = useCallback(debounce(fetchData, 300), [fetchData]);
      useEffect(() => {
        const handleScroll = () => {
            //const container = footer;
            if (container.current.scrollTop + container.current.clientHeight >= container.current.scrollHeight) {
              debouncedFetchData();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, [fetchData]);
      return(
    <div className="flex flex-col gap-4 justify-center align-middle">
        <UserNavbar/>
        <div className="flex flex-col justify-center align-middle gap-5">
            <div className="flex flex-row p-3  justify-center align-middle gap-1">
                 <img src={logo} width="60px" height="10px"/>
                 <h1 className="text-white text-3xl">LOGGO</h1>
            </div>
            <div className="flex flex-col ">
                <h1 className="text-2xl text-yellow-300">RECENT BLOGS</h1>
            </div>
            <div className="mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4" ref={container}>
                {
                    blogs.map((val)=>{
                        return <BlogCard author = {val.author} body = {val.body} main = {true} title = {val.title} id = {val.id} key = {Math.random()}/>
                    }
                    )
                }
            </div>
        </div>
        <Footer/>
    </div>
    )
}