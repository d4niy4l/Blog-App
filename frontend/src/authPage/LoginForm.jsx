
import { useState, useRef } from 'react';
import logo from './../logo.png'
import { Link,useNavigate } from 'react-router-dom';
import {Input, Button} from '@material-tailwind/react'
import React from "react";

export default function LoginForm(props){
    const navigate = useNavigate();
    const[exists,setExist] = useState('');
    const username = useRef(null);
    const password = useRef(null);
    const apiUrl = process.env.REACT_APP_API_URL;
    console.log(apiUrl);
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
            console.log('poop');
            const result = await res.json();
            if(res.status === 409){
                console.log('error in login');
                setExist(result.message);
            }
            else if (res.status === 200){
                setExist("");
                props.log(true);
               // props.setLogged(result);
                //localStorage.setItem("user",JSON.stringify(result));
                //console.log("data: ",result);
                navigate(`/DashBoard?username=${encodeURIComponent(result.username)}&id=${encodeURIComponent(result.id)}`);
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
                    <div className="w-50 text-cyan-50">
                        <Input label="Username" className = ' text-white'
                        type = 'text' inputRef={username}
                        labelProps={{
                            className: "text-white",
                        }}
                        containerProps={{ className: "text-white" }}
                        />
                    </div>
                    <div className="w-50">
                        <Input label="Password"  className = ' text-white'
                        type = 'password' inputRef={password}
                        labelProps={{
                            className: "text-white",
                        }}
                        containerProps={{ className: "text-white" }}
                        />
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
