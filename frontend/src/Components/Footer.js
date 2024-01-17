import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io"; 
import { FaLinkedin } from "react-icons/fa";
import {DiReact,DiNodejs,DiMongodb} from 'react-icons/di'
import { Link } from "react-router-dom";

import logo from './../authPage/logo.png'
export default function Footer(){
   
    return(
        <div className = 'bg-black flex flex-col w-full h-fit pt-10 pb-5'>
            <div className="flex flex-col text-white align-middle justify-center gap-2 p-5"> 
                <hr/>
                <div className="flex flex-col p-3 gap-8 align-middle justify-center"> 
                    <div className="flex flex-row gap-3 md:border-b-4 border-whitealign-middle justify-center p-3">
                        <img src={logo} width="40px" height="10px" />
                        <h1 className="text-white text-xl">BLOGGO</h1>
                    </div>
                    <div className="flex flex-col gap-2 md:border-b-4 border-white p-3">
                        <code>MOCK NOTES APP WITH USER FUNCTIONALITY</code>
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
                    <code>2023 ALL RIGHTS RESERVED</code>
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