import { BrowserRouter, Routes, Route } from "react-router-dom";
import Features from "./Pages/Features";
import HowItWorks from "./Pages/HowItWorks";
import ProtectedRoute from "./Components/ProtectedRoute";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import UploadResume from "./Pages/UploadResume";
import Analysis from "./Pages/Analysis";


function App() {
  return (
    <BrowserRouter>
      <Routes>
 
        {/* PUBLIC ROUTES */}
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/features" element={<Features />} />
  <Route path="/how-it-works" element={<HowItWorks />} />
  


  {/* PROTECTED ROUTES */}
  <Route element={<ProtectedRoute />}>

    <Route path="/dashboard" element={<Dashboard />} />

    <Route
      path="/upload-resume"
      element={<UploadResume />}
    />

    <Route
      path="/analysis/:id"
      element={<Analysis />}
    />

  </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

