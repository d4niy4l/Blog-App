import VerifyUser from "../authPage/VerifyUserHook";
import Footer from "../Components/Footer";
import UserNavbar from "../Components/UserNavbar";
import BlogCard from "../Components/BlogCard";
import logo from './../logo.png'
import Pagination from "../Components/Pagination";
import { useLocation, useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import ProfileCard from "../Components/ProfileCard";
export default function SearchPage(){
    VerifyUser();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const type = parseInt(query.get('type'));
    const queryContent = query.get('search');
    const [items,setItems]= useState([]);
    const [refresh,setRefresh] = useState(1);
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(0); 
    const apiUrl = process.env.REACT_APP_API_URL
    const limit = 6;
    useEffect(()=>{
        const searchBlogs = async()=>{
            const res = await fetch(`${apiUrl}/search-blogs?query=${queryContent}&limit=${encodeURIComponent(limit)}&page=${encodeURIComponent(currentPage)}`,{
                method: 'GET',
            });
            const result = await res.json();
            if(res.status !== 200) {
                console.log('error');
                return;
            }
            console.log(result);
            setItems(result.items);
        }
        console.log(type);
        const searchUsers = async()=>{
            const res = await fetch(`${apiUrl}/search-users?query=${queryContent}&limit=${encodeURIComponent(limit)}&page=${encodeURIComponent(currentPage)}`,{
                method: 'GET',
            });
            const result = await res.json();
            if(res.status !== 200) {
                console.log('error');
                return;
            }
            console.log(result);
            setItems(result.items);
        }
        if (type === 2)
            searchBlogs();
        if (type === 1)
            searchUsers();
        console.log(type);
    },[refresh])
        return(
            <div className="flex flex-col gap-4 justify-center align-middle w-screen">
        <UserNavbar query = {`SEARCH ${type == 2 ? 'BLOGS' : 'USERS'}` } refreshSearch = {setRefresh} refresh = {refresh}/>
        <div className="flex flex-col justify-center align-middle gap-5">
            <div className="flex flex-row p-3  justify-center align-middle gap-1">
                 <img src={logo} width="60px" height="10px"/>
                 <h1 className="text-white text-3xl">LOGGO</h1>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 ">
                <h1 className="text-2xl text-yellow-300">{items.length > 0 ?`RESULTS FOR SEARCH ${queryContent.toUpperCase()}` : `NO RESULTS FOR ${queryContent.toUpperCase()}`}</h1>
            </div>
            <div className="mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    items.map((val,index)=>{
                        if(type === 2)
                            return <BlogCard author = {val.author} body = {val.body} main = {true} title = {val.title} id = {val.id} key = {index} likes = {val.likes}/>
                        else if(type == 1)
                            return <ProfileCard username= {val.username}  user_id={val._id} />
                    }
                    )
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