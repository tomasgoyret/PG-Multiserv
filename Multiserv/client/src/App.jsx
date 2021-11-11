import { Route, Routes } from "react-router";
import Root from "./pages/Root/Root";
import Components from "./pages/Components/Components";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/components" element={<Components />} />
      </Routes>
    </div>
  );
}

export default App;
