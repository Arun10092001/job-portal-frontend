import Register from "./components/Register";
import "./App.css";
import Login from "./components/Login";
import JobListPage from "./components/JobListPage";
import ApplyPage from "./components/ApplyPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/jobs" element={<JobListPage />} />
        <Route path="/apply/:jobId" element={<ApplyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
