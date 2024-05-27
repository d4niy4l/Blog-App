import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";

export default function ProfileCard({username, user_id,  joined_date}){
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(()=>{
      const fetchData = async () => {
          try {
              const response = await fetch(`${apiUrl}/pfp?user_id=${encodeURIComponent(user_id)}`, {
              method: 'GET',
          });
          const result = await response.json();
          setImageUrl(result.url);
          } catch (error) {
              console.error('Error fetching image:', error);
          }
      };
      fetchData();
  },[]);
    return(
      <div className="flex flex-col p-3 gap-2 matchColor rounded-lg">
      <div className="flex flex-col gap-1 p-3 align-middle items-center">
          {imageUrl ? <img src = {imageUrl} alt="pfp" width={75} height={75} className="rounded-full"/> : <FaRegUser color="yellow" size={30} />}
          <b><h1 className="text-3xl text-yellow-300">{username}</h1></b>
      </div>
      <div>
        <button onClick={()=>navigate(`/Profile?username=${encodeURIComponent(username)}`)} 
        class="font-semibold text-yellow-300 text-lg p-3 bg-gray-800 rounded-lg hover:scale-105 hover:bg-slate-600 transition-all">
          VISIT</button>
      </div>
    </div>

    )
}