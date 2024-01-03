import { Button} from "@material-tailwind/react";
import { FaTrashCan } from 'react-icons/fa6';
import { useNavigate } from "react-router-dom";
export default function BlogCard(props) {
    const navigate = useNavigate();
    const click = (event)=>{
        navigate(`/Blogs?id=${encodeURIComponent(props.id)}`);
    }
    const delete_blog = async()=>{
        try{
            const res = await fetch('http://localhost:5000/oneBlog',{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id:props.id})
            })
            if(res.ok){
                console.log('deleted successfully');
                props.notifyDeletion(props.id);
            }
        }
        catch(err){
            console.error(err);
        }
        
    }
return (
    <div className="flex flex-col gap-2 rounded-lg p-2 w-300 h-40 matchColor">
    <div className="flex flex-row justify-start align-middle">
        <button className="px-1 pt-1 hover:scale-105 transition-all" onClick={delete_blog}>
            <FaTrashCan color="red"/>
        </button>
    </div>
    <div className="flex flex-col gap-1.5">
        <div className="flex justify-center align-middle">
            <h1 className="text-xl text-yellow-300">
                <b>{props.title}</b>
            </h1>
        </div>
        <p className="whitespace-nowrap overflow-hidden text-ellipsis text-yellow-400 ">
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