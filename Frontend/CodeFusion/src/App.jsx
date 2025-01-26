import React from "react";
import Header from "./components/header/header";
import Footer from "./components/Footer/Footer";
import CodeCompiler from "./pages/Code Compiler/CodeCompiler";
import SignUp from "./pages/SignUp Page/SignUp";

function App() {
  return (
    <>
      <Header />

      <CodeCompiler />
      <SignUp />

      <Footer />
    </>
  );
}

export default App;
