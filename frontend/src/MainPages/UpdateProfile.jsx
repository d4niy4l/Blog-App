import UserNavbar from './../Components/UserNavbar';
import Footer from './../Components/Footer';
import InputFields from './../Components/InputFields'

export default function UpdateProfile(){
    return(
        <div className='flex flex-col overflow-x-hidden gap-5 w-screen'>
            <UserNavbar query = 'Search Profiles'/>

            <Footer />
        </div>

    )
}