
import {useNavigate} from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer';
export default function LandingPage(){
    const navigate = useNavigate();
   const gotoLogin = ()=>{
        navigate('/Login');
   }
   const gotoSignin = ()=>{
        navigate('/Signup');
   }
    return (
        <div className='flex flex-col overflow-x-hidden'>
            <Header />
            <div className='flex flex-row w-full h-screen'>
                    <div
                        className='flex flex-row w-1/2 h-full'
                        style={{
                        backgroundImage: `url('https://i.pinimg.com/originals/ed/74/70/ed74701e5dfb9c1dce905a11468885ee.png')`,
                        backgroundSize: 'cover', // Adjust the background size property
                        }}
                    ></div>
                    <div className='flex flex-col w-1/2 h-full align-middle justify-center gap-10' style={{backgroundColor: '#191919'}}>
                        <div className='flex flex-col align-middle justify-center gap-5' style={{color:'#ECDB3A'}}>
                            <h1 className='md:text-9xl xxs:text-4xl'>BLOGGO</h1>
                            <h4>SHARE YOUR NOTES WITH OTHERS</h4>
                        </div>
                        <div className='text-yellow-300 flex xs:flex-row xxs:flex-col gap-5 align-middle justify-center xxs:items-center'>
                            <button className='bg-gray-700 xxs:p-3 xs:text-xl xs:p-5 rounded-lg hover:bg-slate-400 hover:scale-110 transition-all'
                                onClick={gotoLogin} 
                            >
                                LOGIN
                            </button>
                            <button className='bg-gray-700 xxs:p-3 xs:text-xl rounded-lg xs:p-5 hover:bg-slate-400 hover:scale-110 transition-all'
                                    onClick = {gotoSignin}
                            >
                                SIGNUP
                            </button>
                        </div>
                    </div>
            </div>
            <Footer/>
        </div>
    )
}
