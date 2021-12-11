import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Containers/HomePage";
import LoginPage from "./Containers/LoginPage";
import SignupPage from "./Containers/SignupPage";
import UserPage from "./Containers/UserPage";
import MapStats from "./components/mapStats";
import "./App.css";

function App() {
  return (
    <div className="AppDiv">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/userpage" element={<UserPage />} />
          <Route path="/test" element={<MapStats />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
