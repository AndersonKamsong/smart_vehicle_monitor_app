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
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-7 login_one_image">

                    </div>
                    <div class="col-xl-5 p-0">
                        <div class="login-card login-dark login-bg">
                            <div>
                                <div>
                                    <a class="logo">
                                        <img class="img-fluid for-light" 
                                        alt="looginpage" />
                                    </a>
                                </div>
                                <div class="login-main">
                                    <div class="theme-form">
                                        <h2 class="text-center">Sign in to account</h2>
                                        <p class="text-center">Enter your email &amp; password to login</p>
                                        <div class="form-group">
                                            <label class="col-form-label">Email Address</label>
                                            <input class="form-control" type="email" required=""
                                                placeholder="Test@gmail.com"
                                                value={data.email}
                                                onChange={(e) => { setData({ ...data, email: e.target.value }) }}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label">Password</label>
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
                                        <div class="form-group mb-0 checkbox-checked">
                                            <div class="form-check checkbox-solid-info">
                                                <input class="form-check-input" id="solid6" type="checkbox" />
                                                <label class="form-check-label" for="solid6">Remember password </label>
                                            </div><a class="link-two" href="#">Forgot password?</a>
                                            <div class="text-end mt-3">
                                                <button className="btn btn-primary btn-block w-100 mt-3"
                                                    onClick={handleSubmit} >Sign in</button>
                                            </div>
                                        </div>
                                        <div class="login-social-title">
                                            <h6>Or Sign in with                 </h6>
                                        </div>
                                        <div class="form-group">
                                            <ul class="login-social">
                                                <li><a href="https://www.linkedin.com/" target="_blank"><i class=" fab fa-linkedin"></i></a></li>
                                                <li><a href="https://twitter.com/" target="_blank"><i class="fab fa-twitter"></i></a></li>
                                                <li><a href="https://www.facebook.com/" target="_blank"><i class="fab fa-facebook"></i></a></li>
                                                <li><a href="https://www.instagram.com/" target="_blank"><i class="fab fa-instagram"></i></a></li>
                                            </ul>
                                        </div>
                                        <p class="mt-4 mb-0 text-center">Don't have account?<a class="ms-2" onClick={() => {
                                            navigate("/signup")
                                        }}>Create Account</a></p>
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
