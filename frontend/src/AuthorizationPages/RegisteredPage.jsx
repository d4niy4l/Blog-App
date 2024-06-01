import Header from "../Components/Header";
import { Card} from "flowbite-react";
import {useNavigate} from 'react-router-dom'
export default function RegisteredPage(){
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-10 align-middle justify-center items-center">
            <Header/>
            <Card className="bg-gradient-to-tl from-violet-900 via-gray-800 to-red-700 flex flex-col align-middle items-center justify-center rounded-lg border-none p-5 text-white">
                <h1 className="text-3xl">WELCOME TO BLOGGO!</h1>
                <h1 className="text-md">LOGIN TO START YOUR JOURNEY</h1>
                <button className="hover:opacity-50 hover:scale-110 transition-all bg-gray-700 text-yellow-300 hover:bg-slate-400" onClick={()=>{navigate('/Login')}}>
                    LOGIN
                </button>
            </Card>

        </div>
        )
}