import GlobalStyle from "./components/Client/common/GlobalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart/Cart";
import Admin from "./pages/Admin/Admin";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/admin" element={<Admin />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
