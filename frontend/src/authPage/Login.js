
import LoginForm from "./LoginForm"; 
import Header from '../Components/Header'
import Footer from "../Components/Footer";
export default function Login(props){
    return(
        <div className="flex flex-col align-middle items-center gap-10 overflow-x-hidden">
            <Header/>
            <div>
                <div>
                    {<LoginForm  logged = {props.logged} setLogged = {props.setLogged} log = {props.log}/> }
                </div>
            </div>
            <Footer/>
        </div>
    )
}