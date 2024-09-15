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
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';

const actionMessage ={
    "alert":"cancel Alert",
    "delete":"delete"
}
const actionAPI ={
    "alert":"unSetAlert",
    "delete":"deleteBracelet"
}
export default function BraceletDetail() {
    const loaderData = useLoaderData()
    console.log(loaderData);
    const [bracelet, setBracelet] = useState(loaderData.bracelet)
    const [data, setData] = useState([])
    const [modal, setModal] = useState(false);
    const [alertMode, setAlertMode] = useState(false);
    const [action, setAction] = useState("alert");
    const toggleOpen = () => setModal(!modal);
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
    const navigate = useNavigate()

    const handleSubmit = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/bracelet/updateBracelet/${bracelet._id}`, {
            method: 'put',
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
    const cancelAlert = async () => {
        console.log("dataEdit", dataEdit);
        // console.log("data", data);
        await fetch(`${process.env.REACT_APP_API_URL}/bracelet/${actionAPI[action]}/${bracelet._id}`, {
            method: 'delete',
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
                    setModal(false)
                    if (action==="delete")
                        window.location = "/dashboard/bracelet"
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
                            <MDBModalTitle> Modification</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            {alertMode ? (
                                <>
                                    <p>Are you sure you want to {actionMessage[action]} on watch</p>
                                    <h4>Model</h4>
                                    {bracelet.brac_model}
                                    <h4>ID</h4>
                                    {bracelet._id}
                                </>
                            ) : (
                                <div className="login-main">
                                    <form className="theme-form">
                                        <h2 className="text-center">Update </h2>
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
                            )}
                        </MDBModalBody>

                        <MDBModalFooter style={{ height: "60px", overflow: "hidden" }}>
                            <MDBBtn color='danger' onClick={toggleOpen}>
                                Close
                            </MDBBtn>
                            <MDBBtn onClick={alertMode ? () => { cancelAlert() } : 
                            () => {handleSubmit()}}>{alertMode ? "Yes" : "Update"}</MDBBtn>
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
                <div className="col-xl-3 xl-25 col-lg-12 col-md-5 box-col-4">
                    <div className="default-according style-1 faq-accordion" id="accordionExample">
                        <div className="card">
                            <div className="card-header accordion" id="headingTwo">
                                <h2 className="mb-0">
                                    <button className="btn btn-link btn-block text-start" type="button">Activity Details</button>
                                    <span className="pull-right" >
                                        <i className="f-18 fa fa-pencil" style={{ cursor: "pointer" }} onClick={() => {
                                            setDataEdit({
                                                brac_model: bracelet.brac_model,
                                                brac_color: bracelet.brac_color,
                                                soldier: bracelet.soldier
                                            })
                                            setModal(true)
                                            setAlertMode(false)
                                        }}></i>
                                    </span>
                                </h2>
                            </div>
                            <div className="collapse show" id="collapseTwo" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="card-body social-status filter-cards-view">
                                    <h6>Model :<b>{bracelet.brac_model}</b></h6>
                                    <h6>Color :<b>{bracelet.brac_color}</b></h6>
                                    <h6>Name :<b>{bracelet.soldier.name}</b></h6>
                                    <h6>Gender :<b>{bracelet.soldier.gender}</b></h6>
                                    <h6>Rank :<b>{bracelet.soldier.rank}</b></h6>
                                    <h6>Group :<b>{bracelet.soldier.group}</b></h6>
                                    <hr />
                                    <span className="pull-right" >
                                        <i className="f-18 btn-danger" style={{ cursor: "pointer" }} onClick={() => {
                                            setAlertMode(true)
                                            setAction("delete")
                                            setModal(true)
                                        }}>Delete</i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 xl-4 col-lg-12 col-md-3 box-col-4">
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
                                <hr />
                                <span className="pull-right" >
                                    <i className="f-18 btn-info" style={{ cursor: "pointer" }} onClick={() => {
                                            setModal(true)
                                            setAlertMode(true)
                                            setAction("alert")
                                    }}>cancel</i>
                                </span>
                                <div className="card-body social-status filter-cards-view">
                                    {bracelet.alert_info.map((item) => (
                                        <>
                                            <h6>Type : <b>{item.name}</b> </h6>
                                            <h6>createdAt :<b>{item.createdAt}</b></h6>
                                            <h6>Location :<b>{item.location.latitude},{item.location.longitude}</b></h6>
                                            <hr />
                                        </>
                                    ))}
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
                                    {bracelet.status_info.map((item) => (
                                        <>
                                            <h6>Status : <b>{item.status}</b> </h6>
                                            <h6>createdAt :<b>{item.createdAt}</b></h6>
                                            <h6>Location :<b>{item.location.latitude},{item.location.longitude}</b></h6>
                                            <hr />
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export const getBraceletDetail = async ({ params }) => {
    let { id } = params
    let response = await fetch(`${process.env.REACT_APP_API_URL}/bracelet/getBracelet/${id}`, {
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
