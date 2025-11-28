import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faUser, faKey, faEye, faEyeSlash, faChevronRight, faChevronLeft, faHeart, faBuilding, faStore, faEnvelope, faUserCircle, faHandHoldingDollar, faEdit, faPen } from '@fortawesome/free-solid-svg-icons'
import Footer from './footerComponent/Footer'
import Header from './headerComponent/Header'
import '../assets/css/style.css'
import emptycart from '../assets/img/emptycart.png'
import contactus from '../assets/img/contact.gif';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faJediOrder } from "@fortawesome/free-brands-svg-icons/faJediOrder";
import { faLocation } from "@fortawesome/free-solid-svg-icons/faLocation";
import Myprofile from '../assets/img/user.png'
import Myorder from '../assets/img/order.png'
import Mydelivery from '../assets/img/delivery.png'
import Mygst from '../assets/img/gst.png'
import Myloyalty from '../assets/img/loyalty.png'
import MyCredit from '../assets/img/credit.png'
import Myfavourite from '../assets/img/favorite.png'
import shutdown from '../assets/img/shutdown.png'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import rorder from '../assets/img/recent_order.avif'
import porder from '../assets/img/past_order.jpg'
import forder from '../assets/img/failed_order.webp'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import nogst from '../assets/img/nogst.png'
import wishlist from '../assets/img/wishlist.png'
import address from '../assets/img/address.avif'
import logout from '../assets/img/logout.jpg'
export default function Order() {
    const [isEdit, setIsEdit] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "Gaurav",
        lastName: "Singh",
        email: "Gaurv.singh4452@gmail.com",
        gender: "Male",
        dob: "09-Aug-1994",
        phone: "9667574201"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [isAddress, setIsAddress] = useState(false);
    const [activeTab, setActiveTab] = useState("order");

    return (
        <>
            <Header />
            <div className='container-fluid px-5 pt-3'>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                        <div className='breadcrum'>
                            <ul>
                                <li> <Link to='/Index'> Home </Link></li>
                                <li><FontAwesomeIcon icon={faChevronRight} /></li>
                                <li> <Link to='/Index'> My Account </Link></li>
                                <li><FontAwesomeIcon icon={faChevronRight} /></li>
                                <li>
                                    {activeTab === "profile" && "My Profile"}
                                    {activeTab === "order" && "My Order"}
                                    {activeTab === "address" && "Delivery Addresses"}
                                    {activeTab === "gst" && "PAN & GST Information"}
                                    {activeTab === "loyalty" && "ROne Loyalty Points"}
                                    {activeTab === "credit" && "My Credit (RDS Wallet)"}
                                    {activeTab === "wishlist" && "My Wishlist"}
                                    {activeTab === "logout" && "Logout"}
                                </li>


                            </ul>
                        </div>
                    </div>

                    <div className='col-lg-12 col-md-12 col-sm-12 col-12 mt-4 mb-5'>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="order" activeKey={activeTab} onSelect={(k) => setActiveTab(k)} >
                            <Row>
                                <Col sm={3} className="lhs__bottomtab">
                                    <Nav variant="pills" className="flex-column" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                                        <Nav.Item>
                                            <Nav.Link eventKey="profile" className="padding__area"><img src={Myprofile} className="img img-fluid lhs__bottomtabselection" /> &nbsp; My Profile</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="order" className="padding__area"><img src={Myorder} className="img img-fluid lhs__bottomtabselection" /> &nbsp; My Order </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="address" className="padding__area"><img src={Mydelivery} className="img img-fluid lhs__bottomtabselection" /> &nbsp; Delivery Addresses</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="gst" className="padding__area"><img src={Mygst} className="img img-fluid lhs__bottomtabselection" /> &nbsp; PAN & GST Information</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="loyalty" className="padding__area"><img src={MyCredit} className="img img-fluid lhs__bottomtabselection" /> &nbsp; ROne Loyalty Points </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="credit" className="padding__area"><img src={Myloyalty} className="img img-fluid lhs__bottomtabselection" /> &nbsp; My Credit (RDS Wallet)</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="wishlist" className="padding__area"><img src={Myfavourite} className="img img-fluid lhs__bottomtabselection" /> &nbsp; My Wishlist</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="logout" className="padding__area"><img src={shutdown} className="img img-fluid lhs__bottomtabselection" /> &nbsp; Logout </Nav.Link>
                                        </Nav.Item>

                                    </Nav>
                                </Col>
                                <Col sm={9}>
                                    <Tab.Content>

                                        <Tab.Pane eventKey="order">

                                            <Tabs defaultActiveKey="order" id="uncontrolled-tab-example" className="mb-3">
                                                <Tab eventKey="order" title="Recent Order">
                                                    <div className='display__cart__area'>
                                                        <img src={rorder} className='img img-fluid' /> 
                                                        <h3> You have no orders to show </h3>
                                                        <Link to='/Index'> Continue Shopping</Link>
                                                    </div>
                                                </Tab>
                                                <Tab eventKey="profile" title="Past Order">
                                                    <div className='display__cart__area'>
                                                        <img src={porder} className='img img-fluid' /> 
                                                        <h3> You have no past to show </h3>
                                                        <Link to='/Index'> Continue Shopping</Link>
                                                    </div>
                                                </Tab>
                                                <Tab eventKey="contact" title="Pending/Failed Order">
                                                    <div className='display__cart__area'>
                                                        <img src={forder} className='img img-fluid' /> 
                                                        <h3> You have no failed to show </h3>
                                                        <Link to='/Index'> Continue Shopping</Link>
                                                    </div>
                                                </Tab>
                                            </Tabs>

                                        </Tab.Pane>

                                        <Tab.Pane eventKey="gst">

                                            <Tabs id="uncontrolled-tab-example" className="mb-3">
                                                <Tab eventKey="gst" title="PAN & GST Information">
                                                    <div className='display__cart__area'>
                                                        <img src={nogst} className='img img-fluid' />
                                                        <h3> No GST is available </h3>
                                                    </div>
                                                </Tab>
                                            </Tabs>

                                        </Tab.Pane>

                                        <Tab.Pane eventKey="loyalty">

                                            <Tabs id="uncontrolled-tab-example" className="mb-3">
                                                <Tab eventKey="loyalty" title="ROne Loyalty Points">
                                                    <div className="one_points">
                                                        <div className="points">
                                                            <span> 0 </span><br />
                                                            <label> Points </label>
                                                        </div>
                                                        <p> Available ROne loyalty points can be used as part/full payment for <br />transaction on the website (www.reliancedigitalselect.in) T&C </p>
                                                    </div>
                                                </Tab>
                                            </Tabs>

                                        </Tab.Pane>
                                        <Tab.Pane eventKey="credit">

                                            <Tabs id="uncontrolled-tab-example" className="mb-3">
                                                <Tab eventKey="Credit" title="My Credit (RDS Wallet)">
                                                    <div className="one_points">
                                                        <div className="points">
                                                            <span> ₹ 0 </span><br />
                                                            <label> Available Balance </label>
                                                        </div>
                                                        <p> Available store credit can be used as part/full payment for transaction <br />on the website (www.reliancedigitalselect.in) </p>
                                                    </div>
                                                </Tab>
                                            </Tabs>

                                        </Tab.Pane>
                                        <Tab.Pane eventKey="wishlist">

                                            <Tabs id="uncontrolled-tab-example" className="mb-3">
                                                <Tab eventKey="wishlist" title="My Wishlist">
                                                    <div className='display__cart__area'>
                                                        <img src={wishlist} className='img img-fluid' />
                                                        <h3> No Wishlist is available </h3>
                                                    </div>
                                                </Tab>
                                            </Tabs>

                                        </Tab.Pane>
                                        <Tab.Pane eventKey="profile">

                                            <Tabs id="uncontrolled-tab-example" className="mb-3">
                                                <Tab eventKey="profile" title="Personal Details">
                                                    <div className='display__cart'>
                                                        <Link onClick={() => setIsEdit(!isEdit)}>
                                                            <FontAwesomeIcon icon={faPen} /> {isEdit ? "Save" : "Edit Profile"}
                                                        </Link>

                                                        <div className="details">

                                                            {/* FIRST NAME */}
                                                            <div className="personal__details">
                                                                <label>First Name</label><br />
                                                                {isEdit ? (
                                                                    <input type="text" name="firstName" className="editable__fields" value={formData.firstName} onChange={handleChange} />
                                                                ) : (
                                                                    <span>{formData.firstName}</span>
                                                                )}
                                                            </div>

                                                            {/* LAST NAME */}
                                                            <div className="personal__details">
                                                                <label>Last Name</label><br />
                                                                {isEdit ? (
                                                                    <input type="text" name="lastName" className="editable__fields" value={formData.lastName} onChange={handleChange} />
                                                                ) : (
                                                                    <span>{formData.lastName}</span>
                                                                )}
                                                            </div>

                                                            {/* EMAIL - DISABLED */}
                                                            <div className="personal__details">
                                                                <label>Email Id</label><br />
                                                                {isEdit ? (
                                                                    <input type="email" name="email" className="editable__fields" value={formData.email} disabled />
                                                                ) : (
                                                                    <span>{formData.email}</span>
                                                                )}
                                                            </div>

                                                            {/* GENDER - RADIO BUTTON */}
                                                            <div className="personal__details">
                                                                <label>Gender</label><br />
                                                                {isEdit ? (
                                                                    <div>
                                                                        <label>
                                                                            <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} /> Male
                                                                        </label>
                                                                        <label style={{ marginLeft: "10px" }}>
                                                                            <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} /> Female
                                                                        </label>
                                                                        <label style={{ marginLeft: "10px" }}>
                                                                            <input type="radio" name="gender" value="Transgender" checked={formData.gender === "Transgender"} onChange={handleChange} /> Transgender
                                                                        </label>
                                                                    </div>
                                                                ) : (
                                                                    <span>{formData.gender}</span>
                                                                )}
                                                            </div>

                                                            {/* DOB */}
                                                            <div className="personal__details">
                                                                <label>DOB</label><br />
                                                                {isEdit ? (
                                                                    <input className="editable__fields"
                                                                        type="date"
                                                                        name="dob"
                                                                        value={formData.dob}
                                                                        onChange={handleChange}
                                                                    />
                                                                ) : (
                                                                    <span>{formData.dob}</span>
                                                                )}
                                                            </div>

                                                            {/* PHONE - DISABLED */}
                                                            <div className="personal__details">
                                                                <label>Phone No</label><br />
                                                                {isEdit ? (
                                                                    <input type="text" className="editable__fields" name="phone" value={formData.phone} disabled />
                                                                ) : (
                                                                    <span>{formData.phone}</span>
                                                                )}
                                                            </div>

                                                        </div>
                                                    </div>
                                                </Tab>
                                            </Tabs>

                                        </Tab.Pane>
                                        <Tab.Pane eventKey="address">
                                            <Tabs className="mb-3">
                                                <Tab eventKey="address" title="Delivery Adressess">
                                                    <div className="ultimate__div0090">
                                                        {!isAddress && (
                                                            <div className='address__display'>
                                                                <img src={address} className='img img-fluid' />
                                                                <h3> You haven’t added any address, please add a new address to continue. </h3>
                                                                <Link onClick={() => setIsAddress(true)}> Add New Address</Link>
                                                            </div>
                                                        )}
                                                        {isAddress && (

                                                            <div className="no__display6676Area">
                                                                <div className="personal__details">
                                                                    <label>Full Name <span>*</span></label><br />
                                                                    <input type="text" className="" placeholder="Full name" />
                                                                </div>
                                                                <div className="personal__details">
                                                                    <label> Phone Number <span>*</span></label><br />
                                                                    <input type="text" className="" placeholder="Phone Number" />
                                                                </div>
                                                                <div className="personal__details">
                                                                    <label> Email Id <span>*</span></label><br />
                                                                    <input type="text" className="" placeholder="Email Id" />
                                                                </div>
                                                                <div className="personal__details">
                                                                    <label> House/Flat no <span>*</span></label><br />
                                                                    <input type="text" className="" placeholder="House/Flat no" />
                                                                </div>
                                                                <div className="personal__details">
                                                                    <label> Building/Apartment <span>*</span></label><br />
                                                                    <input type="text" className="" placeholder="Building/Apartment" />
                                                                </div>
                                                                <div className="personal__details">
                                                                    <label> Street/Locality <span>*</span></label><br />
                                                                    <input type="text" className="" placeholder="Street/Locality" />
                                                                </div>
                                                                <div className="personal__details">
                                                                    <label> Landmark <span>*</span></label><br />
                                                                    <input type="text" className="" placeholder="Landmark" />
                                                                </div>
                                                                <div className="personal__details">
                                                                    <label> Pincode <span>*</span></label><br />
                                                                    <input type="text" className="" placeholder="Pincode" />
                                                                </div>
                                                                <div className="personal__details">
                                                                    <label> City <span>*</span></label><br />
                                                                    <input type="text" className="" placeholder="City" />
                                                                </div>
                                                                <div className="personal__details">
                                                                    <label> State <span>*</span></label><br />
                                                                    <input type="text" className="" placeholder="State" />
                                                                </div>
                                                                <div className="add__type">
                                                                    <label> Address Type <span>*</span></label><br />
                                                                    <label>
                                                                        <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} className="radio__btn" /> House
                                                                    </label>
                                                                    <label style={{ marginLeft: "10px" }}>
                                                                        <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} className="radio__btn" /> Office
                                                                    </label>
                                                                    <label style={{ marginLeft: "10px" }}>
                                                                        <input type="radio" name="gender" value="Transgender" checked={formData.gender === "Transgender"} onChange={handleChange} className="radio__btn" /> Other
                                                                    </label>
                                                                </div>
                                                                <button onClick={() => setIsAddress(false)}>Cancel</button>
                                                            </div>
                                                        )}

                                                    </div>

                                                </Tab>
                                            </Tabs>

                                        </Tab.Pane>
                                        <Tab.Pane eventKey="logout">

                                            <Tabs id="uncontrolled-tab-example" className="mb-3">
                                                <Tab eventKey="logout" title="Logout">
                                                    <div className='display__cart__area'>
                                                        <img src={logout} className='img img-fluid' />
                                                        <div className="display__btn">
                                                            <Link to='' className="can__btn"> Cancel </Link>
                                                            <Link to='/Index'> Logout</Link>
                                                        </div>
                                                    </div>
                                                </Tab>
                                            </Tabs>

                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </div>

                </div>
            </div>
            <Footer />
        </>

    )
}
