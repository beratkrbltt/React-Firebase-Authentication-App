import React, { useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    sendEmailVerification,
    sendPasswordResetEmail
} from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import '../css/Auth.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import { RegisterFormSchemas } from '../schemas/RegisterFromSchemas';

const provider = new GoogleAuthProvider();

function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginWithGoogle = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            const user = response.user;
            if (user) {
                navigate("/home");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const login = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            const user = response.user;

            // E-posta doğrulama kontrolü
            if (!user.emailVerified) {
                toast.error("E-posta adresiniz doğrulanmamış. Lütfen e-postanızı kontrol edin.");
                return;
            }

            toast.success("Giriş başarılı!");
            navigate("/home");
        } catch (error) {
            toast.error("Giriş yapılamadı: " + error.message);
        }
    };

    const register = async () => {
        try {
            await RegisterFormSchemas.validate({ email, password }, { abortEarly: false });

            const response = await createUserWithEmailAndPassword(auth, email, password);
            const user = response.user;

            // E-posta doğrulama gönder
            await sendEmailVerification(user);
            toast.success("Kayıt başarılı! Lütfen e-posta adresinizi doğrulayın.");

            setEmail('');
            setPassword('');
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                toast.error("Bu e-posta adresi zaten kullanımda. Lütfen giriş yapmayı deneyin veya şifrenizi sıfırlayın.");
            } else if (error.name === "ValidationError") {
                error.errors.forEach(err => toast.error(err));
            } else {
                toast.error(error.message);
            }
        }
    };

    const resetPassword = async () => {
        try {
            if (!email) {
                toast.error("Şifre sıfırlama için lütfen e-posta adresinizi girin.");
                return;
            }

            await sendPasswordResetEmail(auth, email);
            toast.success("Şifre sıfırlama e-postası gönderildi! Lütfen e-postanızı kontrol edin.");
        } catch (error) {
            toast.error("Şifre sıfırlama işlemi başarısız: " + error.message);
        }
    };

    return (
        <div className='auth-container'>
            <form className="auth-form">
                <h1 className="auth-form-title">Giriş Yap / Kaydol</h1>

                {/* Email Input */}
                <div className='auth-input-group'>
                    <label htmlFor="email" className="auth-label">Email</label>
                    <input
                        type="text"
                        id='auth-email'
                        className="auth-input"
                        placeholder='Email Giriniz...'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password Input */}
                <div className='auth-input-group'>
                    <label htmlFor="password" className="auth-label">Şifre</label>
                    <input
                        type="password"
                        id='auth-password'
                        className="auth-input"
                        placeholder='Şifrenizi Giriniz...'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Buttons */}
                <div className='auth-button-group'>
                    <button type="button" onClick={loginWithGoogle} className="auth-button">
                        <FaGoogle className='auth-icons' />Google ile Bağlan
                    </button>
                    <button type="button" onClick={login} className="auth-button">
                        <IoLogIn className='auth-icons' />Giriş Yap
                    </button>
                    <button type="button" onClick={register} className="auth-button">
                        <FaUserPlus className='auth-icons' />Kaydol
                    </button>
                </div>
                <button type="button" onClick={resetPassword} className="auth-reset-button">
                    Şifremi Unuttum
                </button>
            </form>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick={true}
            />
        </div>
    );
}

export default Auth;
