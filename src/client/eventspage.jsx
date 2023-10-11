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
    <div>
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
    </div>
  );
}

export default EventsPage;
