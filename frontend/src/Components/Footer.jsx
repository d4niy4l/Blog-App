
import { IoLogoGithub } from "react-icons/io"; 
import { FaLinkedin } from "react-icons/fa";
import {DiReact,DiNodejs,DiMongodb} from 'react-icons/di'
import { Link } from "react-router-dom";
import { useState } from 'react'
import logo from './../logo.png'
export default function Footer(){
    const [currentYear] = useState(new Date().getFullYear());
    return(
        <div className = 'bg-black flex flex-col w-full h-fit pt-10 pb-5 sticky top-[100vh]'>
            <div className="flex flex-col text-white align-middle justify-center gap-2 p-5"> 
                <hr/>
                <div className="flex flex-col p-2 gap-8 align-middle justify-center"> 
                    <div className="flex flex-row gap-3 align-middle justify-center p-3">
                        <img src={logo} width="40px" height="10px" alt="logo"/>
                        <h1 className="text-white text-xl">BLOGGO</h1>
                    </div>
                    <div className="flex flex-col gap-1 md:border-b-4 border-white p-2">
                        <code>MOCK BLOG APP WITH USER FUNCTIONALITY</code>
                        <code>MADE BY BREAD</code>
                    </div>
                    <div className="flex flex-row gap-5 align-middle justify-center p-3">
                        <Link className="hover:scale-105 transition-all" to={'https://github.com/d4niy4l'}>
                            <IoLogoGithub  size = {50} color = 'voilet'/>
                        </Link>
                        <button className="hover:scale-105 transition-all">
                            <FaLinkedin size={50}  color="blue"/>
                        </button>
                    </div>
                </div>
                <hr/>
                <div className="flex flex-col justify-center align-middle p-3 gap-3">
                    <code>{ currentYear + " ALL RIGHTS RESERVED"}</code>
                    <code>GITHUB: <Link to = 'https://github.com/d4niy4l?'>d4niy4l</Link></code>
                    <div className="flex xs:flex-row xxs:flex-col align-middle justify-center gap-3 items-center">
                        <DiReact size = {75} color = 'cyan'/>
                        <DiMongodb size = {75} color = 'green'/>
                        <DiNodejs size = {75} color = 'green'/>
                    </div>
                </div>
            </div>
            <div> 
            </div>
        </div>
    )
}