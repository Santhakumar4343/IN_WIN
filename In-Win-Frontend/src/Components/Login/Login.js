import React, { useState, useEffect } from "react";
import "../Login/Basestyle.css";
import "../Login/Login.css";

import NomineeLogin from "../Login/NomineeLogin";
import AdminLogin from "../Login/AdminLogin";
import UserLogin from "../Login/UserLogin";

import { MenuItem, Select } from "@mui/material";

const Login = ({ }) => {
  const [role, setRole] = useState("User");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className="">
      <div className="d-flex justify-content-end" style={{ marginRight: "50px" }}>
        <Select
          variant="outlined"
          labelId="demo-simple-select-label"
          value={role}
          style={{ width: 100, height: 40, color: "white", borderColor: "white" }}
          onChange={handleRoleChange}
        >
          <MenuItem value={"User"}>User</MenuItem>
          <MenuItem value={"Nominee"}>Nominee</MenuItem>
          <MenuItem value={"Admin"}>Admin</MenuItem>
        </Select>
      </div>
      <h1></h1>
      <div className="Register-Main">
        {role === "User" && <UserLogin />}
        {role === "Nominee" && <NomineeLogin />}
        {role === "Admin" && <AdminLogin />}
      </div>
    </div>
  );
};

export default Login;
