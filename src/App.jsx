import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";
import Company from "./views/Company/Company";
import Equipment from "./views/Equipment/Equipment";
import Workers from "./views/Workers/Workers";
import Inspection from "./views/Inspection/Inspection";
import Report from "./views/Report/Report";
import InfoEquipment from "./views/InfoEquipment/InfoEquipment";
import WorkAria from "./views/WorkAria/WorkAria";
import Work from "./views/Work/Work";
import "./App.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/company" element={<Company />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/Inspection" element={<Inspection />} />
        <Route path="/Report" element={<Report />} />
        <Route path="/equipments/:id" element={<InfoEquipment />} />
        <Route path="/WorkAria" element={<WorkAria />} />
        <Route path="/work/:inspectionId" element={<Work />} />  
      </Routes>
    </Router>
  );
}

export default App;
