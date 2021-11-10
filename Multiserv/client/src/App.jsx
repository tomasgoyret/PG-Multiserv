import { Route, Routes } from "react-router";
import Root from "./pages/Root/Root";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
