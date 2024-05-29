import { useEffect, useState } from "react";
import { VscCommentUnresolved } from "react-icons/vsc";
import {useNavigate} from 'react-router-dom';
export default function CommentCard(props){
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;
    const click = () => {
        navigate(`/Profile?username=${props.author}`)
    }
    useEffect(()=>{
        const getPfp = async()=>{
            try{
                const response = await fetch(`${apiUrl}/pfp?username=${encodeURIComponent(props.author)}`, {
                    method: 'GET',
                    });
                    const imageData = await response.json();
                    setImageUrl(imageData.url);
            }catch(err){
                console.error(err);
            }
        }
        getPfp();
    },[]);
    return(
        <div className="flex flex-col gap-5 matchColor rounded-lg p-3">
            <div className="flex justify-start p-1 flex-row gap-3 align-middle">
                    <button onClick={click} className="flex justify-center align-middle items-center gap-3 text-yellow-300 hover:text-red-700 hover:scale-105 transition-all">
                        <img alt = 'pfp' src = {imageUrl} className="rounded-full" width = {50} height = {50}/>
                        <h1 className="text-2xl gap-2"> 
                            {props.author}
                        </h1>
                    </button> 
            </div>
            <div className="flex border-t-2 border-black justify-start p-1 text-left">
                <p className="text-lg text-yellow-300 px-2">{props.body}</p>
            </div>
        </div>
    )
}