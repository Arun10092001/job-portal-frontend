import Register from "./components/Register";
import "./App.css";
import Login from "./components/Login";
import JobPage from "./components/Home";
import Companies from "./components/Companies";
import Application from "./components/Application";
import ApplyPage from "./components/ApplyPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobs" element={<JobPage />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/application" element={<Application />} />
        <Route path="/apply/:jobId" element={<ApplyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
