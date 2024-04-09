import { VscCommentUnresolved } from "react-icons/vsc";
import {useNavigate} from 'react-router-dom';
export default function CommentCard(props){
    const navigate = useNavigate();
    const click = () => {
        navigate(`/Profile?username=${props.author}`)
    }
    return(
        <div className="flex flex-col gap-5 matchColor rounded-lg p-3">
            <div className="flex justify-start p-1 flex-row gap-3 align-middle">
                <VscCommentUnresolved size= {30} color="yellow"/>
                    <h1 className="text-2xl text-yellow-300 flex flex-row gap-2"> 
                    <button onClick={click} className="flex justify-center align-middle hover:text-red-700 hover:scale-105 transition-all">
                        {props.author}
                    </button> 
                    commented: </h1>
            </div>
            <div className="flex border-t-2 border-black justify-start p-1 text-left">
                <p className="text-lg text-yellow-300 px-2">{props.body}</p>
            </div>
        </div>
    )
}