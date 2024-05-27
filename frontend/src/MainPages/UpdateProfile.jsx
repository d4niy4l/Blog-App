import UserNavbar from './../Components/UserNavbar';
import Footer from './../Components/Footer';
import { Input } from '@material-tailwind/react';
import { useLocation, useNavigate } from 'react-router-dom'
import VerifyUser from '../authPage/VerifyUserHook';
import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { useEffect, useState, useRef } from 'react';
import { FaRegUser } from "react-icons/fa";
import Modal from '../Components/Modal';

import axios from 'axios';

function changeUsernameForm(){
    return(
        <div>

        </div>
    )
}

export default function UpdateProfile(){
    VerifyUser();
    const navigate = useNavigate();
    const [cookie] = useCookies();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const username = query.get('username');
    const id = query.get('id');
    const apiUrl = process.env.REACT_APP_API_URL;
    const [profileData,setProfileData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [imageUrl,setImageUrl] = useState('');
    const [imgHover, setImgHover] = useState(false);
    const [newBio, setNewBio] = useState('');
    const [dimensions, setDimensions] = useState({});
    const bio_ref = useRef(null);   
   
    const jwt = jwtDecode(cookie.jwt);                         
    const bioOnChange = (event)=>{
        const { value } = event.target;
        setNewBio(value);
    }
    if(id !== jwt.id){
        alert('Invalid Token');
        navigate('/Login');
    }
    
    useEffect(() => {
        console.log('hello')
        const verify_user = async () => {
            if (typeof cookie.jwt !== 'string') {
                console.log("No JWT found in cookies. Redirecting to /Login.");
                navigate('/Login');
            } else {
                const res = await fetch(`${apiUrl}/verify`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const result = await res.json();
                console.log("Verification Result:", result);
            }
        };
        verify_user();
    }, [cookie, navigate]);
    const uploadImage = async (e) => {
      const file = e.target.files[0]; 
      console.log(file);
      if (file){
          try {
            const formData = new FormData();
            formData.append('image', file);
        
            formData.append('user_id', profileData.id);
        
            const response = await axios.post(`${apiUrl}/pfp`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
        
            if (response.status === 200) {
              const result = response.data; // Assuming the server returns JSON data
              setImageUrl(result.imageUrl);
              console.log(result);
            } else {
              alert('Unexpected error, please login again');
              navigate('/Login');
            }
            e.target.value = '';
          } catch (err) {
            console.log('Error uploading image: ', err);
          }

        }
      }
        
    const uploadBio = async (event)=>{
        event.preventDefault();
        const result = await fetch(`${apiUrl}/update-bio`,{
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
        if(!cookie.jwt)  navigate('/Login');
        const getUserData = async ()=>{
            const token = jwtDecode(cookie.jwt);
            if(!token) navigate('/Login');
            const id = token.id;
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
            console.log(profileData.id);
            console.log(id);
        }
        getUserData();
    
        
    }, []);

 

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/pfp?user_id=${encodeURIComponent(jwt.id)}`, {
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




    return(
        <div className='flex flex-col overflow-x-hidden gap-5 w-screen'>
            <UserNavbar query = 'Search Profiles'/>
            <div className="flex flex-col matchColor gap-3">
                    <div className="flex flex-row align-middle justify-center gap-2 matchColor p-5">
                        <div className="flex flex-col gap-3 p-3 align-middle items-center">
                            <div className='flex flex-col align-middle justify-center gap-2'>
                                <label htmlFor="popup_btn" className='cursor-pointer relative' onMouseEnter={()=>{setImgHover(true)}} onMouseLeave={()=>setImgHover(false)}>
                                    {imageUrl ?
                                    <img src = {imageUrl} alt="pfp" width={200} height={200} 
                                    className="rounded-full hover:grayscale z-10"/> : <FaRegUser color="yellow" size={30} />}
                                    <p className={'relative bottom-28 text-white transition-opacity duration-300 ' + (imgHover ? "opacity-100" : "opacity-0")}>Change Picture</p>    
                                </label>
                                
                                <button
                                    className="hidden"
                                    type="button"
                                    id = "popup_btn"
                                    onClick={() => setShowModal(true)}
                                >
                                </button>
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
                       {showModal ? (
                         <>
                            <div
                                className="text-yellow-300 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            >
                                <div className="relative w-auto my-5 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full matchColor outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 rounded-t text-center gap-3">
                                    <h3 className="text-3xl font-semibold">
                                        Change Profile Picture
                                    </h3>
                                    <button
                                        className=" ml-auto border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <div className='text-red-600 h-6 w-6 text-2xl block focus:outline-none opacity-100'>
                                            X
                                        </div>
                                    </button>
                                    </div>
                                    {/*body*/}
                                    <div className='flex flex-row gap-2 justify-between p-4'>
                                        <input type = 'file' id = 'img_upload' className= 'hidden' onChange={uploadImage}/>
                                        <label htmlFor='img_upload'>
                                 
                                            <button className='p-3 bg-gray-800 rounded-lg hover:scale-105 hover:bg-slate-600 transition-all' onClick = {()=>{document.getElementById('img_upload').click()}}>
                                                Add From Gallery
                                            </button>
                                        </label>
                                        <button className='p-3 bg-gray-800 rounded-lg hover:scale-105 hover:bg-slate-600 transition-all'>Remove Profile Picture</button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                        ) : null}




                    </div>
                    <div className='flex flex-col matchColor gap-5 align-middle justify-center p-5'>
                        <div className='flex flex-col matchColor gap-5 items-center'>
                            <button className="font-semibold text-yellow-300 text-lg p-3 bg-gray-800 rounded-lg hover:scale-105 hover:bg-slate-600 transition-all">CHANGE USERNAME</button>
                            <button className=" font-semibold text-yellow-300 text-lg p-3 bg-gray-800 rounded-lg hover:scale-105 hover:bg-slate-600 transition-all">CHANGE PASSWORD</button>
                            <button className= " font-semibold text-yellow-300 text-lg p-3 bg-gray-800 rounded-lg hover:scale-105 hover:bg-slate-600 transition-all">CHANGE EMAIL</button>
                        </div>
                    </div>
            </div>
            <Footer />
        </div>

    )
}