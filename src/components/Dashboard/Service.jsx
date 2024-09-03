import React, { useState } from 'react'
import {
    MDBBtn,
    MDBModalHeader,
    MDBModalTitle
} from 'mdb-react-ui-kit';
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

export default function Service() {
    const serviceData = [
        {
            title: 'Oil',
            percentage: 15,
            icon: 'fa fa-oil-can', // Font Awesome icon for oil
            image: require('../../assets/images/loginImage.jpg'),
            description: 'High-quality synthetic oil for optimal engine performance.',
            price: 87.00,
            salePrice: 52.00,
            quantity: 5,

        },
        {
            title: 'Coolant',
            percentage: 78,
            icon: 'fa fa-thermometer-half', // Font Awesome icon for thermometer
            image: require('../../assets/images/loginImage.jpg'),
            description: 'Long-life coolant for effective engine cooling.',
            price: 25.99,
            salePrice: null, // No sale price
            quantity: 5,
        },
        {
            title: 'Battery',
            percentage: 42,
            icon: 'fa fa-battery', // Font Awesome icon for battery
            image: require('../../assets/images/loginImage.jpg'),
            description: 'High-capacity battery for reliable starting power.',
            price: 129.95,
            salePrice: 109.95,
            quantity: 5,
        },
        {
            title: 'Air Filter',
            percentage: 60,
            icon: 'fa fa-filter', // Font Awesome icon for filter
            image: require('../../assets/images/loginImage.jpg'),
            description: 'Premium air filter to improve engine efficiency and air quality.',
            price: 19.99,
            salePrice: null, // No sale price
            quantity: 5,
        },
        {
            title: 'Wiper Blades',
            percentage: 70,
            icon: 'fa fa-wiper', // Font Awesome icon for wiper
            image: require('../../assets/images/loginImage.jpg'),
            description: 'Pair of wiper blades for optimal visibility in all weather conditions.',
            price: 24.50,
            salePrice: 19.99,
            quantity: 5,
        },
        {
            title: 'Spark Plugs',
            percentage: 90, // Replace with an appropriate value
            icon: 'fa fa-bolt', // Font Awesome icon for spark plug (not included in original set)
            image: require('../../assets/images/loginImage.jpg'),
            description: 'High-performance spark plugs for improved ignition and fuel economy.',
            price: 5.99, // Adjust price per unit
            salePrice: 4.99, // Adjust sale price per unit
            quantity: 5,
        },
        {
            title: 'Brake Pads',
            percentage: 20, // Replace with an appropriate value based on wear
            icon: 'fa fa-car-brake', // Font Awesome icon for car brake
            image: require('../../assets/images/loginImage.jpg'),
            description: 'Durable brake pads for safe and reliable stopping power.',
            price: 79.99,
            salePrice: 64.99,
            quantity: 5,
        },
        {
            title: 'Engine Oil Filter',
            percentage: 80, // Replace with an appropriate value based on remaining life
            icon: 'fa fa-filter', // Font Awesome icon for filter (can be reused)
            image: require('../../assets/images/loginImage.jpg'),
            description: 'High-quality oil filter for superior engine protection.',
            price: 12.95,
            salePrice: 9.95,
            quantity: 5,
        },
        {
            title: 'Cabin Air Filter',
            percentage: 50, // Replace with an appropriate value based on remaining life
            icon: 'fa fa-filter', // Font Awesome icon for filter (can be reused)
            image: require('../../assets/images/loginImage.jpg'),
            description: 'Provides cleaner air for a more comfortable driving experience.',
            price: 18.50,
            salePrice: 14.99,
            quantity: 5,
        },
    ]
    const [searchTerm, setSearchTerm] = useState('');
    const [modal, setModal] = useState(false);
    const [productData, setProductData] = useState({
        title: 'Black, White Dress',
        image: require('../../assets/images/loginImage.jpg'),
        price: 87.00,
        salePrice: 52.00,
        description: 'Ravaiyaa - Attitude is everything Cotton Women\'s Dresses One Top Button T-Shirt.',
        quantity: 5,

    })
    const toggleOpen = () => setModal(!modal);

    const filteredData = serviceData.filter((item) => {
        const searchTextLower = searchTerm.toLowerCase(); // Ensure consistent casing
        return (
            item.title.toLowerCase().includes(searchTextLower)
        );
    });
    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
    };
    const handleIncrement = () => {
        setProductData({ ...productData, quantity: productData.quantity + 1 })
    };

    const handleDecrement = () => {
        if (productData.quantity > 1) {
            setProductData({ ...productData, quantity: productData.quantity - 1 })
        }
    };
    const handleSubmit = () => {
        alert(JSON.stringify(productData))
    }
    return (
        <>
            <MDBModal tabIndex='-1' open={modal} onClose={() => setModal(false)}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Service Detail</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <div className="modal-header">

                                <div className="product-box row">
                                    <div className="product-img col-lg-6">
                                        <img className="img-fluid" src={productData.image} alt={productData.title} />
                                    </div>
                                    <div className="col-lg-6 text-start">
                                        <div className="product-details">
                                            <a href="product-page.html">
                                                <h4>{productData.title}</h4>
                                            </a>
                                            <div className="product-price">
                                                <span>${productData.price.toFixed(2)}</span>
                                                {productData.salePrice && <del>${productData.salePrice.toFixed(2)}</del>}
                                            </div>
                                            <div className="product-view">
                                                <h6 className="f-w-600">Product Details</h6>
                                                <p className="mb-0">{productData.description}</p>
                                            </div>
                                            {/* <div className="product-qnty">
                                                <hr />
                                                <h6 className="f-w-600">Quantity</h6>
                                                <fieldset>
                                                    <div className="touchspin-wrapper">
                                                        <button
                                                            className="decrement-touchspin btn-primary touchspin-primary"
                                                            onClick={handleDecrement}
                                                        >
                                                            <i className="fa fa-minus"> </i>
                                                        </button>
                                                        <input
                                                            className="input-touchspin spin-outline-primary"
                                                            type="number"
                                                            value={productData.quantity}
                                                            readOnly
                                                        />
                                                        <button
                                                            className="increment-touchspin btn-primary touchspin-primary"
                                                            onClick={handleIncrement}
                                                        >
                                                            <i className="fa fa-plus"> </i>
                                                        </button>
                                                    </div>
                                                </fieldset>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='danger' onClick={toggleOpen}>
                                Close
                            </MDBBtn>
                            {/* <MDBBtn onClick={handleSubmit}>Save changes</MDBBtn> */}
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <div className="card-header d-md-block">
                <div className="d-md-flex d-sm-block align-items-center">
                    <form className="form-inline" action="#" method="get">
                        <div className="form-group d-flex mb-0 align-items-center"><i className="fa fa-search"> </i>
                            <input className="form-control-plaintext"
                                type="text" onChange={handleSearch}
                                placeholder="Search..." />
                        </div>
                    </form>
                </div>
            </div>
            <hr />
            <div className="product-wrapper-grid">
                <div className="row list-collection">

                    {filteredData.map((item, index) => (
                        <div className="col-xl-3 col-sm-6" key={index}>
                            <div className="card">
                                <div className="product-box">
                                    <div className="product-img">
                                        <div></div>
                                        <img className="img-fluid" src={item.image} alt={item.title} />
                                        <div className="product-hover">
                                            <ul>
                                                <li>
                                                    <a>
                                                        <i className="fa fa-eye" onClick={() => {
                                                            setProductData(item)
                                                            setModal(true)
                                                        }}></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="product-details">
                                        <a href="#">
                                            <h4>{item.title}</h4>
                                        </a>
                                        <p className="pro-detail">{item.description}</p>
                                        <div className="product-price">
                                            <span style={{color:"red"}}>XAF{item.price.toFixed(2)}</span>
                                            {item.salePrice && <del>XAF{item.salePrice.toFixed(2)}</del>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
