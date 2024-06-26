import { useEffect,useState,useCallback, useRef } from "react";
import UserNavbar from "../Components/UserNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button } from "@material-tailwind/react";
import { CommentBoxTextarea } from "../Components/CommentBoxTextarea";
import { IoIosArrowRoundBack } from "react-icons/io";
import { GoComment } from 'react-icons/go'
import { FaHeart } from "react-icons/fa";
import { IconContext } from "react-icons";
import {GiNotebook} from 'react-icons/gi'
import Footer from "../Components/Footer";
import {debounce} from 'lodash'
import CommentCard from "../Components/CommentCard";
import { FaRegUser } from "react-icons/fa";


export default function BlogPage(){
    
    const [like,setLike] = useState(false);
    const [complete,setComplete] = useState(false);
    const container = useRef();
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [offset, setOffset] = useState(5);
    const [numberComments,setNumberComments] = useState(0);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;
    const [blog, setBlog] = useState({
        author: '',
        body: '',
        title: '',
        comments: []
    });
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const id = query.get('id');
    const goBack= () => navigate(-1);
    const updateData = async ()=>{
        const res = await fetch(`${apiUrl}/comment?offset=${0}&id=${encodeURIComponent(id)}&limit=${offset}`,{
            method: 'GET',
        });
        const commentObj = await res.json();
        console.log(commentObj.items);
        setComments(()=>[...commentObj.items]);
        setOffset(commentObj.end);
    }
    const fetchData = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);
        const res = await fetch(`${apiUrl}/comment?offset=${offset}&id=${encodeURIComponent(id)}`,{
            method: 'GET',
        });
        const commentObj = await res.json();
        if(commentObj.end <= numberComments){
            setComments((prev)=>[...prev,...commentObj.items]);
            setOffset(commentObj.end+1);
        }
        setIsLoading(false);
      }, [offset, isLoading]);
      const debouncedFetchData = useCallback(debounce(fetchData, 300), [fetchData]);
    useEffect(() => {
    const getData = async () => {
        setIsLoading(true);
        try{
            const res = await fetch(`${apiUrl}/comment?id=${encodeURIComponent(id)}`,{
                method: 'GET',
            });
                const commentObj = await res.json();
                setComments(commentObj.items);
            } 
            catch (error) {
            console.log('error:', error);
            }
            setIsLoading(false);
    };
    getData();
    }, []);
    useEffect(()=>{
        const getBlog = async()=>{
            try {
                const blog_id = query.get('id');
                const res = await fetch(`${apiUrl}/oneBlog?id=${encodeURIComponent(blog_id)}`, {
                method: 'GET',
                });
                if(res.status === 400){
                    return;
                }
                const result = await res.json();
                setBlog(result.blog);
                setNumberComments(result.blog.comments.length);      
                const response = await fetch(`${apiUrl}/pfp?username=${encodeURIComponent(result.blog.author)}`, {
                method: 'GET',
                });
                const imageData = await response.json();
                setImageUrl(imageData.url);
                   
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
                setLike(result.blog.likes.includes(id));
               
            }
            catch(err){
                console.log(err);
            }
        }
        getBlog();

    },[])
    const navigateToUser = ()=> navigate(`/Profile?username=${decodeURIComponent(blog.author)}`);
    useEffect(() => {
        const handleScroll = () => {
            if (container.current.scrollTop + container.current.clientHeight >= container.current.scrollHeight) {
              debouncedFetchData();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, [fetchData]);
      
      const toggle_like = async ()=>{
        try {
            const res = await fetch(`${apiUrl}/toggle-like?id=${encodeURIComponent(id)}`, {
                method: 'GET',
                credentials: 'include'
            });
            if (res.status === 200) {
                const resp = await fetch(`${apiUrl}/verify`,{
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                const result = await resp.json();
                if(like){
                    const index = blog.likes.indexOf(result.id);
                    blog.likes.splice(index,1);
                }
                else{
                    blog.likes.push(result.id);
                }
                setLike(!like);
            } else {
                console.error("Failed to toggle like");
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    }
    if(blog.likes && complete === false){
        setLike(blog.likes.includes());
        setComplete(true);
    }
    const [imageUrl, setImageUrl] = useState('');
    
    const writtenBy =  (<div className="flex flex-col items-center">
                            <button onClick={navigateToUser} className="hover:text-red-700 transition-colors">
                            {imageUrl ? <img src = {imageUrl} alt="pfp" width={55} height={55} className="rounded-full"/> : <FaRegUser color="yellow" size={30} />}
                                <h1>{blog.author}</h1>
                            </button>
                        </div>);
    return(
        <div className="flex flex-col align-middle justify-center overflow-x-hidden">
            <UserNavbar query = "Search Blogs"/>
            <div className="matchColor flex align-middle justify-center flex-col items-center w-screen rounded-xl">
                <div className = "flex flex-col gap-2 justify-center items-center h-fit rounded-none overflow-hidden border-b-black border-b-4 pt-5 pb-10 text-white" 
                >
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-5 justify-center p-3">
                            <GiNotebook size="50" color="yellow"/>
                            <b><h3 className="text-5xl text-white-300 text-yellow-300">{blog.title}</h3></b>
                        </div>
                        <div className="flex flex-row justify-end p-3">
                            <div className="flex flex-col">
                                <button onClick={toggle_like}>
                                    <FaHeart color={ like ? 'red' : 'black'} size={25}/>
                                </button>
                                <p className="text-md text-yellow-300">{blog.likes?.length === undefined ? 0 : blog.likes.length }</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-start py-2 px-5 border-b-black border-b-2 flex-row text-center text-sm text-yellow-300 align-middle">
                        {writtenBy}
                    </div>
                    <div className="p-5">
                        <p className="text-lg text-yellow-300 px-3">
                            {blog.body}
                        </p>
                    </div>
                    <div></div>
                </div>
            </div>
            <div className="matchColor flex flex-col gap-5">
                <Card className="matchColor bg-inherit flex flex-row gap-5 justify-center w-full py-5 rounded-t-none rounded-b-lg border-y-black border-y-4 text-white  bg-slate-800">
                    <div className="flex flex-col items-center align-middle px-5 justify-center border-r-4 border-r-black gap-2">
                        <h1 className="text-xl text-yellow-300"><b>POST COMMENT</b></h1>
                        <IconContext.Provider value = {{size: '2em'}}>
                            <GoComment color="yellow"/>
                        </IconContext.Provider>
                    </div>
                        <CommentBoxTextarea id = {blog.id} setNumber = {setNumberComments} number = {numberComments} update = {updateData}/>
                        <div></div>
                </Card>
               
                <div className = "bg-cover bg-center w-full p-3"  //style={{backgroundImage: `url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Y4ODAtdGVjaGktMDgtam9iNTk4LmpwZw.jpg')`}}
                >
                    <h1 className="text-2xl py-5 text-white"><b>{numberComments === 0 ? "NO COMMENTS YET" : `${numberComments} COMMENTS`}</b></h1>
                </div>
            </div>
            <div className="flex flex-col gap-5 p-4" ref = {container}>
                {numberComments > 0 && comments.map((val,index)=>{
                    return <CommentCard body = {val.body} author = {val.author} date = {val.date} key = {index}/>
                })}  
            </div>
            <div className="flex flex-row justify-center align-middle items-center p-7">
                <Button className="flex flex-row gap-2 align-middle justify-center items-center" onClick={goBack}>
                    <IoIosArrowRoundBack className="text-white"/>
                    <p>BACK</p>
                </Button>
            <div></div>
            </div>
            <Footer/>
        </div>
    )
}