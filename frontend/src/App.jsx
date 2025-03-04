import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import TellUs from "./pages/TellUs";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Bounce } from "react-toastify";
import Appearance from "./pages/Appearance";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Visitprofile from "./pages/Visitprofile";
function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        closeButton={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        limit={1}
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/tellus" element={<TellUs />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/profile/:username" element={<Visitprofile />}></Route>
          <Route path="/appearance" element={<Appearance />}></Route>
          <Route path="/analytics" element={<Analytics />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
