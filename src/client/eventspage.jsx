import "./css/theming.css";
import rbeLogo from "./Resources/RhoBetaEpsilon_Logo_noBackground.png";
import "./css/sidebar.css";
import React from "react";
import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  Table,
} from "react-bootstrap";

import TableData from "./tableData";

class hourEntry {
  constructor(date, num, reasoning) {
    this.date = date;
    this.numHours = num;
    this.reason = reasoning;
  }
  setDate(date) {
    this.date = date;
  }
  setNumHours(num) {
    this.numHours = num;
  }

  setReason(reason) {
    this.reason = reason;
  }

  setID(id) {
    this.id = id;
  }
}

function EventsPage() {
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [events, setEvents] = useState([]);
  const [editable, setEditable] = useState(true);
  const [content, setContent] = useState("Edit");
  //gets data from the server on load
  useEffect(() => {
    fetch("/getEvents", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("recieved data: ", data);
        setEvents(data);
      });
  }, []);





  return (
    <Container fluid>
      <Row>
        <Col
          sm={3}
          className=" text-white min-vh-100 p-3 primary-color"
          style={{ width: "340px" }}
        >
          <Navbar.Brand
            href="/homepage"
            className="d-flex align-items-center mb-3 mb-md-0 text-decoration-none"
          >
            <img src={rbeLogo} alt="Rho Beta Epsilon Logo" width="100px" />
            <span className="fs-4">Rho Beta Epsilon</span>
          </Navbar.Brand>
          <hr />
          <Nav
            defaultActiveKey="/eventspage"
            className="flex-column mb-auto"
            variant="pills"
          >
            <Nav.Link href="/homepage" className="primary">
              Home
            </Nav.Link>
            <Nav.Link href="/userpage" className="secondary">
              Profile
            </Nav.Link>
            <Nav.Link href="/eventspage" className="tertiary">
              Events
            </Nav.Link>
            {/* Add more Nav.Link items as needed */}
          </Nav>
          <hr />
          <NavDropdown
            title="Options"
            id="options-dropdown"
            className="btn-dark"
            fixed="bottom"
          >
            {/* Add NavDropdown.Item items as needed */}
            <NavDropdown.Divider />
            <NavDropdown.Item href="/signout" disabled>
              Sign out
            </NavDropdown.Item>
          </NavDropdown>
        </Col>

        <Col
          style={{ marginLeft: "20px", marginTop: "50px", maxWidth: "700px" }}
        >
          
          
          <div>
            <Table striped hover bordered id="submissionTable">
              <thead>
                <tr>
                  <th style={{ width: "200px" }}>Date</th>
                  <th style={{ width: "200px" }}>Event</th>
                  <th style={{ width: "200px" }}>Description</th>
                </tr>
              </thead>
              <tbody id="dataRepresentation">
                {events.map((entry) => {

                  return (
                    <tr key={entry._id} data-internal_id={entry._id}>
                      <td key="date">
                        <input
                          name="date"
                          required
                          value={entry.date.split("T")[0]}
                          type="date"
                          plaintext="true"
                          readOnly="true"
                          style={{
                            border: "none", // Remove border
                            boxShadow: "none", // Remove box shadow
                            background: "transparent", // Make background transparent
                          }}
                          onChange={(e) => onChangeInput(e, entry._id)}
                        ></input>
                      </td>
                      <td key="title">
                        <input
                          name="title"
                          required
                          value={entry.title}
                          type="text"
                          plaintext="true"
                          readOnly="true"
                          style={{
                            border: "none", // Remove border
                            boxShadow: "none", // Remove box shadow
                            background: "transparent", // Make background transparent
                          }}
                          onChange={(e) => onChangeInput(e, entry._id)}
                        ></input>
                      </td>
                      <td key="description">
                        <input
                          name="description"
                          required
                          value={entry.description}
                          type="text"
                          plaintext="true"
                          readOnly="true"
                          style={{
                            border: "none", // Remove border
                            boxShadow: "none", // Remove box shadow
                            background: "transparent", // Make background transparent
                          }}
                          onChange={(e) => onChangeInput(e, entry._id)}
                        ></input>
                      </td>
                      
                    </tr>
                  );
                })}
              </tbody>
            </Table>
           
            <hr />
            
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default EventsPage;
