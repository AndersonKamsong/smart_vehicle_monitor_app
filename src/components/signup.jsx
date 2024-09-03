import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [data, setData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        isAgree: false
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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-7 login_one_image text-center">
                        <div className="btn btn-primary btn-block w-100 mt-3">
                            <h1 style={{ color: "white" }}>Welcome to MECANO</h1>
                        </div>
                    </div>
                    <div className="col-xl-5 p-0">
                        <div className="login-card login-dark login-bg">
                            <div>
                                <div>
                                    <a className="logo">
                                        <img className="img-fluid for-light" alt="looginpage" />
                                    </a>
                                </div>
                                <div className="login-main">
                                    <div className="theme-form">
                                        <h2>Create your account</h2>
                                        <p>Enter your personal details to create account</p>
                                        <div className="form-group">
                                            <label className="col-form-label pt-0">Your Name</label>
                                            <div className="row g-2">
                                                <div className="col-6">
                                                    <input className="form-control" type="text" required=""
                                                        placeholder="First name"
                                                        value={data.fname}
                                                        onChange={(e) => { setData({ ...data, fname: e.target.value }) }}
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <input className="form-control" type="text" required=""
                                                        placeholder="Last name"
                                                        value={data.lname}
                                                        onChange={(e) => { setData({ ...data, lname: e.target.value }) }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label">Email Address</label>
                                            <input className="form-control" type="email"
                                                required="" placeholder="Test@gmail.com"
                                                value={data.email}
                                                onChange={(e) => { setData({ ...data, email: e.target.value }) }}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label">Password</label>
                                            <div className="form-input position-relative">
                                                <input className="form-control"
                                                    type={showPassword
                                                        ? "text" : "password"}
                                                    name="login[password]" required=""
                                                    placeholder="*********"
                                                    value={data.password}
                                                    onChange={(e) => { setData({ ...data, password: e.target.value }) }} />
                                                <div className="show-hide" onClick={handleShowPassword}>
                                                    <span className="">{showPassword ? 'Hide' : 'Show'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group mb-0 checkbox-checked">
                                            <div className="form-check checkbox-solid-info">
                                                <input className="form-check-input" id="solid6"
                                                    type="checkbox"
                                                    checked={data.isAgree}
                                                    onChange={(e) => { setData({ ...data, isAgree: !data.isAgree }) }}
                                                />
                                                <label className="form-check-label" for="solid6">Agree with</label><a className="ms-3 link" href="forget-password.html">Privacy Policy</a>
                                            </div>
                                            <button className="btn btn-primary btn-block w-100 mt-3"
                                                onClick={handleSubmit} >Create Account</button>
                                        </div>
                                        <div className="login-social-title">
                                            <h6>Or Sign in with                 </h6>
                                        </div>
                                        <div className="form-group">
                                            <ul className="login-social">
                                                <li><a href="https://www.linkedin.com/" target="_blank"><i className=" fab fa-linkedin"></i></a></li>
                                                <li><a href="https://twitter.com/" target="_blank"><i className="fab fa-twitter"></i></a></li>
                                                <li><a href="https://www.facebook.com/" target="_blank"><i className="fab fa-facebook"></i></a></li>
                                                <li><a href="https://www.instagram.com/" target="_blank"><i className="fab fa-instagram"></i></a></li>
                                            </ul>
                                        </div>
                                        <p className="mt-4 mb-0 text-center">Already have an account?<a className="ms-2" onClick={() => {
                                            navigate("/login")
                                        }}>Sign in</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
