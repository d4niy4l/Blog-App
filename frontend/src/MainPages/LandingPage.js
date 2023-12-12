
import {useNavigate} from 'react-router-dom'
import Header from '../Components/Header'

export default function LandingPage(){
    const navigate = useNavigate();
   const gotoLogin = (event)=>{
        navigate('/Login');
   }
   const gotoSignin = (event)=>{
        navigate('/Signup');
   }
    return (
        <div className='flex flex-col h-screen'>
            <Header />
            <div className='flex flex-row w-full h-full'>
                    <div
                        className='flex flex-row w-1/2 h-full'
                        style={{
                        backgroundImage: `url('https://i.pinimg.com/originals/ed/74/70/ed74701e5dfb9c1dce905a11468885ee.png')`,
                        backgroundSize: 'cover', // Adjust the background size property
                        }}
                    ></div>
                    <div className='flex flex-col w-1/2 h-full bg-gradient-to-t from-orange-700 via-yellow-600-800 to-gray-600 align-middle justify-center gap-10'>
                        <div className='flex flex-col align-middle justify-center gap-5'>
                            <h1 className='text-8xl'>BLOGGO</h1>
                            <h4>SHARE YOUR NOTES WITH OTHERS</h4>
                        </div>
                        <div className='flex flex-row gap-10 align-middle justify-center'>
                            <button className='bg-blue-500 p-3 rounded-lg hover:bg-slate-400 hover:scale-110 transition-all'
                                onClick={gotoLogin}
                            >
                                LOGIN
                            </button>
                            <button className='bg-blue-500 p-3 rounded-lg hover:bg-slate-400 hover:scale-110 transition-all'
                                    onClick = {gotoSignin}
                            >
                                SIGNUP
                            </button>
                        </div>
                    </div>
            </div>
        </div>
    )
}
