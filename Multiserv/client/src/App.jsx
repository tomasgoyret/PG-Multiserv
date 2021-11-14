import { Route, Routes } from "react-router";
import LandingPage from './pages/LandingPage/LandingPage'
import SignUp from "./pages/SignUp/SignUp";
import Components from "./pages/Components/Components";
import SignIn from "./pages/SignIn/SignIn";
import PasswordChange from "./pages/PasswordChange/PasswordChange";
import PasswordReset from "./pages/PasswordReset/PasswordReset"
import Home from "./pages/Home/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/components" element={<Components />} />
        <Route path='/home' element={<Home />} > 
          <Route path='/home/chat' element={<Home />} />
          <Route path='/home/profile' element={<Home />} />
          <Route path='/home/schedule' element={<Home />} />
        </Route>
        <Route path="/passwordChange" element={<PasswordChange />} />
        <Route path="/passwordReset" element={<PasswordReset />} />
        <Route path="/test" element={<PasswordChange />} />
      </Routes>
    </div>
  );
}

export default App;
