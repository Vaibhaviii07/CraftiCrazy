import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HeroPage from "./Pages/HeroPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<HeroPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
