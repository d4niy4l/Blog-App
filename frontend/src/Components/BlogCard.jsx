import { Button } from "@material-tailwind/react";
import { FaTrashCan, FaHeart } from 'react-icons/fa6';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BlogCard(props) {
    const navigate = useNavigate();
    const [like, setLike] = useState(false);
    const [complete, setComplete] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(()=>{
        const getPfp = async()=>{
            try {
                const response = await fetch(`${apiUrl}/pfp?username=${encodeURIComponent(props.author)}`, {
                    method: 'GET',
                });
                const imageData = await response.json();
                setImageUrl(imageData.url);
            } catch (error) {
                console.error(error);
            }
        }
        getPfp();
    },[])

    useEffect(() => {
        const get_like = async ()=>{
            const res = await fetch(`${apiUrl}/verify`,{
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const result = await res.json();
            if(result.status === false){
                alert("SESSION EXPIRED");
                return;
            }
            if (props.likes && !complete) {
                const id = result.id;
                console.log('user id: ',id);
                setLike(props.likes.includes(id));
                setComplete(true);
            }
        }
        get_like();
    }, [props.likes, complete]);

    const click = () => {
        navigate(`/Blog?id=${encodeURIComponent(props.id)}`);
    }

    const toggle_like = async () => {
       
        try {
            const res = await fetch(`${apiUrl}/toggle-like?id=${encodeURIComponent(props.id)}`, {
                method: 'GET',
                credentials: 'include'
            });
            if (res.status === 200) {
                setLike(!like);
            } else {
                console.error("Failed to toggle like");
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    }

    const delete_blog = async () => {
        try {
            const res = await fetch(`${apiUrl}/oneBlog`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: props.id }),
                credentials: 'include'
            });
            if (res.ok) {
                console.log('Deleted successfully');
                props.notifyDeletion(props.id);
            } else {
                console.error("Failed to delete blog");
            }
        } catch (err) {
            console.error("Error deleting blog:", err);
        }
    }

    return (
        <div className={"flex flex-col gap-1 rounded-lg p-2 w-300 matchColor " + (props.notifyDeletion ? "h-40" : "")}>
            <div className={"flex flex-row align-middle " + (props.notifyDeletion ? "justify-between" : "justify-end")}>
                {props.notifyDeletion && (
                    <button className="px-1 pt-1 hover:scale-105 transition-all" onClick={delete_blog}>
                        <FaTrashCan color="red" />
                    </button>
                )}
                <button className={"px-1 pt-1 hover:scale-105 transition-all"} onClick={toggle_like}>
                    <FaHeart color={like ? 'red' : 'black'} size={25} />
                </button>
            </div>
            {props.main && (
                    <button onClick={() => { navigate(`/Profile?username=${props.author}`) }} className="flex items-center flex-col  text-yellow-300 hover:text-red-600 hover:scale-105 transition-all">
                        <img src = {imageUrl} alt = 'pfp' className="rounded-full" width = {50} height = {50}/>
                        <h1 className="font-semibold text-lg flex flex-row align-middle justify-center gap-1">
                            {props.author}
                        </h1>
                    </button>
            )}
            <div className="flex flex-col gap-1.5">
                <div className="flex justify-center align-middle">
                    <h1 className="text-xl text-yellow-300">
                        <b>{props.title}</b>
                    </h1>
                </div>
                <p className="whitespace-nowrap overflow-hidden text-ellipsis text-yellow-400">
                    <small>{props.body}</small>
                </p>
            </div>
            <div className="flex flex-col p-2 justify-center align-middle items-center">
                <Button size="sm" ripple className="flex items-center gap-2 text-yellow-300" onClick={click}>
                    CLICK TO READ
                </Button>
            </div>
        </div>
    );
}
