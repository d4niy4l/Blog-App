import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function VerifyUser() {
    const [cookies] = useCookies(['jwt']);
    const navigate = useNavigate();

    useEffect(() => {
        const verify_user = async () => {
            if (typeof cookies.jwt !== 'string') {
                console.log("No JWT found in cookies. Redirecting to /Login.");
                navigate('/Login');
            } else {
                try {
                    const res = await fetch('http://localhost:5000/verify', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${cookies.jwt}`,
                        },
                    });
                    if (res.ok) {
                        const result = await res.json();
                        console.log("Verification Result:", result);
                        // You can add additional logic based on the verification result if needed
                    } else {
                        console.log("Verification failed. Redirecting to /Login.");
                        navigate('/Login');
                    }
                } catch (error) {
                    console.error("Error during verification:", error);
                    navigate('/Login');
                }
            }
        };

        verify_user();
    }, [cookies, navigate]);

    // Return null or any UI if needed
    return null;
}
