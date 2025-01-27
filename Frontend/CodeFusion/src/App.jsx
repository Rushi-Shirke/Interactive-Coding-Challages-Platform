import React from "react";
import Header from "./components/header/header";
import Footer from "./components/Footer/Footer";
import CodeCompiler from "./pages/Code Compiler/CodeCompiler";
import SignUp from "./pages/SignUp Page/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProblemsPage from "./pages/Problems Page/ProblemsPage";
import Top50 from "./pages/Problems Page/Top50";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/learning" element={<Top50 />} />
          <Route path="/question" element={<CodeCompiler />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
