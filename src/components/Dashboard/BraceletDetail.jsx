import React, { useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom';
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
// import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';

const classList = [
    "b-b-primary", "b-b-tertiary", "b-b-success", "b-b-warning", "b-b-info", "b-b-danger", "b-b-secondary"
]
const checkBoxList = [
    "checkbox-primary checkbox-border-primary", "checkbox-tertiary checkbox-border-tertiary",
    "checkbox-secondary checkbox-border-secondary"
]
export default function BraceletDetail() {
    const loaderData = useLoaderData()
    console.log(loaderData);
    const [data, setData] = useState([])
    const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);
    const toggleOpen = () => setModal(!modal);
    const toggleOpen1 = () => setModal1(!modal1);
    const [members, setMembers] = useState([])
    const [userDataList, setuserDataList] = useState([])
    const [loading, setLoading] = useState(false)
    const [dataEdit, setDataEdit] = useState({
        activity_name: "",
        excepted_date: "",
        description: ""
    })
    const navigate = useNavigate()
    useEffect(() => {
        fetchUserData()
        return () => {
            fetchUserData()
        }
    }, [])

    const fetchUserData = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/user/getActiveUsers`, {
            method: 'get',
            headers: {
                'content-type': 'application/json',
                'accept': 'applicaion/json',
                'access-control-origin': '*',
                'Authorization': `Bearer ${localStorage.getItem('easy_archives_token')}`
            },
        })
            .then(res => res.json())
            .then(async (data) => {
                console.log("data", data)
                if (data.users) {
                    setuserDataList(data.users)
                }
            })
            .catch(e => {
                console.log(e)
                // toast.error("Verify your internet connection")
            })
    }
    const fetctActivityData = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/activity/getActivity/${data.activity_id}`, {
            method: 'get',
            headers: {
                'content-type': 'application/json',
                'accept': 'applicaion/json',
                'access-control-origin': '*',
                'Authorization': `Bearer ${localStorage.getItem('easy_archives_token')}`
            },
        })
            .then(res => res.json())
            .then(async (data) => {
                console.log("data", data)
                if (data.activity) {
                    setData(data.activity)
                }
            })
            .catch(e => {
                console.log(e)
                // toast.error("Verify your internet connection")
            })
    }
    const handleSubmit = async () => {
        console.log(members)
        console.log(data);
        setLoading(true)
        await fetch(`${process.env.REACT_APP_API_URL}/activity/addMembers/${data.activity_id}`, {
            method: 'put',
            headers: {
                'content-type': 'application/json',
                'accept': 'applicaion/json',
                'access-control-origin': '*',
                'Authorization': `Bearer ${localStorage.getItem('easy_archives_token')}`
            },
            body: JSON.stringify({
                user_refs: members,
            }),
        })
            .then(res => res.json())
            .then(async (data) => {
                console.log("data", data)
                if (data.message) {
                    // toast.success(data.message)
                    setModal1(false)
                    fetctActivityData()
                } else if (data.error) {
                    // toast.error(data.error)
                    // navigate(location.pathname)
                }
                setLoading(false)
            })
            .catch(e => {
                console.log(e)
                // toast.error("Verify your internet connection")
                setLoading(false)
            })
    }
    const handleCreate = async () => {
        console.log("dataEdit", dataEdit);
        console.log("data", data);
        setLoading(true)
        await fetch(`${process.env.REACT_APP_API_URL}/activity/updateActivity/${data.activity_id}`, {
            method: 'put',
            headers: {
                'content-type': 'application/json',
                'accept': 'applicaion/json',
                'access-control-origin': '*',
                'Authorization': `Bearer ${localStorage.getItem('easy_archives_token')}`
            },
            body: JSON.stringify({
                description: dataEdit.description,
                activity_name: dataEdit.activity_name,
                excepted_date: moment(dataEdit.excepted_date).format("yyyy-MM-DDThh:mm"),
            }),
        })
            .then(res => res.json())
            .then(async (data) => {
                console.log("data", data)
                if (data.message) {
                    // toast.success(data.message)
                    fetctActivityData()
                    setModal(false)
                } else if (data.error) {
                    // toast.error(data.error)
                }
                setLoading(false)
            })
            .catch(e => {
                console.log(e)
                // toast.error("Verify your internet connection")
                setLoading(false)
            })
    }
    return (
        <div>
            {/* <ToastContainer /> */}
            <MDBModal tabIndex='-1' open={modal} onClose={() => setModal(false)}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Activity Modification</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <div className="login-main">
                                <form className="theme-form">
                                    <h2 className="text-center">Update Activity</h2>
                                    {/* <p className="text-center">Enter the activity details</p> */}
                                    <div className="form-group">
                                        <div className="row g-2">
                                            <div className="col-6">
                                                <label className="col-form-label pt-0">Activity Name</label>
                                                <input className="form-control" type="text" required="" placeholder="Activity name"
                                                    value={dataEdit.activity_name}
                                                    onChange={(e) => {
                                                        setDataEdit({ ...dataEdit, activity_name: e.target.value })
                                                    }}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <label className="col-form-label pt-0">Activity Expected Date</label>
                                                <input className="form-control" type="datetime-local" required=""
                                                    value={moment(dataEdit.excepted_date).format("yyyy-MM-DDThh:mm")}
                                                    onChange={(e) => {
                                                        console.log("e.target.value", e.target.value);
                                                        console.log("e.target.value moment", moment(dataEdit.excepted_date).format("YYYY-MM-DDThh:mm"));
                                                        setDataEdit({ ...dataEdit, excepted_date: e.target.value })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Description</label>
                                        <textarea className="form-control" rows="4" placeholder="Enter workspace description"
                                            value={dataEdit.description}
                                            onChange={(e) => { setDataEdit({ ...dataEdit, description: e.target.value }) }}
                                        ></textarea>
                                    </div>
                                </form>
                            </div>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='danger' onClick={toggleOpen}>
                                Close
                            </MDBBtn>
                            {loading ? (
                                <MDBBtn
                                    style={{ width: "100px" }}
                                // className="btn btn-primary btn-block w-100 text-white"
                                >
                                    <div
                                        className='sbt-btn-loader'
                                        style={{ height: "20px", width: "20px", margin: "0 auto" }}
                                    ></div>
                                </MDBBtn>
                            ) : (
                                <MDBBtn
                                    style={{ width: "100px" }}
                                    onClick={handleCreate}
                                >Update</MDBBtn>
                            )}
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <div className="row">
                <span>
                    <hr />
                    <i className='f-24 fa fa-arrow-left' onClick={() => {
                        navigate(-1)
                    }}></i>
                    {/* <hr /> */}
                </span>
            </div>
            <div className="row">
                <div className="col-xl-3 xl-4 col-lg-12 col-md-5 box-col-4">
                    <div className="default-according style-1 faq-accordion" id="accordionExample">
                        <div className="card">
                            <div className="card-header accordion" id="headingTwo">
                                <h2 className="mb-0">
                                    <button className="btn btn-link btn-block text-start" type="button">Activity Details</button>
                                    <span className="pull-right" >
                                        <i className="f-18 fa fa-pencil" style={{ cursor: "pointer" }} onClick={() => {
                                            setDataEdit({
                                            })
                                            setModal(true)
                                        }}></i>
                                    </span>
                                </h2>
                            </div>
                            <div className="collapse show" id="collapseTwo" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="card-body social-status filter-cards-view">
                                    <h6 className='f-w-400 font-primary'>Name</h6><span>{data.activity_name}</span>
                                    <hr />
                                    <h6 className='f-w-400 font-primary'>Description</h6><span>{data.description}</span>
                                    <hr />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 xl-25 col-lg-12 col-md-3 box-col-4">
                    <div className="default-according style-1 faq-accordion" id="accordionExample">
                        <div className="card">
                            <div className="card-header accordion" id="headingTwo">
                                <h2 className="mb-0">
                                    <button className="btn btn-link btn-block text-start"
                                        type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                        aria-expanded="true" aria-controls="collapseTwo">Alert Info</button>
                                </h2>
                            </div>
                            <div className="collapse show" id="collapseTwo">
                                <div className="card-body social-status filter-cards-view">
                                    <h1>Alert Info</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 xl-40 col-lg-12 col-md-3 box-col-4">
                    <div className="default-according style-1 faq-accordion" id="accordionExample">
                        <div className="card">
                            <div className="card-header accordion" id="headingTwo">
                                <h2 className="mb-0">
                                    <button className="btn btn-link btn-block text-start "
                                        type="button">Status Info</button>
                                </h2>
                            </div>
                            <div className="collapse show" id="collapseTwo">
                                <div className="card-body social-status filter-cards-view">
                                    <h1>Status Info</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
