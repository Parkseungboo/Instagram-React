import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from './firebase'
import { useNavigate } from 'react-router-dom'; // useNavigate import

import styles from '../styles/SignUp.module.css'


function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // useNavigate hook

    const handleSubmit = (e) => {
        e.preventDefault();

        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('User signed up:', user);
                alert('회원가입 성공')
                navigate('/SignIn');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error signing up:', errorCode, errorMessage);
                alert('회원가입 실패')
                setEmail('');
                setPassword('');
            });
    };
    return (
        <div className={styles.SignUp}>
            <form onSubmit={handleSubmit}>
                <img src={process.env.PUBLIC_URL + '/kim.gif'} alt="도깨비 김고은" />
                <h1>회원가입</h1>
                <p>이메일 입력</p>
                <input
                    type="email"
                    placeholder="이메일"
                    id="SignUpEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p>비밀번호 입력</p>
                <input
                    type="password"
                    placeholder="비밀번호"
                    id="SignUpPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" value="회원가입" id="SignUpButton" />
                <input type="button" value='로그인 하러 가기' id="SignInMoveButton" onClick={() => navigate('/SignIn')}/>
            </form>
        </div>
    );
}
export default SignUp;