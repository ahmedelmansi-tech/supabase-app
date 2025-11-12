import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import Create from "./pages/Create";
import AgentPage from "./pages/AgentPage";
import Nav from "./components/Nav";
function App() {
  return (
    <BrowserRouter>
      <div className="parent-page">
        <Nav />
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/:id" element={<AgentPage />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
