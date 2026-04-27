import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import Practice from "./pages/Practice";
import Assessment from "./pages/Assessment";
import Progress from "./pages/Progress";
import Achievements from "./pages/Achievements";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/practice/:id" element={<Practice />} />
        <Route path="/assessment/:id" element={<Assessment />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/achievements" element={<Achievements />} />
      </Routes>
    </Router>
  );
}
