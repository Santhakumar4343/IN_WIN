
import './App.css';
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
