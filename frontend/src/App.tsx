import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Callback from "./Callback";
import Login from "./pages/Login";
import { AppProvider } from "./AppProvider";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth/callback" element={<Callback />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
