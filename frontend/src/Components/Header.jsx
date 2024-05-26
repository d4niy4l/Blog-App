import logo from './../logo.png'
import { useNavigate, useLocation } from "react-router-dom";
export default function Header(prop){
    const navigate = useNavigate();
    const location = useLocation();
    
    const navigateToLanding = ()=>{
        if(location.pathname === '/'){
            if(prop.refNode.current)
                prop.refNode.current.scrollIntoView({behavior: 'smooth'});
        }
        else navigate('/');
    }
    return(
        <div className="bg-gradient-to-t from-violet-900 via-gray-800 to-red-700 w-screen min-h-fit flex items-center justify-center py-5 px-5">
        <div className="flex flex-row gap-5 items-center">
          <img src={logo} width="40px" height="40px" />
          <h1 className="text-white text-xl">BLOGGO</h1>
        </div>
      </div>
      
       )
}