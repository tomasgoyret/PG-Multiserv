import { Outlet, Route, Routes, useRoutes } from "react-router";
import LandingPage from './pages/LandingPage/LandingPage'
import SignUp from "./pages/SignUp/SignUp";
import Components from "./pages/Components/Components";
import SignIn from "./pages/SignIn/SignIn";
import PasswordReset from "./pages/PasswordReset/PasswordReset"
import Home from "./pages/Home/Home";
import Detalle from "./pages/DetalleServicio/DetalleServicio"
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import UsersValidations from "./pages/UsersValidations/UsersValidations";
import CreateService from "./pages/CreateService/CreateService";
import HomeNavigation from "./Components/Organisms/HomeNavigation/HomeNavigation";

function App() {
  const routes = [
    {
      index: true,
      element: <LandingPage />
    },
    {
      path: '/signup',
      element: <SignUp />
    },
    {
      path: '/components',
      element: <Components />
    },
    {
      path: 'home',
      element: <HomeNavigation />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: '/home/:uid/new-service',
          element: <CreateService />
        },
        {
          path: '/home/chat',
          element: <div><h1>chat</h1></div>
        },
        {
          path: '/home/profile',
          element: <div><h1>profile</h1></div>
        },
        {
          path: '/home/schedule',
          element: <div><h1>schedule</h1></div>
        },
      ]
    },
    {
      path: '/passwordReset',
      element: <PasswordReset />
    },
    {
      path: '/detalle',
      element: <Detalle />
    },
    {
      path: '/email-verification',
      element: <VerifyEmail />
    },
    {
      path: '/user-validations',
      element: <UsersValidations />
    },
  ]
  let routing = useRoutes(routes);
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
        <Route path="/detalle" element={<Detalle />} />
        {/* <Route path="/test" element={<PasswordChange />} /> */}
        <Route path="/email-verification" element={<VerifyEmail />} />
        <Route path="/user-validations" element={<UsersValidations />} />
        <Route path="/pago" element={<Pago/>} />
      </Routes>
    <div className="custom-scrollbar">
      {routing}
    </div>
    </div>
  );
}

export default App;
