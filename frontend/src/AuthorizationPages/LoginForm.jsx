
import { useState, useRef } from 'react';
import logo from './../logo.png'
import { Link,useNavigate } from 'react-router-dom';
import {Input, Button} from '@material-tailwind/react'
import React from "react";
import { FaRegEye } from "react-icons/fa";

export default function LoginForm(props){
    const navigate = useNavigate();
    const[exists,setExist] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const username = useRef(null);
    const password = useRef(null);
    const apiUrl = process.env.REACT_APP_API_URL;
    const handleSubmit = async(event)=>{
        try{
            event.preventDefault();
            const formData = {
            username: username.current.value, password: password.current.value
            }
            const res = await fetch(`${apiUrl}/login`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            })
            const result = await res.json();
            if(res.status === 409){
                console.log('error in login');
                setExist(result.message);
            }
            else if (res.status === 200){
                setExist("");
                props.log(true);
              
                navigate(`/DashBoard?username=${encodeURIComponent(result.username)}&id=${encodeURIComponent(result.id)}`,{replace: true});
            }
        }
        catch(error){
            console.log('server error');
            setExist("SERVER ERROR");
            console.error('Error',error);
        }

    }
    
    return(
        <div className='bg-gradient-to-tl from-violet-900 via-gray-800 to-red-700 shadow-md rounded-lg px-6 py-4 w-full max-w-xs flex flex-col align-middle items-center justify-center gap-5'>
            <form className='flex flex-col gap-8'>
                <div className='text-white  flex flex-col align-middle items-center gap-3 '>
                    <img src = {logo} width = "10%" height = "10%"/>
                    <h1>WELCOME BACK</h1>
                </div>
                <div className="flex w-auto flex-col gap-7 align-middle items-center">
                    <div className="w-60 text-cyan-50">
                        <Input label="Username" className = ' text-white'
                        type = 'text' inputRef={username}
                        labelProps={{
                            className: "text-white",
                        }}
                        containerProps={{ className: "text-white" }}
                        color = 'white'
                        />
                    </div>
                    <div className="w-50  text-cyan-50 flex flex-row justify-end gap-3">
                       {showPassword === false ? 
                       <Input label="Password"  className = ' text-white'
                        type = 'password' inputRef={password}
                        labelProps={{
                            className: "text-white",
                        }}
                        containerProps={{ className: "text-white" }}
                        color = 'white'
                        /> 
                        :
                        <Input label="Password"  className = ' text-white'
                        type = 'text' inputRef={password}
                        labelProps={{
                            className: "text-white",
                        }}
                        containerProps={{ className: "text-white" }}
                        color = 'white'
                        /> 
                        
                        
                        }
                        <button onClick={()=>setShowPassword(!showPassword)}  type="button">
                            <FaRegEye size={20} color = {showPassword ? 'red' : 'white'} className='transition-all'/>
                        </button>
                    </div>
                    <div className="flex w-max gap-4">
                        <Button ripple={true} onClick={handleSubmit}>LOGIN</Button>
                    </div>
                    <small className='text-white hover:text-red-500'><Link to = '/Signup'>DONT HAVE AN ACCOUNT?</Link></small>
                </div>
            </form>
            {exists.length > 0 && <small className='text-red-500'>{exists}</small>}
        </div>
    )
}
