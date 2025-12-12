import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Components/Home/Home";
import ProductList from "./Components/Product/ProductList";
import { ToastContainer } from "react-toastify";
import AddCatagory from "./Components/Admin/AddCatagory";
import AdminLayout from "./Components/Admin/Layout";
import AddProduct from "./Components/Admin/AddProduct";
import Login from "./Components/Login/Login";

function App() {
  return (
    <>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />

          {/* <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} /> */}
          <Route path="/login" element={<Login />} /> 

        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin/add-catagory" element={<AddCatagory />} />
          <Route path="/admin/add-product" element={<AddProduct />} />

        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
