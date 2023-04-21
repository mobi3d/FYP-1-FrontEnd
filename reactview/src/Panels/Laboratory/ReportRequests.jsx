import React,{useState,useEffect} from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import DataTable from 'react-data-table-component';
import Header from "./LabComponents/Header";

const ReportRequests=()=> {  
    const [selectedRowIds, setSelectedRowIds] = useState({});

  const [data, setData] = useState([]);
  const [approvedData, setApprovedData] = useState([]);
        const handleApprove = (id) => {
          console.log("ID:"+id);
          
        //     axios
        //         .post(`http://localhost:8081/api/users/bloodrequest/approve/${id}`)
        //         .then((response) => console.log(response.data))
        //         .catch((error) => console.log(error));
          // Find the approved data from the current data state and remove it
          const approvedItem = data.find((item) => item.ID.value === id);
          setData(data.filter((item) => item.ID.value !== id));
          console.log("Data after removing approved item", data);
          // Add the approved data to the approvedData state array
          setApprovedData((prevData) => [...prevData, approvedItem]);
          console.log("approvedData", approvedData);

        };
        const handleReject = (id) => {
          console.log("ID:"+id);  
          /* axios
                .post(`http://localhost:8081/api/users/bloodrequest/reject/${id}`)
                .then((response) => console.log(response.data))
                .catch((error) => console.log(error)); */
              // Find the rejected data from the current data state and remove it
              setData(data.filter((item) => item.ID.value !== id));
              console.log("Data after removing rejected item", data);
        };

  useEffect(() => {
    // fetch data from the backend
    fetch('http://localhost:8081/api/users/bloodrequest')
      .then((response) => response.json())
      .then((data) => {
        // map the bindings array to an array of objects
        const rows = data.results.bindings.map((binding) => {
          return {
            ID: binding.ID,
            Name: binding.Name,
            Email: binding.Email,
            Gender: binding.Gender,
            Location: binding.Location,
            Message: binding.Message,
            Blood_Group: binding.Blood_Group,
            Contact: binding.Contact,
            City: binding.City,
            Hospital: binding.Hospital,
          };
        });
        setData(rows);
      })
      .catch((error) => console.log(error));
  }, []);
  const handlePrint = () => {
    let printContent = '<html><head><style>';
    printContent += 'table { border-collapse: collapse; width: 100%; }';
    printContent += 'th, td { border: 1px solid black; padding: 8px; text-align: left; }';
    printContent += 'th { background-color: #dddddd; }';
    printContent += 'h1 { padding:8px; text-align: center; }';
    printContent += '  body { -webkit-print-color-adjust: exact; }';
    printContent += '@media print {';
    printContent += '  #header { position: fixed; top: 0; left: 0; right: 0; height: 80px; background-color: #f5f5f5; border-bottom: 1px solid black; }';
    printContent += '  #footer { position: fixed; bottom: 0; left: 0; right: 0; height: 30px; background-color: #f5f5f5; border-top: 1px solid black; }';
    printContent += '  #content { margin-top: 80px; margin-bottom: 30px; }';
    printContent += '  #watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.5; }';
    printContent += '}';
    printContent += '</style></head><body>';
    printContent += '<div id="header"><h1>All Report Requests</h1></div>';
    printContent += '<div id="content">Add the content or description here<table>';
    printContent += '<tr><th>ID</th><th>Name</th><th>Email</th><th>Gender</th><th>Location</th><th>Message</th><th>Blood Group</th><th>Contact</th><th>City</th><th>Hospital</th></tr>';
    data.forEach((row) => {
      printContent += `<tr><td>${row.ID.value}</td><td>${row.Name.value}</td><td>${row.Email.value}</td><td>${row.Gender.value}</td><td>${row.Location.value}</td><td>${row.Message.value}</td><td>${row.Blood_Group.value}</td><td>${row.Contact.value}</td><td>${row.City.value}</td><td>${row.Hospital.value}</td></tr>`;
    });
    printContent += '</table></div>';
    printContent += '<div id="footer"><p style="text-align: center; margin-top: 8px;">Footer content will add up here </p></div>';
    printContent += '<div id="watermark">Copy</div>';
    printContent += '</body></html>';
  
    // Create a new window with the printable HTML and print it
    const printWindow=window.open('','','width=800,height=600');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };
  
  
  
   
const mystyle = {
  height: "7%",
  width: "7%",
  borderRadius: "50px",
  display: "inline-block",
};  

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
];
  return (
    <Container style={{backgroundColor:"#EEEEEE"}}>
      <Header />
      <Row>
        <Col className="mt-md-5" xs={12}>
        <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center",backgroundColor:"#85586F",color:"white"}} >
          <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
            <Card.Body>
              <Card.Title >All Report Requests</Card.Title>
            </Card.Body>
        </Card>
        <DataTable title = "All Reports Requests" columns={columns} data={data}
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
        />
        </Col>
      </Row>
    </Container>
  );
}

export default ReportRequests;