import Header from "../Components/Header"
import SignForm from "./SignForm"
import Footer from "../Components/Footer"
export default function SignIn(){
    return(
        <div className="flex flex-col align-middle items-center gap-5 overflow-x-hidden">
            <Header/>
            <SignForm/>
            <Footer/>
        </div>
    )
}