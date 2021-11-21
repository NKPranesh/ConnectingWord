import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Containers/LoginPage";
import SignupPage from "./Containers/SignupPage";
import "./App.css";

function App() {
  return (
    <div className="AppDiv">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
