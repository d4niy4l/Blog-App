import UserNavbar from './../Components/UserNavbar';
import Footer from './../Components/Footer';
import { Input } from '@material-tailwind/react';
import { useLocation, useNavigate } from 'react-router-dom'
import VerifyUser from '../authPage/VerifyUserHook';
import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { useEffect, useState, useRef } from 'react';
import { FaRegUser } from "react-icons/fa";
export default function UpdateProfile(){
    const navigate = useNavigate();
    const [cookie] = useCookies();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const username = query.get('username');
    const id = query.get('id');
    const jwt = jwtDecode(cookie.jwt);
    const [profileData,setProfileData] = useState({});
    const [imageUrl,setImageUrl] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [imgHover, setImgHover] = useState(false);
    const [newBio, setNewBio] = useState('');
    const [dimensions, setDimensions] = useState({});
    const bio_ref = useRef(null);                              
    const bioOnChange = (event)=>{
        const { value } = event.target;
        setNewBio(value);
    }
    if(id !== jwt.id){
        alert('Invalid Token');
        navigate('/Login');
    }

   const uploadImage = async (e)=>{
        try{
            const formData = new FormData();
            formData.append('image',e.target.files[0]);
            const response = await fetch('http://localhost:5000/pfp',{
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }); 
            if(response.ok){
                alert('success');
            }
            else {
                alert('fuck');
            }
        } catch(err){
            console.log('Error uploading image: ',err);

        }
   }

    const uploadBio = async (event)=>{
        event.preventDefault();
        const result = await fetch('http://localhost:5000/update-bio',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: profileData.id,
                    bio: newBio                   
                }),
            });
        const res = await result.json();
        if(result.ok){
            setProfileData({
                ...profileData,
                bio: res.bio
            })
            bio_ref.current.value = "";
            setNewBio("");
        }
        else{
            alert('SERVER ERROR');
        }   
    }


    useEffect(() => {
        const getUserData = async ()=>{
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
                id: result.id,
                bio: result.bio
            });
            console.log(profileData.id);
            console.log(id);
        }
        getUserData();
    
        
    }, []);

    useEffect(()=>{
        let objectUrl; 
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/pfp?user_id=${encodeURIComponent(jwt.id)}`, {
                method: 'GET',
            });
            const blob = await response.blob(); 
            objectUrl = URL.createObjectURL(blob); 
            setImageUrl(objectUrl);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };
        fetchData();
        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    },[]);

    useEffect(()=>{
        function adjustTextarea() {
            const screenWidth = window.innerWidth;
            if(screenWidth < 400){
                setDimensions({
                    rows: 7,
                    cols: 22 
                });
            }
            else if(screenWidth < 510){
                setDimensions({
                    rows: 5,
                    cols: 30 
                });
            }
            else if (screenWidth < 600) {
                setDimensions({
                    rows: 4,
                    cols: 39 
                });
            } else {
                setDimensions({
                    rows: 3,
                    cols: 50 
                });
            }
        }

        adjustTextarea(); 
        window.addEventListener('resize', adjustTextarea);
        return () => {
            window.removeEventListener('resize', adjustTextarea);
        };
    },[])




    VerifyUser();
    return(
        <div className='flex flex-col overflow-x-hidden gap-5 w-screen'>
            <UserNavbar query = 'Search Profiles'/>
            <div className="flex flex-col">
                    <div className="flex flex-row align-middle justify-center gap-2 matchColor p-5">
                        <div className="flex flex-col gap-3 p-3 align-middle items-center">
                            <div className='flex flex-col align-middle justify-center gap-2'>
                                <label htmlFor="img_id" className='cursor-pointer relative' onMouseEnter={()=>{setImgHover(true)}} onMouseLeave={()=>setImgHover(false)}>
                                    {imageUrl ?
                                    <img src = {imageUrl} alt="pfp" width={200} height={200} 
                                    className="rounded-full hover:grayscale z-10"/> : <FaRegUser color="yellow" size={30} />}
                                    <p className={'relative bottom-28 text-white transition-opacity duration-300 ' + (imgHover ? "opacity-100" : "opacity-0")}>Change Picture</p>    
                                </label>
                                
                                <input type="file" id="img_id" className='hidden' onChange={uploadImage}/>
                                <b><code><h1 className="text-3xl text-yellow-300">{profileData.username}</h1></code></b>
                            </div>
                        </div>
                        <div className="pr-2 pl-5 border-l-2 border-l-yellow-300 flex flex-col text-yellow-300 gap-2 align-middle justify-center items-center">
                            <h1 className="text-xl font-bold">About Me</h1>
                            <form>
                                <textarea ref={bio_ref}  rows = {dimensions.rows} cols = {dimensions.cols} onChange={bioOnChange} className='resize-none matchColor rounded-lg ' placeholder={profileData.bio}>
                                </textarea>
                            </form>
                            <small className = 'text-yellow-300 text-xs'>{newBio.length}/150</small>
                            <button onClick={uploadBio}
                            className='bg-gray-800 text-yellow-300 w-fit rounded-lg p-2 hover:bg-slate-600 hover:scale-105' disabled = {newBio.length > 150}>{newBio.length > 150 ? "Word Limit Exceeded" : "Change"}</button>
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='flex flex-col'>
                            <Input label = 'Old Password' />
                            <Input label= 'New Password'/>
                            <Input label = 'Confirm Password' />
                        </div>

                        <div>

                        </div>
                    </div>
            </div>
            <Footer />
        </div>

    )
}