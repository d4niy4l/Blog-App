import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom'
export default function SearchComponent(props) {
    const [query,setQuery] = useState('');
    const navigate = useNavigate();
    const search = ()=>{
        if(query.trim() != ''){
            navigate(`/Search?type=${props.query === 'Search Profiles' ? 1 : 2}&search=${query}`);
            if(props.refreshSearch !== undefined)
                props.refreshSearch(props.refresh + 1);
        }
    }
    return (
        <div className="flex matchColor rounded-lg">
            <div className="flex  flex-row items-center focus:scale-105 rounded-lg">
                <input
                    type="text"
                    className="block w-full px-3  text-yellow-300 matchColor border-none focus:ring-0 rounded-lg "
                    placeholder={`${window.innerWidth > 400 ? props.query : '🔎︎'}`}
                    onChange={(e)=>{
                        setQuery(e.target.value);
                    }} 
                />
                <button className=" text-white matchColor rounded-r-lg px-3 py-1 border-l border-yellow-300" onClick={search}>
                    <CiSearch size={25}/>
                </button>
            </div>
        </div>
    );
}