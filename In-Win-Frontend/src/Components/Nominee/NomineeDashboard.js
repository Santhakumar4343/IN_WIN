import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import CorporateFareRoundedIcon from '@mui/icons-material/CorporateFareRounded';
import ViewAgendaSharpIcon from '@mui/icons-material/ViewAgendaSharp';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MuseumIcon from '@mui/icons-material/Museum';
import SavingsIcon from '@mui/icons-material/Savings';
import NomineeStocks from "../Stocks/NomineeStocks.js";
import Gold from "../Gold/Gold.js";
import Realestate from "../Realestate/Realestate.js";
import "../User/UserDashBoard.css";
import FixedDeposits from "../FixedDeposits/FixedDeposits.js";
import Insurance from "../Insurane/Insurance.js";
import AntiquePieces from "../AntiquePieces/AntiquePieces.js";
import { CurrencyState } from "../../CurrencyContext.js";
import { MenuItem, Select } from "@mui/material";
function NomineeDashboard() {
  


  const Navigate = useNavigate();
  
  const [selectedNavLink, setSelectedNavLink] = useState("stocks");
  const [showModal, setShowModal] = useState(false);



  const { currency, setCurrency } = CurrencyState();
  // const handleLogout = () => {
  //   window.history.replaceState(null, '', '/');
  //   Navigate('/');
  // }

  // const handleProfile = () => {
  //   setShowModal(true);
  // }

  const handleNavLinkClick = (navLink, event) => {
    event.preventDefault();
    setSelectedNavLink(navLink);
  };

  const renderContent = () => {
    switch (selectedNavLink) {
      case "stocks":
        return <NomineeStocks />;
      case "gold":
        return <Gold />;
      case "realestate":
        return <Realestate />;
        case "fixeddeposits":
        return <FixedDeposits />;
        case "insurances":
        return <Insurance />;
        case "antiquepieces":
        return <AntiquePieces />;

      default:
        return null;
    }
  };

 
  
  return (
    <div className="dashboard-container">
     
       
      <div className="nav-links" >
          <ul className="list-unstyled">
            <li  style={{marginBottom:"20px"}}>
            <CandlestickChartIcon style={{color:"white",fontSize:"25px" ,marginLeft:"15px",marginBottom:"7px"}}/>
              <Link onClick={(e) => handleNavLinkClick("stocks", e)} style={{color:"white",marginLeft: "5px", fontSize:"25px",marginTop:"20px",textDecoration: "none", }}>
                Stocks
              </Link>
            </li>
            <li style={{marginBottom:"20px"}}>
            <ViewAgendaSharpIcon style={{color:"white",fontSize:"22px" ,marginLeft:"15px" ,marginBottom:"8px"}}/>
              <Link onClick={(e) => handleNavLinkClick("gold", e)}style={{color:"white", marginLeft: "10px",fontSize:"25px",marginTop:"20px",textDecoration: "none" }}>
                Gold
              </Link>
            </li>
            <li style={{marginBottom:"20px"}}>
            <CorporateFareRoundedIcon style={{color:"white",fontSize:"25px" ,marginLeft:"15px" ,marginBottom:"8px"}}/>
              <Link onClick={(e) => handleNavLinkClick("realestate", e)} style={{color:"white",marginLeft: "10px", fontSize:"25px",marginTop:"20px",textDecoration: "none" }}>
                Realestate
              </Link>
            </li>
            <li style={{marginBottom:"20px"}}>
            <HealthAndSafetyIcon style={{color:"white",fontSize:"25px" ,marginLeft:"15px" ,marginBottom:"8px"}}/>
              <Link onClick={(e) => handleNavLinkClick("insurances", e)} style={{color:"white", marginLeft: "10px",fontSize:"25px",marginTop:"20px",textDecoration: "none" }}>
               Insurances
              </Link>
            </li>
            <li style={{marginBottom:"20px"}}>
            <SavingsIcon style={{color:"white",fontSize:"25px" ,marginLeft:"15px" ,marginBottom:"8px"}}/>
              <Link onClick={(e) => handleNavLinkClick("fixeddeposits", e)} style={{color:"white",marginLeft: "10px", fontSize:"25px",marginTop:"20px",textDecoration: "none" }}>
               Fixed Deposits
              </Link>
            </li>
            <li style={{marginBottom:"20px"}}>
            <MuseumIcon style={{color:"white",fontSize:"25px" ,marginLeft:"15px" ,marginBottom:"8px"}}/>
              <Link onClick={(e) => handleNavLinkClick("antiquepieces", e)} style={{color:"white",marginLeft: "10px", fontSize:"25px",marginTop:"20px",textDecoration: "none" }}>
               Antique Pieces
              </Link>
            </li>
          </ul>
        </div>
        <div className="main-content" style={{ padding: "20px" }}>
          <div className="d-flex justify-content-end">
            {/* <Dropdown style={{color:"black"}}>
              <Dropdown.Toggle  id="userDropdown">
                <CurrencyExchangeIcon ></CurrencyExchangeIcon>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={{}} style={{ fontSize: '14px', color: "black" }}>USD</Dropdown.Item>
                <Dropdown.Item onClick={{}} style={{ fontSize: '14px', color: "black" }}>INR</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
             <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              style={{ width: 100, height: 40, marginLeft: 15 }}
              className="border border-dark"
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </div>
          {renderContent()}
        </div>
    </div>
  );
}

export default NomineeDashboard;