import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
        // submit logic to backend
        await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'accept': 'applicaion/json',
                'access-control-origin': '*'
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            }),
        })
            .then(res => res.json())
            .then(async (data) => {
                console.log("data", data)
                if (data.token) {
                    toast.success(data.message)
                    await localStorage.setItem('omega_token', data.token)
                    await localStorage.setItem('omega_user_name', data.name)
                    await localStorage.setItem('omega_account_type', data.accountType)
                    window.location.pathname = "/dashboard/bracelet"
                } else if (data.warning) {
                    toast.warning(data.warning)
                } else {
                    toast.error(data.error)
                }
            })
            .catch(e => {
                console.log(e)
                toast.error("Verify your internet connection")
            })
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
                                            src={require("../assets/image/LOGO/NO.png")}
                                            alt="looginpage"
                                            height={20} />
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