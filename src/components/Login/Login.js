import React from 'react';
import Auth from './UseAuth';
import "./Login.css";

const Login = () => {
    const auth = Auth();
    const handleSignIn = () => {
        auth.SignInWithGoogle()
        .then(res => {
            window.location.pathname = "/review";
        })
    }

    const handleSIgnOut = () => {
        auth.signOut()
        .then(res => {
            window.location.pathname = "/";
        })
    }

    return (
        <div>
            <h1>Join Our Page</h1>
            <div className="button">
                {
                    auth.user ? <button onClick={handleSIgnOut}>Sign Out</button> :
                    <button onClick={handleSignIn}>Sign in With Google</button>
                }
            </div>
        </div>
    );
};

export default Login;