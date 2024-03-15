"use client";
import LoginForm from "@/app/components/ui/login-form";
import { useState } from "react";


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = () => {
        // Do something with email and password
    };
    
    return (
        <div>
            <LoginForm/>
        {/* <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button> */}
        </div>
    );
    };

export default LoginPage;