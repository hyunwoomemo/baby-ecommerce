import GlobalStyle from "./components/Client/common/GlobalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart/Cart";
import Admin from "./pages/Admin/Admin";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Product from "./pages/Admin/Product";
import ProductList from "./pages/Product/ProductList";
import ProductDetails from "./pages/Product/ProductDetail";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Toaster></Toaster>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route exact path="/admin" element={<Admin />}></Route>
            <Route exact path="/products" element={<ProductList />}></Route>
            <Route path="/products/:id" element={<ProductDetails />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route exact path="/admin/product" element={<Product />}></Route>
          </Routes>
        </Router>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
