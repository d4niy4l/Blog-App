import Header from "../Components/Header"
import SignForm from "./SignForm"
export default function SignIn(){
    return(
        <div className="flex flex-col align-middle items-center gap-10">
            <Header/>
            <SignForm/>
        </div>
    )
}