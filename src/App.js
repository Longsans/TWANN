import logo from "./logo.svg";
import "./App.css";
import { Header } from "./components/Header";
import { Login } from "./pages/Login";

function App() {
  const headerNavs = [
    {
      text: "Login",
      link: "/login",
    },
  ];

  return (
    <div className="App">
      {/* <Header>{headerNavs}</Header> */}
      <div className="Layout">
        <Login></Login>
      </div>
    </div>
  );
}

export default App;
