import React from "react";
import Header from "./components/header/header";
import Footer from "./components/Footer/Footer";
import CodeCompiler from "./pages/Code Compiler/CodeCompiler";
import SignUp from "./pages/SignUp Page/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProblemsPage from "./pages/Problems Page/ProblemsPage";
import Top50 from "./pages/Problems Page/Top50";
import MainPage from "./pages/Main Page/MainPage";
import Login from "./pages/Login Page/Login";
import ScrollToTop from "./components/ScrollToTop";
import "./assets/styles/global.css";
function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="/learning" element={<Top50 />} />
          <Route path="/question" element={<CodeCompiler />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/problems" element={<ProblemsPage />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
