import { useRoutes } from "react-router";
import LandingPage from './pages/LandingPage/LandingPage'
import SignUp from "./pages/SignUp/SignUp";
import Components from "./pages/Components/Components";
import PasswordReset from "./pages/PasswordReset/PasswordReset"
import Home from "./pages/Home/Home";
import DetalleServicio from "./pages/DetalleServicio/DetalleServicio";
import DetalleProveedor from "./pages/DetalleProveedor/DetalleProveedor";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import UsersValidations from "./pages/UsersValidations/UsersValidations";
import PasswordChange from "../src/pages/PasswordChange/PasswordChange";
import ReviewService from "./Components/Organisms/ReviewService/ReviewService";
import SignInAdmin from "./pages/SignInAdmin/SignInAdmin";
import ControlPanel from "./pages/ControlPanel/ControlPanel";
import CreateService from "./pages/CreateService/CreateService";
import HomeNavigation from "./Components/Organisms/HomeNavigation/HomeNavigation";
import Profile from "./pages/Profile/Profile";
import ListFavorites from "./pages/ListFavorites/ListFavorites";
import ConfirmServicio from "./pages/ConfirmServ/ConfirmServ";
import MyServices from "./pages/MyServices/MyServices";
import EditarServicio from "./pages/EditarServicio/EditarServicio";
import MisCitas from "./pages/MisCitas/MisCitas";
import Horarios from "./pages/Horarios/Horarios";

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
          path: '/home/:uidClient/new-service',
          element: <CreateService />
        },
        {
          path: '/home/:uidClient/list-favorites',
          element: <ListFavorites />
        },
        {
          path: '/home/chat',
          element: <div><h1>chat</h1></div>
        },
        {
          path: '/home/schedule',
          element: <div><h1>schedule</h1></div>
        },
        {
          path: '/home/detalleServicio/:id',
          element: <DetalleServicio />
        },
        {
          path: '/home/:uidClient/my-services',
          element: <MyServices />
        },
        {
          path: '/home/:uidClient/appointments',
          element: <MisCitas />
        },
        {
          path: '/home/:uidClient/Horarios',
          element: <Horarios />
        }
      ]
    },
    {
      path: '/passwordReset',
      element: <PasswordReset />
    },
    {
      path: '/detalleProveedor/:id',
      element: <DetalleProveedor />
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
    {
      path: '/confirmServ',
      element: <ConfirmServicio />
    },
    {
      path: '/control-panel',
      element: <ControlPanel />
    },
    {
      path: '/editar-servicio/:id',
      element: <EditarServicio />
    },
  ]
  /*
  <div>
      <Routes>
        <Route path="/"/>
        <Route path="/signup"/>
        <Route path="/components" />
        <Route path='/home'> 
          <Route path='/home/chat'/>

          <Route path='/home/profile'/>
          <Route path='/home/schedule'/>

        </Route>
        <Route path="/passwordChange"/>
        <Route path="/passwordChange" element={<PasswordChange />} /> 
        <Route path="/passwordReset" element={<PasswordReset />} />
        <Route path="/detalle" element={<Detalle />} />
        <Route path="/test" element={<PasswordChange />} />
        <Route path="/email-verification" element={<VerifyEmail />} />
        <Route path="/user-validations" element={<UsersValidations />} />
        <Route path="/review" element={<ReviewService />} />
        <Route path="/admin" element={<SignInAdmin />} />
        <Route path="/control-panel" element={<ControlPanel />} />
         <Route path="/pago" element={<Pago/>} />
        <Route path="/passwordChange"/>
        <Route path="/passwordReset"/>
        <Route path="/detalleServicio/:id"/>
        <Route path="/detalleProveedor/:id"/>
        <Route path="/profile" />
        <Route path="/test" />
        <Route path="/email-verification"/>
        <Route path="/user-validations" />
        <Route path="/pago"/>
      </Routes>
    <div className="custom-scrollbar">
      {routing}
    </div>
    </div>
   */
  let routing = useRoutes(routes);
  return (
    <div className="custom-scrollbar">
      {routing}
    </div>
  );
}

export default App;
