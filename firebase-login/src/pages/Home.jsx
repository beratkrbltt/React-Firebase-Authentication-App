import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import { FaCircleUser } from "react-icons/fa6";
import '../css/Home.css';

function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userCredential) => {
            if (userCredential) {
                setUser(userCredential.email);
            } else {
                navigate('/');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    if (user === null) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <div className="welcome">
            <FaCircleUser className="auth-icons" /> Merhaba {user}
        </div>
    );
}

export default Home;
