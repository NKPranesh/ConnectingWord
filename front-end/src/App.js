import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Containers/LoginPage";
import SignupPage from "./Containers/SignupPage";
import UserPage from "./Containers/UserPage";
import RequestListBox from "./components/requestListBox";
import "./App.css";

function App() {
  return (
    <div className="AppDiv">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/userpage" element={<UserPage />} />
          <Route path="/test" element={<RequestListBox />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
