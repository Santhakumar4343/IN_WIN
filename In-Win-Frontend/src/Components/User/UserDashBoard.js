import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import CorporateFareRoundedIcon from '@mui/icons-material/CorporateFareRounded';
import ViewAgendaSharpIcon from '@mui/icons-material/ViewAgendaSharp';
import Stocks from "../Stocks/Stocks.js";
import Gold from "../Gold/Gold.js";
import Realestate from "../Realestate/Realestate.js";
import "../User/UserDashBoard.css";
function UserDashboard() {
  


  const Navigate = useNavigate();
  
  const [selectedNavLink, setSelectedNavLink] = useState("stocks");
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    window.history.replaceState(null, '', '/');
    Navigate('/');
  }

  const handleProfile = () => {
    setShowModal(true);
  }

  const handleNavLinkClick = (navLink, event) => {
    event.preventDefault();
    setSelectedNavLink(navLink);
  };

  const renderContent = () => {
    switch (selectedNavLink) {
      case "stocks":
        return <Stocks />;
      case "gold":
        return <Gold />;
      case "realestate":
        return <Realestate />;
      default:
        return null;
    }
  };

 
  
  return (
    <div className="dashboard-container">
     
       
      <div className="nav-links" >
          <ul className="list-unstyled">
            <li  style={{marginBottom:"20px"}}>
            <CandlestickChartIcon style={{color:"white",fontSize:"25px" ,marginLeft:"5px" ,margin:"2px"}}/>
              <Link onClick={(e) => handleNavLinkClick("stocks", e)} style={{color:"white", fontSize:"30px",marginBottom:"100px",textDecoration: "none" }}>
                Stocks
              </Link>
            </li>
            <li style={{marginBottom:"20px"}}>
            <ViewAgendaSharpIcon style={{color:"white",fontSize:"22px" ,marginLeft:"5px" ,margin:"2px"}}/>
              <Link onClick={(e) => handleNavLinkClick("gold", e)}style={{color:"white", fontSize:"30px",marginTop:"20px",textDecoration: "none" }}>
                Gold
              </Link>
            </li>
            <li style={{marginBottom:"20px"}}>
            <CorporateFareRoundedIcon style={{color:"white",fontSize:"25px" ,marginLeft:"5px" ,margin:"2px"}}/>
              <Link onClick={(e) => handleNavLinkClick("realestate", e)} style={{color:"white", fontSize:"30px",marginTop:"20px",textDecoration: "none" }}>
                Realestate
              </Link>
            </li>
          </ul>
        </div>
        <div className="main-content" style={{ padding: "20px" }}>
          <div className="d-flex justify-content-end">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="userDropdown">
                <i className="bi bi-person-circle fs-7"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleProfile} style={{ fontSize: '14px', color: "red" }}>Profile</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout} style={{ fontSize: '14px', color: "red" }}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {renderContent()}
        </div>
    </div>
  );
}

export default UserDashboard;