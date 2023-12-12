import { useEffect,useState } from "react";
import UserNavbar from "../Components/UserNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button } from "@material-tailwind/react";
import { CommentBoxTextarea } from "../Components/CommentBoxTextarea";
import { IoIosArrowRoundBack } from "react-icons/io";
import {GoComment} from 'react-icons/go'
import { IconContext } from "react-icons";
import { Pagination } from "../Components/Pagination";
export default function BlogPage(){
    const [error,setError] = useState(false);
    const navigate = useNavigate();
    const [blog, setBlog] = useState({
        author: '',
        body: '',
        title: '',
        comments: []
    });
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const title = query.get('title');
    const goBack= () => navigate(-1);
    useEffect(()=>{
        const getBlog = async()=>{
            try {
                const res = await fetch(`http://localhost:5000/oneBlog?title=${encodeURIComponent(title)}`, {
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
    return(
        <div className="flex flex-col align-middle justify-center gap-5 overflow-x-hidden"
        style = {{backgroundImage: `url('https://wallpaperaccess.com/full/3401965.jpg')`}}>
            <UserNavbar/>
            <div className="flex align-middle justify-center flex-col items-center w-screen">
                <div className="flex flex-row align-middle justify-center items-center w-full h-full">
                    <div className="px-3 flex flex-col justify-start bg-gradient-to-r from-purple-700 xxs:py-6 xs:py-0 to-gray-600 text-white h-full">
                        <div className="py-32">
                            <h1><b>{blog.author.toUpperCase() + '\'s'}</b></h1>
                            <h1><b>BLOG</b></h1>
                        </div>
                    </div>
                    <div className="bg-cover bg-center w-full h-full rounded-tr-lg xs:bg-left xxs:bg-left py-32 lg:bg-top" style={{backgroundImage: `url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvdjg4NC1iaXJkLTE1XzIuanBn.jpg')`}}>
                        <h2 className="text-5xl text-white"><b>{blog.title}</b></h2>
                    </div>
                </div>
                <Card className="bg-cover bg-center bg-slate-600 flex flex-col gap-2 justify-center items-center h-fit rounded-none overflow-hidden border-b-black border-b-4 pt-5 pb-10 text-white" 
                //style = {/*{backgroundImage: `url('https://c4.wallpaperflare.com/wallpaper/217/640/970/technology-discord-wallpaper-preview.jpg')`}*/}
                >
                    <div className="flex justify-start py-2 px-5 border-b-black border-b-2">
                        <p className="text-sm">{"By: " +  blog.author.toUpperCase()}</p>
                    </div>
                    <div>
                        <p className="text-lg px-3">
                            {blog.body}
                        </p>
                    </div>
                    <div></div>
                </Card>
            </div>
            <div classname = "bg-cover bg-center" style={{backgroundImage: `url('https://cdn.wallpapersafari.com/98/81/mzVyXg.png')`}}>
                
            </div>
            <div className=" bg-slate-600">
                <Card className="bg-inherit flex flex-row gap-5 justify-center w-full py-5 rounded-t-none rounded-b-lg border-y-black border-y-4 text-white  bg-slate-600">
                    <div className="flex flex-col items-center align-middle px-5 justify-center border-r-4 border-r-black">
                        <h1 className="text-xl"><b>POST COMMENT</b></h1>
                        <IconContext.Provider value = {{size: '2em'}}>
                            <GoComment/>
                        </IconContext.Provider>
                    </div>
                        <CommentBoxTextarea/>
                        <div></div>
                </Card>
               
                <div classname = "bg-cover bg-center w-full"  //style={{backgroundImage: `url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Y4ODAtdGVjaGktMDgtam9iNTk4LmpwZw.jpg')`}}
                >
                    <h1 className="text-2xl py-5"><b>{blog.comments.length === 0 ? "NO COMMENTS YET" : `${blog.comments.length} COMMENTS`}</b></h1>
                </div>
            </div>
            {blog.comments.length > 0 && <Pagination arr = {blog.comments} item = 'comments'></Pagination>}
            <div className="fex flex-row justify-start align-middle items-center px-5">
                <Button className="flex flex-row gap-2 align-middle justify-center items-center" onClick={goBack}>
                    <IoIosArrowRoundBack className="text-white"/>
                    <p>BACK</p>
                </Button>
            </div>
        </div>
    )
}