
import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef} from 'react';
import { Input, Button } from '@material-tailwind/react';
import logo from './logo.png';
export default function SignForm(){
    const navigate = useNavigate();
    const username = useRef(null);
    const password = useRef(null);
    const passwordConfirm = useRef(null);
    const email = useRef(null);
    const [validPass,setValidPass] = useState(true);
    const [validEmail,setValidEmail] = useState(true);
    const [validName,setValidName] = useState(true);
    const [passMatch, setPassMatch] = useState(true);
    const  [match, setMatch] = useState('');
    const [exists, setExists] = useState('');
    const isValidEmail = (email)=>{
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }
    function isValidPassword(password) {
        const lacksUppercase = !/(?=.*[A-Z])/.test(password);
        const lacksLowercase = !/(?=.*[a-z])/.test(password);
        const lacksDigit = !/(?=.*\d)/.test(password);
        let result = '';
        if (lacksUppercase) {
          result += "UPPERCASE CHARACTER";
        }
        if (lacksLowercase) {
            if(result.length > 0) result += ', '
            result += "LOWERCASE CHARACTER";
        }
        if (lacksDigit) {
            if(lacksUppercase || lacksLowercase) result += ' and '
            result += "DIGIT";
        }
        return result.length > 0 ? `Password requires atleast one ` + result  : '';
      }
    const verifyPassword = () =>{
        if(passwordConfirm.current.value !== password.current.value) 
            setPassMatch(false);
        setPassMatch(true);
    }
    const submit = async(event)=>{
        event.preventDefault();
        setMatch(isValidPassword(password.current.value));
        if(match.length > 0)
            setValidPass(false);
        if(password.current.value.length === 0){
            setValidPass(false);
            setMatch("FIELD CANNOT BE EMPTY");
        } 
        else{
            if(match.length === 0) setValidPass(true);
        }
        if(!isValidEmail(email.current.value))  setValidEmail(false);
        else setValidEmail(true);
        if(username.current.value.length === 0) setValidName(false);
        else setValidName(true);
        verifyPassword();
        if(!validEmail || !validName || !validPass || !passMatch) return;
        const formData = {
            username: username.current.value,
            password: password.current.value,
            email: email.current.value
        }
        const res = await fetch('http://localhost:5000/signup',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const message = await res.json();
        console.log(res.status);
        if(res.status === 409 || res.status === 500){
            setExists(message.message);
            return;
        }
        else{
            setExists('');
            navigate('/Registered')
        }
    }
    return(
        <div className='bg-gradient-to-tl from-violet-900 via-gray-800 to-red-700 shadow-md rounded-lg px-6 py-4 w-full max-w-sm'>
            <div className='flex flex-col gap-6'>
                <div className = 'text-white  flex flex-col align-middle items-center gap-3 '>
                    <img src = {logo} width = "10%" height = "10%"/>    
                    <h4 style = {{color: 'white'}}><b>JOIN US</b></h4>
                </div>
                <div className='w-full bg-white h-0.5'></div>
                <form onSubmit={submit} className='flex flex-col gap-8 py-3'>
                    <div>
                        <Input label="Username" className = { (validName ? 'text-white focus:border-white' : 'text-red-500 border-red-600  focus:border-red-600')}
                            type = 'text' inputRef={username}
                            labelProps={{
                                className: "text-white border-white",
                            }}
                            containerProps={{ className: "text-white" }} required = {true}
                            
                        />
                        {!validName && <small className={'text-xs text-red-500'}>FIELD CANNOT BE EMPTY</small>}
                    </div>
                    <div>
                    <Input label="Password" className = { (validPass ? 'text-white focus:border-white' : 'text-red-500 border-red-600  focus:border-red-600')}
                        type = 'password' inputRef={password}
                        labelProps={{
                            className: "text-white",
                        }}
                        containerProps={{ className: "text-white" }}
                        required = {true}
                    />
                    {!validPass && <small className={'text-xs text-red-500'}>{match}</small>}
                    </div>
                    <div>
                    <Input label="Confirm Password" className = {(passMatch ? 'text-white focus:border-white' : 'text-red-500 border-red-600  focus:border-red-600')}
                        type = 'password' inputRef={passwordConfirm}
                        labelProps={{
                            className: "text-white",
                        }}
                        containerProps={{ className: "text-white" }}
                        required = {true}
                    />
                    {!passMatch && <small className={'text-xs text-red-500'}>PASSWORDS DO NOT MATCH</small>}
                    </div>
                    <div>
                    <Input label="Email" className = { validEmail ? 'text-white focus:border-white' : 'text-red-500 border-red-600 focus:border-red-600'}
                        type = 'email' inputRef={email}
                        labelProps={{
                            className: "text-white",
                        }}
                        containerProps={{ className: "text-white" }}
                        required = {true}
                    />
                    {!validEmail && <small className={'text-xs text-red-500'}>INVALID EMAIL FORMAT</small>}
                    </div>
                    <div className="flex gap-10 align-middle justify-center items-center">
                        <small className=' text-white hover:text-red-500 transition-all'><Link to = '/Login'>ALREADY A MEMBER?</Link></small>
                        <Button ripple={true} onClick={submit} className='hover:scale-105 hover:opacity-50 transition-all'>REGISTER</Button>
                    </div>
                    <small className='text-red-500'>{exists}</small>
                </form>
            </div>
        </div>
    )
}