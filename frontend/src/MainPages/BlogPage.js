import { useEffect,useState } from "react";
import UserNavbar from "../Components/UserNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button } from "@material-tailwind/react";
import {useCookies} from 'react-cookie'
import { CommentBoxTextarea } from "../Components/CommentBoxTextarea";
import { IoIosArrowRoundBack } from "react-icons/io";
import {GoComment} from 'react-icons/go'
import { IconContext } from "react-icons";
import VerifyUser from "../authPage/VerifyUserHook";
import { Pagination } from "../Components/Pagination";
import {GiNotebook} from 'react-icons/gi'
import Footer from "../Components/Footer";
export default function BlogPage(){
    const [cookie] = useCookies([]);
    const [error,setError] = useState(false);
    const [refreshCount, setRefreshCount] = useState(0);
    const navigate = useNavigate();
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
  
    useEffect(()=>{
        const getBlog = async()=>{
            if(!cookie.jwt) navigate('/Login');
            try {
                const res = await fetch(`http://localhost:5000/oneBlog?id=${encodeURIComponent(id)}`, {
                  method: 'GET'
                });
                if(res.status === 400){
                    setError(true);
                    return;
                }
                const result = await res.json();
                console.log(result);
                setBlog(result.blog);
                console.log(blog);
            }
            catch(err){
                setError(true);
                console.log(err);
            }
        }
        getBlog();
    },[])
    VerifyUser();
    return(
        <div className="flex flex-col align-middle justify-center overflow-x-hidden">
            <UserNavbar/>
            <div className="matchColor flex align-middle justify-center flex-col items-center w-screen rounded-xl">
                <div className = "flex flex-col gap-2 justify-center items-center h-fit rounded-none overflow-hidden border-b-black border-b-4 pt-5 pb-10 text-white" 
                //style = {/*{backgroundImage: `url('https://c4.wallpaperflare.com/wallpaper/217/640/970/technology-discord-wallpaper-preview.jpg')`}*/}
                >
                    <div className="flex flex-row gap-5 justify-center p-3">
                        <GiNotebook size = {50} color = 'yellow'/>
                        <b><h3 className="text-5xl text-white-300 text-yellow-300">{blog.title}</h3></b>
                    </div>
                    <div className="flex justify-start py-2 px-5 border-b-black border-b-2">
                        <code className="text-sm text-yellow-300">{"Written By " +  blog.author.toUpperCase()}</code>
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
                        <CommentBoxTextarea id = {blog.id}/>
                        <div></div>
                </Card>
               
                <div className = "bg-cover bg-center w-full p-3"  //style={{backgroundImage: `url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Y4ODAtdGVjaGktMDgtam9iNTk4LmpwZw.jpg')`}}
                >
                    <h1 className="text-2xl py-5 text-white"><b>{blog.comments.length === 0 ? "NO COMMENTS YET" : `${blog.comments.length} COMMENTS`}</b></h1>
                </div>
            </div>
            {//blog.comments.length > 0 && <Pagination arr = {blog.comments} item = 'comments'></Pagination>
            }
            <div className="flex flex-row justify-center align-middle items-center p-7">
                <Button className="flex flex-row gap-2 align-middle justify-center items-center" onClick={goBack}>
                    <IoIosArrowRoundBack className="text-white"/>
                    <p>BACK</p>
                </Button>
            </div>
            <Footer/>
        </div>
    )
}