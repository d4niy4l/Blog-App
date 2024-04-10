import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';


export default function ProfileCard({username}){
    const [imageUrl, setImageUrl] = useState('');
    const [cookie] = useCookies();
    const jwt = jwtDecode(cookie.jwt);
    useEffect(() => {
        let objectUrl; // Declare a variable to store the object URL
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:5000/pfp?user_id=${encodeURIComponent(jwt.id)}`, {
              method: 'GET',
            });
            const blob = await response.blob(); // Convert response to a Blob object
            objectUrl = URL.createObjectURL(blob); // Convert Blob to a data URL
            setImageUrl(objectUrl);
          } catch (error) {
            console.error('Error fetching image:', error);
          }
        };
        fetchData();
        return () => {
          if (objectUrl) {
            URL.revokeObjectURL(objectUrl);
          }
        };
    return(
        <div>

        </div>

    )
}