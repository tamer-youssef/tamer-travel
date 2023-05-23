import Home from "./pages/Homepage";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Home />
      <Outlet />
    </div>
  );
}

export default App;
