import { Route, Routes } from "react-router";
import Root from "./pages/Root/Root";
import SignUp from "./pages/SignUp/SignUp";
import Components from "./pages/Components/Components";
import SignIn from "./pages/SignIn/SignIn";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/components" element={<Components />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
