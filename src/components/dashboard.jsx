import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const handleChanges = () => {
        setScreenWidth(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener('resize', handleChanges);
        return () => {
            window.removeEventListener('resize', handleChanges);
        };
    }, [])
    const handleLogout = () => {
        alert("logout logic")
        // navigate("/login")
    }
    return (
        <div>
            <main className="page-wrapper compact-wrapper" id="pageWrapper">
                <header className="page-header row">
                    <div className="logo-wrapper d-flex align-items-center col-auto">
                        <a href="#">
                            <img className="for-light"
                                // src={require("../assets/images/logo/logo.png")}
                                alt="logo" width={127} height={37} />
                        </a>
                        {/* {screenWidth < 500 && ( */}
                        <a className="close-btn" onClick={toggleSidebar} >
                            <div className="toggle-sidebar">
                                <div className="line"></div>
                                <div className="line"></div>
                                <div className="line"></div>
                            </div>
                        </a>
                        {/* )} */}
                    </div>
                    <div className="page-main-header col">
                        <div className="header-left d-lg-block d-none">
                        </div>
                        <div className="nav-right">
                            <ul className="header-right">
                                <li className="profile-dropdown custom-dropdown">
                                    <div className="d-flex align-items-center">
                                        <img src={require("../assets/images/profile.png")} alt="" />
                                        <div className="flex-grow-1">
                                            <h5>Connected Name</h5><span>UI Designer</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>

                {/* <!-- Page header end--> */}
                <div className="page-body-wrapper">
                    {/* <!-- Page sidebar start--> */}
                    {/* <div className="overlay"></div> */}
                    {isSidebarOpen ? (
                        <></>
                    ) : (
                        <aside className="page-sidebar">
                            <div id="sidebar-menu">
                                <ul className="sidebar-menu" id="simple-bar">
                                    <li className="sidebar-list">
                                        <Link className="sidebar-link"
                                            onClick={screenWidth < 500 && toggleSidebar}
                                            to={"/dashboard"}>
                                            <span>Dashboard</span>
                                        </Link>
                                    </li>
                                    <li className="sidebar-list">
                                        <NavLink className="sidebar-link"
                                            onClick={screenWidth < 500 && toggleSidebar} to={"service"}>
                                            <span>Service</span>
                                        </NavLink>
                                    </li>
                                    <li className="sidebar-list">
                                        <NavLink className="sidebar-link"
                                            onClick={screenWidth < 500 && toggleSidebar}
                                            to={"calendar"}>
                                            <span >Calendar</span>
                                        </NavLink>
                                    </li>
                                    <li className="sidebar-list">
                                        <Link className="sidebar-link"
                                            onClick={() => {
                                                screenWidth < 500 && toggleSidebar()
                                                handleLogout()
                                            }}>
                                            <span>Log Out</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    )}
                    <div className='page-body'
                        style={{
                            width: '100%',
                            marginLeft: screenWidth > 500 ? '-0px' : "00px",
                            transition: "margin-left 0.3s ease-in-out"
                        }}
                    >
                        <Outlet />
                    </div>
                    <footer className="footer">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6 footer-copyright">
                                    <p className="mb-0">Copyright 2024 © AK Template by $$ Dollar.</p>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </main>

        </div>
    )
}
