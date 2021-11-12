import { Route, Routes } from "react-router";
import Root from "./pages/Root/Root";
import SignUp from "./pages/SignUp/SignUp";
import Components from "./pages/Components/Components";
import PasswordChange from "./pages/PasswordChange/PasswordChange";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/components" element={<Components />} />
        <Route path="/test" element={<PasswordChange />} />
      </Routes>
    </div>
  );
}

export default App;
