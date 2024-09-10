import React, { useState } from 'react'
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
const userData = [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', type: 'superadmin' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', type: 'user' },
    { id: 3, name: 'Alice Johnson', email: 'alicejohnson@example.com', type: 'user' },
    { id: 4, name: 'Bob Williams', email: 'bobwilliams@example.com', type: 'superadmin' },
    { id: 5, name: 'Charlie Brown', email: 'charliebrown@example.com', type: 'user' },
    { id: 6, name: 'David Lee', email: 'davidlee@example.com', type: 'superadmin' },
    { id: 7, name: 'Emily Taylor', email: 'emilytaylor@example.com', type: 'user' },
    { id: 8, name: 'Frank Wilson', email: 'frankwilson@example.com', type: 'superadmin' },
    { id: 9, name: 'Grace Kim', email: 'gracekim@example.com', type: 'user' },
    { id: 10, name: 'Henry Baker', email: 'henrybaker@example.com', type: 'superadmin' }
];

export default function Account() {
    const [modal, setModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // User's search query
    const [data, setData] = useState({
        name: "",
        email: "",
        type: "Employee"
    })
    const [action, setAction] = useState("");

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
    };
    const toggleOpen = () => setModal(!modal);
    const filteredData = userData.filter((user) => {
        const searchTextLower = searchTerm.toLowerCase(); // Ensure consistent casing
        return (
            user.name && user.name.toLowerCase().includes(searchTextLower) ||
            user.type && user.type.toLowerCase().includes(searchTextLower) ||
            user.email && user.email.toLowerCase().includes(searchTextLower)
        );
    });
    const ActionMenu = ({ row }) => {
        const handleDelete = () => {
            console.log("Enter the Delete API");
            alert("Enter the Delete API")
        }
        const handleEdit = () => {
            setData({
                name: row.name,
                email: row.email,
                type: row.type
            })
            setAction("Edit")
            setModal(true)
        }
        return (
            <>
                <button className='btn-secondary' onClick={handleEdit}>Edit</button>
                &nbsp;
                <button className='btn-danger' onClick={handleDelete}>Delete</button>
            </>
        );
    };
    const handleSubmit = async () => {
        console.log(data)
    }
    return (
        <div class="container-fluid table-space basic_table">
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
                                        <label className="col-form-label">Account Email Address</label>
                                        <input className="form-control" type="text" required=""
                                            placeholder="name"
                                            value={data.email}
                                            onChange={(e) => { setData({ ...data, name: e.target.value }) }} />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Account Email Address</label>
                                        <input className="form-control" type="email" required=""
                                            placeholder="Test@gmail.com"
                                            value={data.email}
                                            disabled={action === "changetype"}
                                            onChange={(e) => { setData({ ...data, email: e.target.value }) }} />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Account Type</label>
                                        <select className="form-select" id="select"
                                            value={data.type}
                                            onChange={(e) => { setData({ ...data, type: e.target.value }) }}>
                                            <option value="User">Employee</option>
                                            <option value="Admin">Admin</option>
                                        </select>
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
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header">
                            <h4>User Tables</h4>
                            <div className="card-header d-md-block">
                                <div className="d-md-flex d-sm-block align-items-center">
                                    <form className="search-form mb-0">
                                        <div className="input-group">
                                            <input className="form-control" type="text" onChange={handleSearch} placeholder="Search anything..." />
                                        </div>
                                    </form>
                                    <div className="flex-grow-1 text-end">
                                        <button className="btn btn-primary plus-square" onClick={toggleOpen}>
                                            Add User
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="card-block row">
                            <div class="col-sm-12 col-lg-12 col-xl-12">
                                <div class="table-responsive">
                                    <table class="table table-dashed">
                                        <thead>
                                            <tr>
                                                <th scope="col">Id </th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Type</th>
                                                {/* <th scope="col"></th> */}
                                                <th scope="col-2">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredData.map((user) => (
                                                <tr key={user.id}>
                                                    <th>{user.id}</th>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.type}</td>
                                                    <td><ActionMenu row={user} /></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
