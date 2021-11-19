import { Route, Routes } from "react-router";
import LandingPage from './pages/LandingPage/LandingPage'
import SignUp from "./pages/SignUp/SignUp";
import Components from "./pages/Components/Components";
import SignIn from "./pages/SignIn/SignIn";
import PasswordReset from "./pages/PasswordReset/PasswordReset"
import Home from "./pages/Home/Home";
import Detalle from "./pages/DetalleServicio/DetalleServicio"
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import UsersValidations from "./pages/UsersValidations/UsersValidations";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/components" element={<Components />} />
        <Route path='/home' element={<Home />} > 
          <Route path='/home/chat' element={<Home />} />
          <Route path='/home/profile' element={<Home />} />
          <Route path='/home/schedule' element={<Home />} />
        </Route>
        {/* <Route path="/passwordChange" element={<PasswordChange />} /> */}
        <Route path="/passwordReset" element={<PasswordReset />} />
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route path="/test" element={<PasswordChange />} />
        <Route path="/email-verification" element={<VerifyEmail />} />
        <Route path="/user-validations" element={<UsersValidations />} />
      </Routes>
    </div>
  );
}

export default App;
