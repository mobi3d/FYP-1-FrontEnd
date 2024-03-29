import React from "react";
import { Row, Col,Button } from "react-bootstrap";
import { CDBFooter, CDBFooterLink, CDBBox, CDBBtn, CDBIcon } from 'cdbreact';
import logo from '../../Public/user/image/AppLogo4.png';
import './css/style.css';
import { ArrowRight } from "react-bootstrap-icons";
import SocialMediaButtons from "./SocialMediaButtons";
const UserPanelFooter = () => {

    const [isHover, setIsHover] = React.useState(true);

    const handleMouseEnter = () => {
        setIsHover(false);
    };

    const handleMouseLeave = () => {
        setIsHover(true);
    };
    const ButtonStyle1 = {
        backgroundColor: isHover ? '#D64045' : '#27213C',
        color: isHover ? 'white' : 'white',
        transform: isHover ? 'scale(0.76)' : 'scale(0.80)',
        border: isHover ? '' : '1px solid white',
        transitionDuration: isHover ? '' : '0.45s',
    };

    return (
        <CDBFooter className="FooterColor">
        <CDBBox display="flex" flex="column" className="mx-auto py-5" style={{ width: '85%' }}>
            <CDBBox display="flex" justifyContent="between" className="flex-wrap">
            <CDBBox>
                <a href="/userpanel/HomeScreen" className="d-flex align-items-center p-0 TextColor" style={{textDecoration:'none'}}>
                <img alt="logo" src={logo} width="36px" height='42rem' />
                <h4 className="RedColor d-flex"><div style={{fontFamily:'cursive'}}>Donate</div><div style={{fontFamily:'cursive',color:'#27213C',fontSize:'15px'}}> life</div></h4>
                </a>
                <p className="my-3 text-center" style={{ width: '250px' }}>
                    This helps for making blood donation easily.
                </p>
                <CDBBox className="mt-4">
                    <SocialMediaButtons></SocialMediaButtons>
                </CDBBox>
            </CDBBox>
            
            <CDBBox>
                <p className="h6 mb-2" style={{ fontWeight: '600' }}>
                Blood
                </p>
                <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0',textDecoration:'none'}}>
                <CDBFooterLink href="/">Blood Donors, Request Makers</CDBFooterLink>
                <CDBFooterLink href="/">Make Blood Donation, Post Blood Request</CDBFooterLink>
                <CDBFooterLink href="/">Registered As a Donor, Request Maker,Sign In</CDBFooterLink>
                <CDBFooterLink href="/">Blood Donation Centers</CDBFooterLink>
                <CDBFooterLink href="/">Blood Analysis/Eligibility</CDBFooterLink>
                <CDBFooterLink href="/">Make Appointments</CDBFooterLink>
                </CDBBox>
            </CDBBox>
            {/* <CDBBox>
                <p className="h6 mb-4" style={{ fontWeight: '600' }}>
                Features
                </p>
                <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
                <CDBFooterLink href="/">Frequently Asked Question</CDBFooterLink>
                <CDBFooterLink href="/">Packages</CDBFooterLink>
                <CDBFooterLink href="/">Job Posts</CDBFooterLink>
                <CDBFooterLink href="/">Financial Donation</CDBFooterLink>
                <CDBFooterLink href="/">Campaigns</CDBFooterLink>
                <CDBFooterLink href="/">Enquiries</CDBFooterLink>
                <CDBFooterLink href="/">Advertisement/News</CDBFooterLink>
                <CDBFooterLink href="/">Blog</CDBFooterLink>
                </CDBBox>
            </CDBBox> */}
            
            <CDBBox>
                <p className="h6 mb-2" style={{ fontWeight: '600' }}>
                About Us
                </p>
                <CDBBox flex="column" style={{cursor: 'pointer', padding: '0',color:"drak"}}>
                <CDBFooterLink href="/">Support, Contact</CDBFooterLink>
                <CDBFooterLink href="/">Who We Are</CDBFooterLink>
                <CDBFooterLink href="/">Our Team, Our Services</CDBFooterLink>
                <CDBFooterLink href="/">Partner With Us(Sponsors)</CDBFooterLink>
                <CDBFooterLink href="/">Meet Our Researchers</CDBFooterLink>
                <CDBFooterLink href="/">About Us</CDBFooterLink>
                </CDBBox>
            </CDBBox>
            <CDBBox>
                <p className="h6 mb-2" style={{ fontWeight: '600' }}>
                Panels/Interfaces
                </p>
                <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
                <CDBFooterLink href="/">User(Donor,Request Maker) Panel</CDBFooterLink>
                <CDBFooterLink href="/">Admin Panel</CDBFooterLink>
                <CDBFooterLink href="/">Center Panel</CDBFooterLink>
                <CDBFooterLink href="/">Lab Panel</CDBFooterLink>
                </CDBBox>
            </CDBBox>
            
            </CDBBox>
            
        </CDBBox>
        <CDBBox display="flex" flex="column" className="mx-auto py-1" style={{ width: '10.5%' }}>
            <Button variant="default" style={ButtonStyle1} 
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
                href='/user/login' >Donate Now <ArrowRight className="" size={17} /></Button>  
        </CDBBox>
        <CDBBox display="flex" flex="column" className="mx-auto py-1" style={{ width: '45%' }}>
            {/* <p className="text-center mt-1 pl-5">DONORS acknowledges and pays our respect to the past, present and future Traditional Custodians and Elders of this nation
                and the continuation of cultural, spiritual and educational practices of Aboriginal and Torres Strait Islander peoples.</p> */}
            <h6 className="text-center mt-1 RedColor">&copy; DONOR, 2022. All rights reserved.</h6>
        </CDBBox>
            
        </CDBFooter>
    );
};
export default UserPanelFooter;