import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layout/PublicLayout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Gallery from "./pages/Gallery.jsx";
import LoginPage from "./pages/LoginPage.jsx"

import AdminLayout from "./layout/AdminLayout.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ChangePassword from "./pages/admin/ChangePassword.jsx";
import ManageBuilding from "./pages/admin/ManageBuilding.jsx";
import ManageFlats from "./pages/admin/ManageFlats.jsx";
import ManageResidents from "./pages/admin/ManageResidents.jsx";
import ManageComplaints from "./pages/admin/ManageComplaints.jsx";
import ManageHelper from "./pages/admin/ManageHelper.jsx";
import SecurityGuard from "./pages/admin/SecurityGuard.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";

import UserLayout from "./layout/UserLayout.jsx";
import UserLogin from "./pages/users/UserLogin.jsx";
import UserDashboard from "./pages/users/UserDashboard.jsx";
import Complaints from "./pages/users/Complaints.jsx";
import AddVisitors from "./pages/users/AddVisitors.jsx";
import Payment from "./pages/users/Payment.jsx";
import MyFlat from "./pages/users/MyFlat.jsx";
import AddVehicle from "./pages/users/AddVehicle.jsx";
import UserProfile from "./pages/users/UserProfile.jsx";
import UChangePassword from "./pages/users/UChangePassword.jsx";


import GuardLayout from "./layout/GuardLayout.jsx";
import GuardDashboard from "./pages/security/GuardDashboard.jsx";
import ManageVisitors from "./pages/security/ManageVisitors.jsx";
import Vehicles from "./pages/security/Vehicles.jsx";
import GuardProfile from "./pages/security/GuardProfile.jsx";
import GChangePassword from "./pages/security/GChangePassword.jsx";




function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="gallery" element={<Gallery />} />
        </Route>

        <Route path="login" element={<LoginPage />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manage_building" element={<ManageBuilding />} />
          <Route path="manage_flats" element={<ManageFlats />} />
          <Route path="manage_residents" element={<ManageResidents />} />
          <Route path="manage_complaints" element={<ManageComplaints />} />
          <Route path="manage_helpers" element={<ManageHelper />} />
          <Route path="security_guard" element={<SecurityGuard />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="visitors" element={<AddVisitors />} />
          <Route path="payments" element={<Payment />} />
          <Route path="flats" element={<MyFlat />} />
          <Route path="vehicle" element={<AddVehicle />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="change-password" element={<UChangePassword />} />

        </Route>

        <Route path="/guard" element={<GuardLayout />}>
          <Route index element={<GuardDashboard />} />
          <Route path="dashboard" element={<GuardDashboard />} />
          <Route path="manage-visitors" element={<ManageVisitors />} />
          <Route path="vehicle" element={<Vehicles />} />
          <Route path="profile" element={<GuardProfile />} />
          <Route path="change-password" element={<GChangePassword />} />

        </Route>

        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </BrowserRouter>
  )
}
export default App;