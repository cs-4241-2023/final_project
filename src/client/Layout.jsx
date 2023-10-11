import "./css/theming.css";
import rbeLogo from "./Resources/RhoBetaEpsilon_Logo_noBackground.png";
import "./css/sidebar.css";
import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  //gets data from the server on load
  // useEffect(() => {
  //   fetch("/getData", {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("recieved data: ", data);
  //       setSubmissions(data);
  //     });
  // }, []);

  let location = useLocation();
  return (
    <Container fluid>
      <Row>
        <Col
          sm={3}
          className=" text-white min-vh-100 p-3 primary-color"
          style={{ width: "340px" }}
        >
          <Navbar.Brand
            href="/home"
            className="d-flex align-items-center mb-3 mb-md-0 text-decoration-none"
          >
            <img src={rbeLogo} alt="Rho Beta Epsilon Logo" width="100px" />
            <span className="fs-4">Rho Beta Epsilon</span>
          </Navbar.Brand>
          <hr />
          <Nav
            activeKey={location.pathname}
            className="flex-column mb-auto"
            variant="pills"
          >
            <Nav.Item>
              <Nav.Link href="/home" className="primary">
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/attendance" className="primary">
                Attendance
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/hours" className="primary">
                Hours
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/history" className="primary">
                History
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <hr />
          <NavDropdown
            title="Options"
            id="options-dropdown"
            className="btn-dark"
            fixed="bottom"
          >
            <NavDropdown.Divider />
            <NavDropdown.Item href="/signout" disabled>
              Sign out
            </NavDropdown.Item>
          </NavDropdown>
        </Col>

        <Col
          style={{ marginLeft: "20px", marginTop: "50px", overflow: "auto" }}
        >
          <Outlet>{children}</Outlet>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
