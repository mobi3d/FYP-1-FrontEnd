import React,{useState,useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { BsStopwatch } from 'react-icons/bs';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { BsEnvelopeFill } from 'react-icons/bs';
import { BsGeoAltFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CenterRegistration=()=> {
  const [center, setCenterData] = useState({
    userName:"",
    password:"",
    name: "",
    city:"",
    location:"",
    licenseNo:"",
    contactNo:"",
    email:"",
    openingDays:"",
    timings:"",
    category:"",
  });

  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [imageData, setImageData] = useState(null);
  const imageId="646dd40936040839af204d4e";
  const url="http://localhost:3003";
  useEffect(() => {
    axios
      .get(`http://localhost:3003/users/images/${imageId}`)
      .then((response) => {
        setImageData(response.data);
        console.log("Response",response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleImageChange = (event) => {
     event.preventDefault();
    setImage(event.target.files[0]);
  };
  
  const handleImageSubmit = (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("image", image);
  
    axios
      .post("http://localhost:3003/users/upload", formData)
      .then((res) => {
        console.log(res.data)
        setMessage(res.data.message);
      })
      .catch((error) => {
        setMessage(error.message);
        console.log("error",error)
      });
  };
  const validateForm = () => {
    let isValid = true;
    const errors = {};
  
    if (!center.name) {
      isValid = false;
      errors.nameError = "Please enter a name";
    }
  
    if (!center.city) {
      isValid = false;
      errors.CityError = "Please enter a city";
    }
  
    if (!center.location) {
      isValid = false;
      errors.locationError = "Please enter a location";
    }
  
    if (!center.contactNo) {
      isValid = false;
      errors.contactNoError = "Please enter a contact number";
    }
  
    if (!center.email) {
      isValid = false;
      errors.emailError = "Please enter an email";
    }
  
    if (!isValid) {
      setCenterData({ ...center, ...errors });
    }
  
    return isValid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let newCenterData = { ...center, [name]: value };
    // For the contact Number validation
    if (name === "contactNo") {
      const phoneNumberRegex = /^\+92\s\d{3}\s\d{7}$/; // regex for the required format
      if (!phoneNumberRegex.test(value)) {
        newCenterData = { ...center, [name]: value, contactNoError: "Please enter a valid phone number" };
      } else {
        newCenterData = { ...center, [name]: value, contactNoError: null };
      }
    }
    // For email valigation
    if (name === "email") {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; // regex for the required format

      console.log(emailRegex.test("example@mail.com")); // true
      console.log(emailRegex.test("example@mail.")); // false

      if (!emailRegex.test(value)) {
        newCenterData = { ...center, [name]: value, emailError: "Please enter a valid email address" };
      } else {
        newCenterData = { ...center, [name]: value, emailError: null };
      }
    }

    // For location
    if (name === "location") {
      if (!isNaN(value)) {
        newCenterData = { ...center, [name]: value, locationError: "Please enter Correct location " };
      } else {
        newCenterData = { ...center, [name]: value, locationError: null };
      }
    }
    // For city
    if (name === "city") {
      if (!isNaN(value)) {
        newCenterData = { ...center, [name]: value, CityError: "Please enter Correct location " };
      } else {
        newCenterData = { ...center, [name]: value, CityError: null };
      }
    }
    setCenterData(newCenterData);
  };

const handleSubmit = (event) => {
  event.preventDefault();
  const isValid = validateForm();
  if (isValid) {
  setShowModal(true);
  }
};

const handleLogin=(e)=>{
  e.preventDefault();
  window.location.href="/user/login";
}


const handleConfirm = () => {
  axios
  .post(`http://localhost:8081/api/bloodCenter/CenterRegistration/add`, center)
  .then((response) => {
    console.log(response.data);
    toast(response.data.success,{position:toast.POSITION.TOP_RIGHT});
    window.location.href = "/user/login";
  })
  .catch((error) => {
    console.error(error);
    toast.error(error,{position:toast.POSITION.TOP_CENTER}
  )});
setShowModal(false);
}

const handleCancel = () => {
  setShowModal(false);
}

  const mystyle = {
      height: "7%",
      width: "7%",
      borderRadius: "50px",
      display: "inline-block",
};

  return (
  <div  style={{backgroundColor:"#EEEEEE"}}>
    <Container style={{backgroundColor:"#D5D5D5"}} fluid>
      <Row>
        <Col className="mt-md-2" xs={12}>
            <Card style={{paddingBottom:10,alignItems:"center",justifyContent:"center",backgroundColor:"#970C10",color:"white"}} className="shadow p-3 mb-2 rounded">
              <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
              <Card.Body>
                <Card.Title style={{justifyContent:"center",textAlign:"center"}}>
                  Blood Donation Center Registration
                </Card.Title>
                <Card.Footer style={{justifyContent:"center",textAlign:"center"}}>
                  Here you can register your blood Donation Centre by providing correct credentials.
                </Card.Footer>
              </Card.Body>
          </Card>
        <div>
          <Form className="mt-5">
            <Row className="mb-3">
              <Col xs="12" sm="3">
                <Form.Group  controlId="formGridEmail">
                  <Form.Label>Username</Form.Label>
                  <i class="fa fa-user-circle" aria-hidden="true"></i>
                  <Form.Control   name="userName"  placeholder="Enter UserName" value={center.userName} onChange={handleChange}/>
                </Form.Group>
              </Col>
              <Col xs="12" sm="3">
                <Form.Group  controlId="formGridEmail">
                  <Form.Label>Password</Form.Label>
                  <i class="fa fa-user-circle" aria-hidden="true"></i>
                  <Form.Control   name="password"  placeholder="Enter Password" value={center.password}  onChange={handleChange}/>
                </Form.Group>
              </Col>
              <Col xs="12" sm="3">
                <Form.Group controlId="formGridPassword">
                  <Form.Label>License Number</Form.Label>
                  <i class="fa fa-id-card" aria-hidden="true"></i>
                  <Form.Control name="licenseNo" placeholder="License Number"  value={center.licenseNo} onChange={handleChange}/>
                </Form.Group>
              </Col>
              <Col xs="12" sm="3">
                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Location/Address</Form.Label>
                  <BsGeoAltFill size={15}/>
                    <Form.Control name="location" placeholder="Main Ferozpur Road" value={center.location} onChange={handleChange}/>
                    {center.locationError && (
                      <p style={{ color: 'red' }}>{center.locationError}</p>
                    )}
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs="12" sm="3">
                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>City</Form.Label>
                  <i class="fa fa-location-arrow" aria-hidden="true"></i>
                  <Form.Control name="city" placeholder="Lahore, Punjab, Pakistan" value={center.city} onChange={handleChange}/>
                  {center.locationError && (
                    <p style={{ color: 'red' }}>{center.locationError}</p>
                  )}
                </Form.Group>
              </Col>
              <Col xs="12" sm="3">
              <Form.Group className="mb-3" controlId="contact1">
                <Form.Label>Contact Number</Form.Label>
                <BsFillTelephoneFill size={15} />
                <Form.Control placeholder="+9234946123" name="contactNo" value={center.contactNo} onChange={handleChange}/>
                {center.contactNoError && (
                  <p style={{ color: 'red' }}>{center.contactNoError}</p>
                )}
              </Form.Group>
              </Col>
              <Col xs="12" sm="3">
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <BsEnvelopeFill size={15} />
                  <Form.Control name="email" placeholder="example@gmail.com" value={center.email} onChange={handleChange}/>
                  {center.emailError && (
                    <p style={{ color: 'red' }}>{center.emailError}</p>
                  )}
                </Form.Group>
              </Col>
              <Col xs="12" sm="3">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name of Center</Form.Label>
                  <BsEnvelopeFill size={15} />
                  <Form.Control name="name" placeholder="XYZ Donation Center" value={center.name} onChange={handleChange}/>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs="12" sm="4">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Available Timings</Form.Label>
                  <BsStopwatch size={15} />
                  {/*<Form.Control placeholder="Timings of Center" name="timings" value={center.timings} onChange={handleChange} required/>*/}
                  <Form.Select required name="timings" value={center.timings} onChange={handleChange} >
                      <option value="">Select Timing/Shift of Center*</option>
                      <option value="6AM-2PM">6AM-2PM</option>
                      <option value="2PM-11PM">2PM-11PM</option>
                      <option value="11PM-6AM">11PM-6AM</option>
                      <option value="6AM-6PM">6AM-6PM</option>
                      <option value="6PM-6AM">6PM-6AM</option>
                      <option value="12AM-12PM/Full Day/Night">12AM-12PM/Full Day/Night</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs="12" sm="4">
                <Form.Group controlId="formGridState">
                  <Form.Label>Opening Days</Form.Label>
                  <i class="fa fa-sun" aria-hidden="true"></i>
                  <Form.Control placeholder="Opening Days" name="openingDays" value={center.openingDays} onChange={handleChange} required/>
                </Form.Group>
              </Col>
              <Col xs="12" sm="4">
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Category</Form.Label>
                  <i class="fa fa-registered" aria-hidden="true"></i>
                  {/* <Form.Control name="category" placeholder="Category" value={center.category} onChange={handleChange}/>
                  {center.categoryError && (
                    <p style={{ color: 'red' }}>{center.categoryError}</p>
                  )} */}
                  <Form.Select required name="category" value={center.category} onChange={handleChange} >
                      <option value="">Select Category of Center*</option>
                      <option value="Private">Private</option>
                      <option value="Public">Public</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} id="formGridCheckbox">
                <Form.Check type="checkbox" label="Are the provided information is correct according to your center or knowledge?" />
              </Form.Group>
            </Row>
          </Form>
          <Row className="mb-3">
              <Col xs={6}>
                  <Button style={{ display: "inline-block", width:"75%",textAlign:"center",backgroundColor: "#153250"}} onClick={handleSubmit}>Register Blood Donation Center</Button>
              </Col>
          </Row>
          <Row className="mb-3">
            <Card className="mb-5 mt-5 pt-2 pb-2 shadow p-3 mb-2 rounded" border="success" >
              <p>If you are already registered then you can login through this button!</p>
              <Col xs={6}>
                  <Button style={{ display: "inline-block", width:"75%",textAlign:"center",backgroundColor: "#153250"}} onClick={handleLogin}>Already Registered? Go to Login.</Button>
              </Col>
            </Card>  
          </Row>
        </div>
        <Col>
            <form onSubmit={handleImageSubmit}>
              <input type="file" accept="image/*"  onChange={handleImageChange} />
                <button type="submit">Upload</button>
                  {message && <p>{message}</p>}
            </form>
        </Col>
        <div>
      {imageData ? (
        <img src={`http://localhost:3003/${imageData.imagePath.replace(/\\/g, '/').replace('public/', '')}`} alt="Image" />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
      <Modal show={showModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to submit the form?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel} style={{backgroundColor: "#153250"}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm} style={{backgroundColor: "#153250"}}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
        </Col>
      </Row>
    </Container>
  </div>
  );
}

export default CenterRegistration;