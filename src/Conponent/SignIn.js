import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from './firebase'
import { useNavigate } from 'react-router-dom'; // useNavigate import
import styles from '../styles/SignIn.module.css'


function SignIn(){
    const [email, inputEmail] = useState('');
    const [password, inputPassword] = useState('');
    const navigate = useNavigate(); // useNavigate hook

    const handleSubmit = (e) => {
        e.preventDefault();

        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('User signed In:', user);
                alert('로그인 성공')
                navigate('/Main', { state: { email: user.email } });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error signing In:', errorCode, errorMessage);
                window.alert('로그인 실패')
                inputEmail('');
                inputPassword('');

            });
    };
    return(
        <div className={styles.SignIn}>
            <form onSubmit={handleSubmit}>
                <img src={process.env.PUBLIC_URL + '/kim1.gif'} alt='야구 김고은' />
                <h1>로그인</h1>
                <p>이메일</p>
                <input 
                    type='email'
                    placeholder='이메일'
                    id='SignInEmail'
                    value={email}
                    onChange={(e) => inputEmail(e.target.value)}
                    required
                />
                <p>비밀번호</p>
                <input
                    type='password'
                    placeholder='비밀번호'
                    id='SignInPassword'
                    value={password}
                    onChange={(e) => inputPassword(e.target.value)}
                    required
                />
                <input type='submit' value='로그인' id='SignInButton'/>
                <input type="button" value='회원가입 하러 가기' id="SignUpMoveButton" onClick={() => navigate('/SignUp')}/>
            </form>
        </div>
    );
}

export default SignIn;