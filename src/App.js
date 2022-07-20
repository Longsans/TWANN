import "./App.css";
import { Outlet } from "react-router-dom";
import { useToken, PERSIST_NAME, TOKEN_NAME } from "./hooks/useToken";

function App() {
  return (
    <div className="App">
      <div className="Layout">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
