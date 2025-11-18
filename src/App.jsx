import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import Create from "./pages/Create";
import AgentPage from "./pages/AgentPage";
import Nav from "./components/Nav";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="parent-page">
        <Nav />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<AuthPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/:id" element={<AgentPage />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
