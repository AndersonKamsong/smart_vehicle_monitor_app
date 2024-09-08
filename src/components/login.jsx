import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = async () => {
        console.log(data)
        alert(JSON.stringify(data))
        // submit logic to backend
    }
    return (
        <div>
            <h1 className='display-1'>Login Form</h1>
        </div>
    )
}
