import React,{useState,useEffect} from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import DataTable from 'react-data-table-component';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Header from "./LabComponents/Header";
import { toast } from 'react-toastify';
import { handleRequestReportsPrint } from "./LabComponents/PrintedFiles/RequestedReport";
import LoadingSpinner from "../../Components_for_All_Panels/BloodCentre/LoadingSpinner";
import {  PrinterFill } from 'react-bootstrap-icons';
const ReportRequests=()=> {  


  const [loading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [blood, setbloodData] = useState([]);
  const [CBCData, setSingleData] = useState(
    {
      ID: "",
      UserName:"",
      Age: "",
      Sex: "",
      WBC: "",
      RBC: "",
      HGB: "",
      PLT: "",
      STDs: "",
      AIDs: "",
      Diabetes: "",
      Syphilis: "",
    }
  );
  
  function handleClose() {
    console.log("Handle Closed clicked");
    return setShow(false);
  }
  const handleShow = (UserName) => {
    console.log("Handle Show Button clicked");
    console.log("UserName",UserName);
    axios.get(`http://localhost:8081/api/labs/getCBCdetails/byUserName/${UserName}`).then((response)=>{
      const { results } = response.data;
      if (results && results.bindings && results.bindings.length > 0) {
        const CBCdata = results.bindings[0];
        setSingleData({
          ID: CBCdata.ID.value,
          UserName:CBCdata.UserName.value,
          Age: CBCdata.Age.value,
          Sex: CBCdata.Sex.value,
          WBC: CBCdata.WBC.value,
          RBC: CBCdata.RBC.value,
          HGB: CBCdata.HGB.value,
          PLT: CBCdata.PLT.value,
          STDs: CBCdata.STDs.value,
          AIDs: CBCdata.AIDs.value,
          Diabetes: CBCdata.Diabetes.value,
          Syphilis: CBCdata.Syphilis.value,
        });
        console.log("Data",CBCdata);
      }});
    return setShow(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSingleData((prevCenterData) => ({ ...prevCenterData, [name]: value }));
  };
  // const handleSaveChanges = () => {
  //   console.log("Handle Save Changes clicked");
  //   console.log("ID",bloodData.ID);
  //   axios
  //     .put(`http://localhost:8081/api/bloodCenter/RegisteredCenters/bloodStockDetails/${bloodData.ID}`, bloodData)
  //     .then((response) => {
  //       console.log("Response Data",response.data);
  //       toast(response.data.success,{position:toast.POSITION.TOP_RIGHT});
  //       handleClose();
  //       window.location.reload();
  //     })
  //     .catch((error) => {
  //       toast.error(error,{position: toast.POSITION.TOP_RIGHT});
  //       console.log("Error updating data: ", error);
  //     });
  // };
  
  useEffect(() => {
    // fetch data from the backend
    fetch('http://localhost:8081/api/labs/AllDonorsCBCReport')
      .then((response) => response.json())
      .then((data) => {
        // map the bindings array to an array of objects
        const rows = data.results.bindings.map((binding) => {
          return {
            ID: binding.ID,
            UserName: binding.UserName,
            Name: binding.Name,
            Address: binding.Address,
            Email: binding.Email,
            ContactNo: binding.ContactNo,
            City: binding.City,
            Status: binding.Status,
          };
        });
        setData(rows);
      })
      .catch((error) => console.log(error));
      setIsLoading(false);
  }, []);
  const handlePrint = () => {
    handleRequestReportsPrint(data);
  };
   
const mystyle = {
  height: "7%",
  width: "7%",
  borderRadius: "50px",
  display: "inline-block",
};  
/* 
const columns = [
  {
    name: 'ID',
    selector: 'ID.value',
    sortable: true,
  },
  {
    name: 'Name',
    selector: 'Name.value',
  },
  {
    name: 'Email',
    selector: 'Email.value',
  },
  {
    name: 'Gender',
    selector: 'Gender.value',
  },
  {
    name: 'Blood Group',
    selector: 'Blood_Group.value',
  },
  {
    name: 'Contact',
    selector: 'Contact.value',
  },
  {
    name: 'City',
    selector: 'City.value',
  },
  {
    name: 'Hospital',
    selector: 'Hospital.value',
  },
  {
    name: 'Action',
    cell: (row) => (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="primary" style={{ borderRadius: 0, width:"100%", height:"auto",marginRight:"5px" }} onClick={() => handleApprove(row.ID.value)}>Approve</Button>
        <Button variant="success" style={{ borderRadius: 0, width:"100%",height:"auto" }} onClick={() => handleReject(row.ID.value)}>Deny</Button>
      </div>
    )
  }  
]; */
  return (
    loading ? <LoadingSpinner/> :
    <>
    <Modal fade={false} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{textAlign:"center",justifyContent:"center",fontSize:"22px"}}>CBC Report Details</Modal.Title>
        </Modal.Header>
        <Modal.Title style={{textAlign:"center",fontSize:"18px",justifyContent:"center"}}>{CBCData.UserName}</Modal.Title>

        <Modal.Body>
          <Form>
          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  placeholder="Age"
                  autoFocus
                  name="Age"
                  value={CBCData.Age}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>
                  Sex
                </Form.Label>
                <Form.Control
                  placeholder="Sex"
                  autoFocus
                  name="Sex"
                  value={CBCData.Sex == 0 ? 'Male' : 'Female'}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>PLT</Form.Label>
                <Form.Control
                  placeholder="PLT"
                  autoFocus
                  name="PLT"
                  value={CBCData.PLT}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>
                  WBC
                </Form.Label>
                <Form.Control
                  placeholder="WBC"
                  autoFocus
                  name="WBC"
                  value={CBCData.WBC}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>RBC</Form.Label>
                <Form.Control
                  placeholder="RBC"
                  autoFocus
                  name="RBC"
                  value={CBCData.RBC}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>
                  HGB
                </Form.Label>
                <Form.Control
                  placeholder="HGB"
                  autoFocus
                  name="HGB"
                  value={CBCData.HGB}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>STDs</Form.Label>
                <Form.Control
                  placeholder="STDs"
                  autoFocus
                  name="STDs"
                  value={CBCData.STDs == 1 ? 'Yes' : 'No'}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>
                AIDs
                </Form.Label>
                <Form.Control
                  placeholder="AIDs"
                  autoFocus
                  name="AIDs"
                  value={CBCData.AIDs == 1 ? 'Yes' : 'No'}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Diabetes</Form.Label>
                <Form.Control
                  placeholder="Diabetes"
                  autoFocus
                  name="Diabetes"
                  value={CBCData.Diabetes == 1 ? 'Yes' : 'No'}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>
                Syphilis
                </Form.Label>
                <Form.Control
                  placeholder="Syphilis"
                  autoFocus
                  name="Syphilis"
                  value={CBCData.Syphilis == 1 ? 'Yes' : 'No'}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} style={{backgroundColor: "#153250"}}>
            Close
          </Button>
          <Button variant="primary" style={{backgroundColor: "#153250"}}> 
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    <Container style={{backgroundColor:"#EEEEEE"}} fluid>
      <Header />
      <Row>
        <Col className="mt-sm-5" xs={12}>
        <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center",backgroundColor:"#85586F",color:"white"}} className="shadow p-3 mb-2 rounded">
          <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
            <Card.Body>
              <Card.Title >All Report Requests</Card.Title>
            </Card.Body>
        </Card>
        {/*  <DataTable title = "All Reports Requests" columns={columns} data={data}
            pagination
            fixedHeader
            fixedHeaderScrollHeight='500px'
            selectableRows
            selectableRowsHighlight
            highlightOnHover
            actions ={
              <button className='btn btn-info' onClick={handlePrint} style={{backgroundColor: "#153250",color:"white"}}> Download All Report Requests</button>
            }
            subHeader
          /> */}
          {data.length > 0 ? (
          <div>
          {
            data.map((item) => (
              <Col md={12} xs={12}>
                <Card className="shadow p-3 mb-2 mt-2 rounded">
                  <Card.Body>
                    <Card.Text>
                      <Row>
                        <Col xs={5}>
                          <h6>
                            User Name:  
                          </h6>
                          <h6>
                            Name:
                          </h6>
                          <h6>
                            Email:
                          </h6>
                          <h6>
                            Address:
                          </h6>
                          <h6>
                            City:
                          </h6> 
                          <h6>
                            Contact No:
                          </h6>
                          <h6>
                            Status:
                          </h6>
                        </Col>
                        <Col xs={7}>
                          <h6>
                            {item.UserName.value}
                          </h6>
                          <h6>
                            {item.Name.value}
                          </h6>
                          <h6>
                            {item.Email.value}
                          </h6>
                          <h6>
                            {item.Address.value}
                          </h6>
                          <h6>
                            {item.City.value}
                          </h6>
                          <h6>
                            {item.ContactNo.value}
                          </h6>
                          <h6>
                            {item.Status.value}
                          </h6>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} style={{justifyContent:"center",textAlign:"center",marignBottom:"20px",marginTop:"16px"}}>
                          <div>
                            <Button className='btn btn-info mb-3' onClick={()=>handleShow(item.UserName.value)} style={{backgroundColor: "#153250",color:"#fff"}}>Add Report Details</Button>
                          </div>
                        </Col>
                      </Row>
                    </Card.Text>                   
                  </Card.Body> 
                </Card>
              </Col>
            ))
         }
         </div>
          ) : (
            <div>
              <h6 style={{textAlign:"center",marginTop:"20px"}}>No Report Requests Found!</h6>
            </div>
          )}
          {
            data.length>0?(
              <div>
              {
                <Col xs={12} style={{justifyContent:"center",textAlign:"center",marignBottom:"20px",marginTop:"16px"}}>
                  <div>
                    <h6>
                      For Printing the Report list, click this button. This is for record Purposes only.
                    </h6>
                      <Button className='btn btn-info mb-3' onClick={() => handleShow()} style={{backgroundColor: "#153250",color:"#fff"}}><PrinterFill className="" size={20} />Download/Print</Button>
                  </div>
                </Col>
              }
              </div>
          )
           : (
            <div>
              
            </div>
          )}
        </Col>
      </Row>
    </Container>
  </>
  );
}

export default ReportRequests;