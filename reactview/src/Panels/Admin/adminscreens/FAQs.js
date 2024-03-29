import { TextField } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Col, FloatingLabel, Form, InputGroup, Row } from "react-bootstrap";
import { Book, CalendarDateFill, Geo } from "react-bootstrap-icons";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import packageService from "./Services/PackageService";
import SingleFaqs from "./Components/SingleFaqs";
import { useAuth } from "../../BloodDonationCentre/Auth/AuthContext";
import jwtDecode from "jwt-decode";

export default function FAQs() {
  const {token} = useAuth();
    
  const decodedToken = token ? jwtDecode(token) : null;
  const role = decodedToken?.role;

  const authCentre=()=>{
    if(role!='ADMIN'){
      window.location.href = "/user/login";
    }
      console.log("authCentre");
  }

  React.useEffect(() => {
    authCentre();
  }, []);
  const [users, setUsers] = React.useState([]);
  const [Title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const pdfContainerRef = useRef(null);
  const PDFnotify = () => {
    toast.success("PDF generated successfully");
  };

  const [faqs, setFaqs] = React.useState([]);

  const getData = () => {
    packageService
      .getFAQs()
      .then((data) => {
        setFaqs(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(getData, []);
  console.log(faqs.results);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/admin/getFAQ")
      .then((response) => {
        console.log("Response is:", response.data.results.bindings);
        const faqs = response.data.results.bindings.map((faq) => {
          return {
            title: faq.Title.value,
            details: faq.Details.value,
            id: faq.ID.value,
          };
        });
        setUsers(faqs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { title: Title, details: description };
    console.log("the data I am sending is", data);
    axios
      .post("http://localhost:8081/api/admin/addFAQ", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("My data response in Faqs is", response);
        toast.success("Record Added successfully");
        getData();
        setTitle("");
        setDescription("");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to add Question. Please try again!");
      });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const campaignsContainer = pdfContainerRef.current;

    const buttons = campaignsContainer.querySelectorAll(".bton");
    buttons.forEach((button) => (button.style.display = "none"));

    html2canvas(campaignsContainer)
      .then((canvas) => {
        buttons.forEach((button) => (button.style.display = "inline-block"));

        const imageData = canvas.toDataURL("image/png");

        doc.addImage(imageData, "PNG", 10, 10, 190, 0);

        doc.save("FAQs.pdf");
      })
      .catch((error) => {
        buttons.forEach((button) => (button.style.display = "inline-block"));

        console.error("Error generating PDF:", error);
      });
    PDFnotify();
  };
  return (
    <div className="turningred fontfamily">
      <h1 className="color">Frequently Asked Questions</h1>
      <h3 className="color marginss">
        <u>Add a New Question</u>
      </h3>
      <div className="container inputcont">
        <div className="row">
          <div className="col settingss">
            <h5 className="rang">Question</h5>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <Book className="Appcolor" size={30} />
              </InputGroup.Text>
              <FloatingLabel
                controlId="floatingPassword"
                label="Enter Question Title Here"
              >
                <Form.Control
                  type="City"
                  placeholder="Enter Question Title Here"
                  value={Title}
                  onChange={handleTitleChange}
                />
              </FloatingLabel>
            </InputGroup>
          </div>

          <h5 className="rang">Answer</h5>
          <div className="container-fluid">
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              // defaultValue=""
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
        </div>
      </div>
      <div className="generatePDFButton">
        <button className="btn btn-danger" onClick={handleSubmit}>
          Submit Data
        </button>
      </div>
      <h3 className="color marginss">
        <u>Already Posted Questions</u>
      </h3>
      {/* <FloatingLabel controlId="floatingPassword" label="Search By  Title Here">
        <Form.Control
          type="City"
          placeholder="Enter Question Title Here"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </FloatingLabel> */}
      <div className="generatePDFButton">
        <button className="btn btn-danger" onClick={generatePDF}>
          Generate PDF
        </button>
      </div>

      <div style={{ width: "99.1%", marginBottom: "13%" }}>
        {faqs.length === 0 ? (
             <p className="turningreddish">There are no Questions!!</p>
        ) : (
          <Row className=" cardsmapping m-5">
            {faqs?.results?.bindings?.map((faqs, index) => (
              <Col sm={12} key={index}>
                <SingleFaqs key={index} faqs={faqs} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
