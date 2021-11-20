import { Outlet, Route, Routes, useRoutes } from "react-router";
import LandingPage from './pages/LandingPage/LandingPage'
import SignUp from "./pages/SignUp/SignUp";
import Components from "./pages/Components/Components";
import SignIn from "./pages/SignIn/SignIn";
import PasswordReset from "./pages/PasswordReset/PasswordReset"
import Home from "./pages/Home/Home";
import DetalleServicio from "./pages/DetalleServicio/DetalleServicio";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import UsersValidations from "./pages/UsersValidations/UsersValidations";
import CreateService from "./pages/CreateService/CreateService";
import HomeNavigation from "./Components/Organisms/HomeNavigation/HomeNavigation";
import Profile from "./pages/Profile/Profile";

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
        // {
        //   path: '/home/profile',
        //   element: <div><h1>profile</h1></div>
        // },
        {
          path: '/home/schedule',
          element: <div><h1>schedule</h1></div>
        },
        {
          path: '/home/detalleServicio/:id',
          element: <DetalleServicio />
        }
      ]
    },
    {
      path: '/passwordReset',
      element: <PasswordReset />
    },
    {
      path: '/email-verification',
      element: <VerifyEmail />
    },
    {
      path: '/user-validations',
      element: <UsersValidations />
    },
    {
      path: '/profile',
      element: <Profile />
    },
  ]
  let routing = useRoutes(routes);
  return (
    <div>
      <Routes>
        <Route path="/"/>
        <Route path="/signup"/>
        <Route path="/components" />
        <Route path='/home'> 
          <Route path='/home/chat'/>
          {/* <Route path='/home/profile'/> */}
          <Route path='/home/schedule'/>

        </Route>
        {/* <Route path="/passwordChange"/> */}
        <Route path="/passwordReset"/>
        <Route path="/detalleServicio/:id"/>
        <Route path="/profile" />
        {/* <Route path="/test" /> */}
        <Route path="/email-verification"/>
        <Route path="/user-validations" />
        {/* <Route path="/pago"/> */}
      </Routes>
    <div className="custom-scrollbar">
      {routing}
    </div>
    </div>
  );
}

export default App;
