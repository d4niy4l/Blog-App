import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
export default async function GetId(){
    const [cookie,setCookie,removeCookie] = useCookies([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const verify_user = async()=>{
            if(!cookie.jwt)
                navigate('/Login');
            else{ 
                
                const res = await fetch('http://localhost:5000/verify',{
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                const result = await res.json();
                if(!result.status) navigate('/Login');
                console.log(result);
                return result;
            }
        }
        verify_user();
        
    } ,[cookie]);

}