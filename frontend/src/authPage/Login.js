
import LoginForm from "./LoginForm"; 
import Header from '../Components/Header'
export default function Login(props){
    return(
        <div className="flex flex-col align-middle items-center gap-10">
            <Header/>
            <div>
                <div>
                    {<LoginForm  logged = {props.logged} setLogged = {props.setLogged} log = {props.log}/> }
                </div>
            </div>
        </div>
    )
}