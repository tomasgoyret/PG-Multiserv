import { Route, Routes } from "react-router";
import Root from "./pages/Root/Root";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Root />} />
      </Routes>
    </div>
  );
}

export default App;
