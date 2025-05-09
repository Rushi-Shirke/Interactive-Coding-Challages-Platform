import React, { useState } from "react";
import Header from "./components/header/header";
import Footer from "./components/Footer/Footer";
import CodeCompiler from "./pages/CodeCompiler/CodeCompiler";
import SignUp from "./pages/SignUpPage/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProblemsPage from "./pages/ProblemsPage/ProblemsPage";
import Top50 from "./pages/ProblemsPage/Top50";
import MainPage from "./pages/MainPage/MainPage";
import Login from "./pages/LoginPage/Login";
import ScrollToTop from "./components/ScrollToTop";
import "./assets/styles/global.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminDashboard from "./pages/Admin_Dashboard/AdminDashboard";
import ForgotPassword from "./pages/LoginPage/ForgotPassword";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <Router>
        <ScrollToTop />

        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="/learning" element={<Top50 />} />
          <Route path="/question/:id" element={<CodeCompiler />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/admindashboard/*" element={<AdminDashboard />} />
          <Route path="/forgetPassword" element={<ForgotPassword />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
