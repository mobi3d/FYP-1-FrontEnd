import React, { useState } from "react";

import { Container, Button } from "react-bootstrap";
import { Form, Row, Col, Card, ListGroup, Nav,Dropdown,DropdownButton,InputGroup,Modal } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import UserPanelBackToTopButton from "../UserPanelBackToTopButton";
import Image1 from "../../../Public/user/image/RequestMaker.jpg";
import CardImage1 from "../../../Public/user/image/Avatar.JPG";
import { Search,ArrowRight,ChevronRight,Trash, GeoAltFill, TelephoneOutboundFill, TrashFill, Trash2Fill, Trash3Fill } from 'react-bootstrap-icons';

import '../css/style.css';
import { Link } from "react-router-dom";
import appointmentService from "../../../Services/Api/User/AppointmentService";
import ConfirmationBox from "../ConfirmationBox";
import { BsTrash, BsTrashFill } from "react-icons/bs";

const SingleAppointment = (props) => {

    const { appointment, history } = props;
    // console.log(props);

    const [showConfirmationBox, setShowConfirmationBox] = useState(false);
    const handleCancelConfirmationBox = () => {
        setShowConfirmationBox(false);
    };

    const deleteAppointment = () => {
        appointmentService
            .deleteAppointment(appointment.ID.value)
            .then((data) => {
                console.log(data);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return ( <div>
        <Container className='d-flex justify-content-center' style={{paddingTop:'0%',paddingBottom:'7%'}}>
            <Row className=''>
                <div className='d-flex'>
                    
                        <Col sm={4}>
                        <Row className="" style={{marginBottom:"10%"}}>
                            <Col sm={12}>
                                <Card className="UserCard" border="secondary" style={{ width: '45rem' }}>
                                    <Row>
                                        <Col sm={11} style={{paddingLeft: '3.7%',paddingTop: '2%',textAlign:'left'}}>
                                            <Card.Title><h4 style={{color:'rgb(116, 10, 10)'}}>{appointment?.CentreName?.value}</h4></Card.Title>
                                        </Col>
                                        <Col sm={1} style={{paddingRight: '5%',paddingTop: '2%',textAlign:'right'}}>
                                            <Nav.Link onClick={()=>{setShowConfirmationBox(true);}}><BsTrash className="TextColor" size={16} /></Nav.Link>
                                        </Col>
                                    </Row>
                                    <Card.Body>
                                        <Card.Text>
                                            <Row>
                                                <Col sm={6}>
                                                    <p style={{marginTop:'-3%'}}><strong className='TextCursive' style={{color:'#635f5f'}}>Donor Name: </strong>{appointment?.DonorName?.value}</p>
                                                    <p style={{marginTop:'-5.5%'}}><strong className='TextCursive' style={{color:'#635f5f'}}>Blood Group: </strong>{appointment?.BloodGroup?.value}</p>
                                                    <p style={{marginTop:'-5.5%'}}><strong className='TextCursive' style={{color:'#635f5f'}}>Donor Email: </strong>{appointment?.DonorEmail?.value}</p>
                                                    <p style={{marginTop:'-5.5%'}}><strong className='TextCursive' style={{color:'#635f5f'}}>Donor City: </strong>{appointment?.City?.value}</p>
                                                </Col>
                                                <Col sm={6}>
                                                    <p style={{marginTop:'-3%'}}><strong className='TextCursive' style={{color:'#635f5f'}}>Centre Name: </strong>{appointment?.CentreName?.value}</p>
                                                    <p style={{marginTop:'-5.5%'}}><strong className='TextCursive' style={{color:'#635f5f'}}>Timings: </strong>{appointment?.Timings?.value}</p>
                                                    <p style={{marginTop:'-5.5%'}}><strong className='TextCursive' style={{color:'#635f5f'}}>Location: </strong>{appointment?.Location?.value}</p>
                                                </Col>
                                            </Row>
                                        
                                        </Card.Text>
                                        
                                        <ListGroup className="list-group-flush"style={{marginTop:'-5.3%'}}>
                                            <ListGroup.Item></ListGroup.Item>
                                            <ListGroup.Item>
                                                <div>
                                                    <Link to={{ pathname: `/user/appointment-details/${appointment.ID.value}`, state: { appointment } }} className='d-flex justify-content-end TextColor' style={{marginBottom:'-3%',textDecoration:'none',fontSize:'14.5px',fontWeight:'600'}}>
                                                        View details <ArrowRight className="m-1" size={16} />
                                                    </Link>
                                                </div>
                                                
                                            </ListGroup.Item>
                                        </ListGroup>  

                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={4}></Col>
                            <Col sm={4}></Col>
                        </Row>
                    </Col>

                </div>
                <div>
                    {showConfirmationBox && (
                        <ConfirmationBox
                        message="Are you sure you want to delete an appointment?"
                        onConfirm={deleteAppointment}
                        onCancel={handleCancelConfirmationBox}
                        />
                    )}
                </div>
            </Row>
        </Container>

    </div> );
}

export default SingleAppointment;