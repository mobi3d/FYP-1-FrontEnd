import React, { useEffect, useState } from "react";
import { Container, Button,Image } from "react-bootstrap";
import { Form, Row, Col, Card, ListGroup, Nav,Dropdown,DropdownButton,InputGroup,Modal } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import { Link, useParams } from 'react-router-dom';
import { Search,ArrowRight,Trash } from 'react-bootstrap-icons';
import image from '../../../Public/user/image/jobpost.png';
import '../css/style.css';

import centreService from "../../../Services/Api/User/BloodDonationCentreService";

const BloodDonationCentreDetails = () => {

    const { centreID } = useParams();
    const [centre, setCentre] = useState();

    const getData = () => {
        centreService
            .getSingleCentre(centreID)
            .then((data) => {
                setCentre(data?.results?.bindings?.[0]);
            })
            .catch((err) => {
                console.log(err);
        });
    };

    
    useEffect(()=> getData, []);
    console.log(centre);

    const [isHover, setIsHover] = React.useState(true);

    const handleMouseEnter = () => {
        setIsHover(false);
    };

    const handleMouseLeave = () => {
        setIsHover(true);
    };
    const ButtonStyle1 = {
        backgroundColor: isHover ? '#27213C' : '#D64045',
        color: isHover ? 'white' : 'white',
        transform: isHover ? 'scale(0.8)' : 'scale(0.82)',
        border: isHover ? '' : '1px solid white',
        transitionDuration: isHover ? '' : '0.45s',
    };

    return ( <div>
        <UserPanelHeader></UserPanelHeader>
        <div style={{marginTop:'9%',marginBottom:'4%'}}>
            <Container>
                <Row style={{marginBottom:'3%'}}>
                    <Col sm={12} style={{textAlign:'center',width:'50%'}}>
                        <h2 className='RedColor' style={{fontWeight:"bold",fontFamily:"cursive",}}>Blood Donation Centre Details</h2>  
                        <p style={{fontWeight:"300"}}>The average person puts only 25% of his energy into his work. The world takes off its hat to those who put in more than 50% of their capacity, and stands on its head for those few and far between souls who devote 100%.</p>
                    </Col>
                </Row>
                <Row style={{marginBottom:'10%'}}>
                    <Col sm={6}>
                        <h4 className='PurpleColor' style={{fontSize:'18px'}}>Centre Name: <spam style={{fontSize:'16px',fontWeight:'400'}}>{centre?.Name?.value}</spam></h4>
                        <h4 className='PurpleColor' style={{fontSize:'18px'}}>Email: <spam style={{fontSize:'16px',fontWeight:'400'}}>{centre?.Email?.value}</spam></h4>
                        <h4 className='PurpleColor' style={{fontSize:'18px'}}>License: <spam style={{fontSize:'16px',fontWeight:'400'}}>{centre?.License?.value}</spam></h4>
                        <h4 className='PurpleColor' style={{fontSize:'18px'}}>Timings: <spam style={{fontSize:'16px',fontWeight:'400'}}>{centre?.Timings?.value}</spam></h4>
                        <h4 className='PurpleColor' style={{fontSize:'18px'}}>Opening Days: <spam style={{fontSize:'16px',fontWeight:'400'}}>{centre?.Opening_Days?.value}</spam></h4>
                        <h4 className='PurpleColor' style={{fontSize:'18px'}}>City: <spam style={{fontSize:'16px',fontWeight:'400'}}>{centre?.City?.value}</spam></h4>
                        <h4 className='PurpleColor' style={{fontSize:'18px'}}>Contact No: <spam style={{fontSize:'16px',fontWeight:'400'}}>{centre?.ContactNo?.value}</spam></h4>
                        <h4 className='PurpleColor' style={{fontSize:'18px'}}>Location: <spam style={{fontSize:'16px',fontWeight:'400'}}>{centre?.Location?.value}</spam></h4>
                        <h4 className='PurpleColor' style={{fontSize:'18px',marginBottom:'3%'}}>Category: <spam style={{fontSize:'16px',fontWeight:'400'}}>{centre?.Category?.value}</spam></h4>
                    
                        <div style={{textAlign:'right'}}>
                        <Link to={{ pathname: `/user/make-appointment/${centre?.ID?.value}`, state: { centre } }} className='TextColor' style={{paddingLeft:'0%',marginTop:'0%',textDecoration:'none'}}>
                            <Button variant="default" style={ButtonStyle1} 
                                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
                                >Make Appointment</Button>
                        </Link>
                        </div>
                    </Col>
                    <Col sm={6}>
                    <div>
                        <Image src={image} rounded style={{marginLeft: "48.5%",marginTop:'3.9%',height: "40%",opacity:'0.75'}}></Image>
                    </div>
                    </Col>
                </Row>
                
            </Container>
        </div>
        
        <UserPanelFooter></UserPanelFooter>

    </div> );
};

export default BloodDonationCentreDetails;