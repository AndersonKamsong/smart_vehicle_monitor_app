import React, { useState, useEffect } from 'react'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import { useLoaderData, } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function UsersList() {
    const loaderData = useLoaderData()
    const [userDataList, setuserDataList] = useState(loaderData.admins)
    const [data, setData] = useState({
        email: "",
        name: "",
        matricule: "",
        password: "",
        confirmPassword: "",
        accountType: "Admin"
    })
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [modal, setModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // User's search query
    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
    };
    const filteredData = userDataList.filter((user) => {
        const searchTextLower = searchTerm.toLowerCase(); // Ensure consistent casing
        return (
            user.name && user.name.toLowerCase().includes(searchTextLower)
            // user.uname && user.uname.toLowerCase().includes(searchTextLower) ||
            // user.email && user.email.toLowerCase().includes(searchTextLower) ||
            // user.account_type && user.account_type.toLowerCase().includes(searchTextLower) ||
            // user.phone && user.phone.toLowerCase().includes(searchTextLower) ||
            // user.account_verified && searchTextLower === "verified" ||
            // !user.account_verified && searchTextLower === "not verified" ||
            // !user.is_suspended && searchTextLower === "active" ||
            // user.is_suspended && searchTextLower === "in active"
        );
    });

    const toggleOpen = () => setModal(!modal);
    const handleChanges = () => {
        setScreenWidth(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener('resize', handleChanges);
        return () => {
            window.removeEventListener('resize', handleChanges);
        };
    }, [])
    const ActionMenu = ({ row }) => {
        const handleDelete = async () => {
            await fetch(`${process.env.REACT_APP_API_URL}/user/delete/${row._id}`, {
                method: "delete",
                headers: {
                    'content-type': 'application/json',
                    'accept': 'applicaion/json',
                    'access-control-origin': '*',
                },
            })
                .then(res => res.json())
                .then(async (data) => {
                    console.log("data", data)
                    if (data.message) {
                        toast.success(data.message)
                        window.location.reload()
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
            <>
                <MDBBtn color='danger' onClick={handleDelete} link>Delete</MDBBtn>
            </>
        );
    };
    const handleSubmit = async () => {
        console.log(data)
        await fetch(`${process.env.REACT_APP_API_URL}/user/register`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'accept': 'applicaion/json',
                'access-control-origin': '*',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(async (data) => {
                console.log("data", data)
                if (data.message) {
                    toast.success(data.message)
                    setModal(false)
                    window.location.reload()
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
                            <MDBModalTitle>Account Creation</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <div className="login-main">
                                <form className="theme-form">
                                    <h2 className="text-center">Create new account</h2>
                                    <p className="text-center">Enter the personal details to create account</p>
                                    <div className="form-group">
                                        <div className="row g-2">
                                            <div className="col-6">
                                                <label className="col-form-label">Account Matricule</label>
                                                <input className="form-control" type="text" required=""
                                                    placeholder="Enter Matricule"
                                                    value={data.matricule}
                                                    onChange={(e) => { setData({ ...data, matricule: e.target.value }) }} />
                                            </div>
                                            <div className="col-6">
                                                <label className="col-form-label pt-0">Account Type</label>
                                                <select className="form-select" id="select"
                                                    value={data.accountType}
                                                    onChange={(e) => {
                                                        setData({ ...data, accountType: e.target.value })
                                                    }}>
                                                    <option value="Admin">Admin</option>
                                                    <option value="Command">Command</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="row g-2">
                                            <div className="col-6">
                                                <label className="col-form-label">Account Email Address</label>
                                                <input className="form-control" type="email" required=""
                                                    placeholder="Enter Email"
                                                    value={data.email}
                                                    onChange={(e) => { setData({ ...data, email: e.target.value }) }} />
                                            </div>
                                            <div className="col-6">

                                                <label className="col-form-label">Account Name</label>
                                                <input className="form-control" type="text" required=""
                                                    placeholder="Enter user name"
                                                    value={data.name}
                                                    onChange={(e) => { setData({ ...data, name: e.target.value }) }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="row g-2">
                                            <div className="col-6">
                                                <label className="col-form-label">Account Password</label>
                                                <input className="form-control" type="password" required=""
                                                    placeholder="password"
                                                    value={data.password}
                                                    onChange={(e) => { setData({ ...data, password: e.target.value }) }} />
                                            </div>
                                            <div className="col-6">
                                                <label className="col-form-label">Account Confirm Password</label>
                                                <input className="form-control" type="password" required=""
                                                    placeholder="confrim password"
                                                    value={data.confirmPassword}
                                                    onChange={(e) => { setData({ ...data, confirmPassword: e.target.value }) }} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='danger' onClick={toggleOpen}>
                                Close
                            </MDBBtn>
                            <MDBBtn onClick={handleSubmit}>Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header d-md-block">
                        <div className="d-md-flex d-sm-block align-items-center">
                            <form className="search-form mb-0">
                                <div className="input-group"><span className="input-group-text pe-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg></span>
                                    <input className="form-control" type="text" onChange={handleSearch} placeholder="Search anything..." />
                                    {screenWidth > 500 ? <></> : (
                                        <span className="input-group-text pe-0">
                                            <button className="btn btn-primary plus-square" onClick={toggleOpen}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" color='white' strokeLinecap="round" strokeLinejoin="round"
                                                    className="feather feather-plus-square">
                                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                                    <line x1="12" y1="8" x2="12" y2="16"></line>
                                                    <line x1="8" y1="12" x2="16" y2="12"></line>
                                                </svg>
                                            </button>
                                        </span>
                                    )}
                                </div>
                            </form>
                            {screenWidth > 500 ? (
                                <div className="flex-grow-1 text-end">
                                    {/* <form className="d-inline-flex"> */}
                                    <button className="btn btn-primary plus-square" onClick={toggleOpen}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2" color='white' strokeLinecap="round" strokeLinejoin="round"
                                            className="feather feather-plus-square">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="12" y1="8" x2="12" y2="16"></line>
                                            <line x1="8" y1="12" x2="16" y2="12"></line>
                                        </svg> Add User
                                    </button>
                                    {/* </form> */}
                                </div>
                            ) : (<></>)}
                        </div>
                    </div>
                    <div className="card-body file-manager">
                        <div class="table-responsive">
                            <table class="table table-striped bg-primary">
                                <thead class="tbl-strip-thad-bdr">
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">User Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Matricule</th>
                                        <th scope="col">Account Type</th>
                                        <th scope="col">Action	  </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((user, index) => (
                                        <tr key={index} >
                                            <th scope="row">{index + 1}</th>
                                            <td>
                                                {user.name}
                                            </td>
                                            <td>{user.email}</td>
                                            <td>{user.matricule}</td>
                                            <td>{user.accountType}</td>
                                            <td>
                                                <ActionMenu row={user} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export const usersListLoader = async ({ params }) => {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/user/getAllAdmins`, {
        method: 'get',
        headers: {
            'content-type': 'application/json',
            'accept': 'applicaion/json',
            'access-control-origin': '*',
            'Authorization': `Bearer ${localStorage.getItem('easy_archives_token')}`
        },
    })
    if (!response.ok) {
        throw ("An error occur in get data")
    }
    return response.json()
}