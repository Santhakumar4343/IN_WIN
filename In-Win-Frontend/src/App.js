
import './App.css';
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDashBoard from './Components/User/UserDashBoard';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Login />}
          ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/userDashBoard" element={<UserDashBoard />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
