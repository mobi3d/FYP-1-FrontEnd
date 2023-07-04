import React, { useEffect, useState } from "react";
import { Container, Button,Image } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import { Link, useParams } from 'react-router-dom';
import image from '../../../Public/user/image/all-centre-menu.png';
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
                        <h2 className='RedColor' style={{fontWeight:"bold",fontFamily:"cursive",}}>{centre?.Name?.value}</h2>  
                        <p style={{fontWeight:"300"}}>There are donation centres all across the country. Find one that's closest to you. Make your appointment for the blood donation in the closest or nearest center.</p>
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
                                >MAKE APPOINTMENT</Button>
                        </Link>
                        </div>
                    </Col>
                    <Col sm={6}>
                    <div>
                        <Image src={image} rounded style={{marginLeft: "30%",marginTop:'-5%',height: "27rem",opacity:'1.0'}}></Image>
                    </div>
                    </Col>
                </Row>
                
            </Container>
        </div>
        
        <UserPanelFooter></UserPanelFooter>

    </div> );
};

export default BloodDonationCentreDetails;