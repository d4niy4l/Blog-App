import { useState,useCallback,useEffect,useRef } from "react";
import VerifyUser from "../authPage/VerifyUserHook";
import Footer from "../Components/Footer";
import UserNavbar from "../Components/UserNavbar";
import BlogCard from "../Components/BlogCard";
import logo from './../logo.png'
import Pagination from "../Components/Pagination";
import { Dropdown } from "../Components/Dropdown";
export default function MainPage(){
    VerifyUser();
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(0); 
    const option = ['DATE (NEWEST FIRST)','DATE (OLDEST FIRST)','MOST POPULAR']
    const [index, setIndex] = useState(0);
    const limit = 6;
    const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(()=>{
        const filter = () => {
            if(index === 0){
                blogs.sort((a,b)=>{
                    const a_date = new Date(a);
                    const b_date = new Date(b);
                    return a_date - b_date;
                })
            }
            else if(index === 1){
                blogs.sort((a,b)=>{
                    const a_date = new Date(a);
                    const b_date = new Date(b);
                    return b_date - a_date;
                })
            }
            else if(index === 2){
                blogs.sort((a,b)=>{
                    if(a.likes.length !== b.likes.length){
                        return b.a.likes.length - a.likes.length;
                    }
                    else{
                        return b.comments.length - a.comments.length;
                    }
                })
            }
        }
        filter();
    },[index])
    
    useEffect(() => {
        const getData = async () => {
            try{
                const res = await fetch(`${apiUrl}/blogs?limit=${encodeURIComponent(limit)}&page=${encodeURIComponent(currentPage)}`,{
                    method: 'GET',
                });
                    const data = await res.json();
                    setBlogs(data.items);
                    setTotalPages(Math.ceil(data.size/limit));
                } 
                catch (error) {
                    console.log('error:', error);
                }
        };
        getData();
    },[currentPage]);

        return(
            <div className="flex flex-col gap-4 justify-center align-middle w-screen">
        <UserNavbar query = "Search Blogs"/>
        <div className="flex flex-col justify-center align-middle gap-5">
            <div className="flex flex-row p-3  justify-center align-middle gap-1">
                 <img src={logo} width="60px" height="10px"/>
                 <h1 className="text-white text-3xl">LOGGO</h1>
            </div>
            <div className="flex flex-row justify-center items-center gap-3 ">
                <h1 className="text-2xl text-yellow-300">BLOGS</h1>
                <Dropdown options={option} setIndex={setIndex}/>
            </div>
            <div className="mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    blogs.map((val,index)=>{
                        return <BlogCard author = {val.author} body = {val.body} main = {true} title = {val.title} id = {val.id} key = {index} likes = {val.likes}/>
                    })
                }
            </div>
            <div className="flex justify-center align-middle">
                <Pagination currentPage={currentPage} isNext={currentPage < totalPages} isPrev={currentPage > 1} setNextPage={setCurrentPage}/>
            </div>
        </div>
        <Footer/>
    </div>
    )
}