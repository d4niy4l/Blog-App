import { Button } from "@material-tailwind/react";
import { FaTrashCan, FaHeart } from 'react-icons/fa6';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

export default function BlogCard(props) {
    const navigate = useNavigate();
    const [cookies] = useCookies(['jwt']);
    const [like, setLike] = useState(false);
    const [complete, setComplete] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (props.likes && !complete) {
            const jwt = cookies.jwt ? jwtDecode(cookies.jwt) : null;
            if (jwt) {
                setLike(props.likes.includes(jwt.id));
            }
            setComplete(true);
        }
    }, [props.likes, complete, cookies]);

    const click = () => {
        navigate(`/Blog?id=${encodeURIComponent(props.id)}`);
    }

    const toggle_like = async () => {
        const jwt = cookies.jwt ? jwtDecode(cookies.jwt) : null;
        if (!jwt) {
            console.error("No JWT found");
            return;
        }
        try {
            const res = await fetch(`${apiUrl}/toggle-like?id=${encodeURIComponent(props.id)}&author_id=${encodeURIComponent(jwt.id)}`, {
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
                <code>
                    <p className="text-yellow-300 text-lg flex flex-row align-middle justify-center gap-1">
                        By <button onClick={() => { navigate(`/Profile?username=${props.author}`) }}>{props.author}</button>
                    </p>
                </code>
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
