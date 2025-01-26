import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/Footer/Footer';
import ProblemsPage from "./pages/Problems Page/ProblemsPage";
import Top50 from './pages/Problems Page/Top50';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProblemsPage />} />
        <Route path="/learning" element={<Top50 />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
