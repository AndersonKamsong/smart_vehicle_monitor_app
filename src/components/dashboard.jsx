import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalBody,
    MDBModalFooter,
    MDBModalTitle,
    MDBModalHeader,
    MDBBtn,
} from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';

export default function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [modal, setModal] = useState(false);
    const [dataEdit, setDataEdit] = useState({
        brac_model: "",
        brac_color: "",
        soldier: {
            name: "",
            gender: "",
            rank: "",
            group: "",
        },
    })
    const toggleOpen = () => setModal(!modal);

    const navigate = useNavigate();
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
    const handleSubmit = async () => {
        console.log(dataEdit);
        await fetch(`${process.env.REACT_APP_API_URL}/bracelet/createBracelet`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'accept': 'applicaion/json',
                'access-control-origin': '*',
            },
            body: JSON.stringify(dataEdit),
        })
            .then(res => res.json())
            .then(async (data) => {
                console.log("data", data)
                if (data.message) {
                    toast.success(data.message)
                    setModal(false)
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                } else if (data.error) {
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
            <ToastContainer />
            <MDBModal tabIndex='-1' open={modal} onClose={() => setModal(false)}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle> Watch Creation</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <div className="login-main">
                                <form className="theme-form">
                                    {/* <p className="text-center">Enter the activity details</p> */}
                                    <div className="form-group">
                                        <div className="row g-2">
                                            <div className="col-6">
                                                <label className="col-form-label pt-0">Bracelet Model</label>
                                                <input className="form-control" type="text" required="" placeholder="model"
                                                    value={dataEdit.brac_model}
                                                    onChange={(e) => {
                                                        setDataEdit({ ...dataEdit, brac_model: e.target.value })
                                                    }}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <label className="col-form-label pt-0">Bracelet Color</label>
                                                <input className="form-control" type="text" required="" placeholder="Color"
                                                    value={dataEdit.brac_color}
                                                    onChange={(e) => {
                                                        setDataEdit({ ...dataEdit, brac_color: e.target.value })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="row g-2">
                                            <div className="col-6">
                                                <label className="col-form-label pt-0">Soldier Name</label>
                                                <input className="form-control" type="text" required="" placeholder="name"
                                                    value={dataEdit.soldier.name}
                                                    onChange={(e) => {
                                                        setDataEdit({ ...dataEdit, soldier: { ...dataEdit.soldier, name: e.target.value } })
                                                    }}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <label className="col-form-label pt-0">Soldier Gender</label>
                                                <select className="form-select" id="select"
                                                    value={dataEdit.soldier.gender}
                                                    onChange={(e) => {
                                                        setDataEdit({ ...dataEdit, soldier: { ...dataEdit.soldier, gender: e.target.value } })
                                                    }}>
                                                    <option value="">Select a gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="row g-2">
                                            <div className="col-6">
                                                <label className="col-form-label pt-0">Soldier Rank</label>
                                                <input className="form-control" type="text" required="" placeholder="rank"
                                                    value={dataEdit.soldier.rank}
                                                    onChange={(e) => {
                                                        setDataEdit({ ...dataEdit, soldier: { ...dataEdit.soldier, rank: e.target.value } })
                                                    }}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <label className="col-form-label pt-0">Soldier Gourp</label>
                                                <input className="form-control" type="text" required="" placeholder="group"
                                                    value={dataEdit.soldier.group}
                                                    onChange={(e) => {
                                                        setDataEdit({ ...dataEdit, soldier: { ...dataEdit.soldier, group: e.target.value } })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </MDBModalBody>

                        <MDBModalFooter style={{ height: "60px", overflow: "hidden" }}>
                            <MDBBtn color='danger' onClick={toggleOpen}>
                                Close
                            </MDBBtn>
                            <MDBBtn onClick={() => { handleSubmit() }}>Create</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <main className="page-wrapper compact-wrapper" id="pageWrapper">
                <header className="page-header row" style={{ zIndex: 4 }}>
                    <div className="logo-wrapper d-flex align-items-center col-auto">
                        <a href="#">
                            <img className="for-light"
                                // src={require("../assets/images/logo/logo.png")}
                                alt="logo" width={127} height={37} />
                        </a>
                    </div>
                    <div className="page-main-header col">
                        <div className="header-left d-lg-block d-none">
                        </div>
                        <div className="nav-right">
                            <ul className="header-right">
                                <li className="profile-dropdown custom-dropdown" style={{cursor:"pointer"}}
                                    onClick={() => {
                                        setDataEdit({
                                            brac_model: "",
                                            brac_color: "",
                                            soldier: {
                                                name: "",
                                                gender: "",
                                                rank: "",
                                                group: "",
                                            },
                                        })
                                        toggleOpen()
                                    }}
                                    title='Add a watch'>
                                    <div className="d-flex align-items-center">
                                        <span className='f-40 fa fa-plus btn-primary'></span>
                                    </div>
                                </li>
                                <li className="profile-dropdown custom-dropdown">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1">
                                            <h5>Connected Name</h5>
                                        </div>
                                    </div>
                                </li>
                                <li className="profile-dropdown custom-dropdown" style={{cursor:"pointer"}}
                                    onClick={() => {
                                        handleLogout()
                                    }}
                                    title='Logout'>
                                    <div className="d-flex align-items-center">
                                        <span className='f-40 fa fa-door-open font-danger'></span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>
                <div className="page-body-wrapper">
                    <div className='page-body'
                        style={{
                            width: '100%',
                            marginLeft: screenWidth > 500 ? '0px' : "00px",
                            transition: "margin-left 0.3s ease-in-out",
                            overflow: "auto"
                        }}
                    >
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    )
}
