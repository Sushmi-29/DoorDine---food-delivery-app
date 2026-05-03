import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Checkout from "./pages/Checkout";

// 🔐 Protected Route

function App() {
  return (
    <BrowserRouter>
      <Routes>


        {/* 🔐 Protected Routes */}
        <Route
          path="/"
          element={
            
              <>
              <Navbar />
              <Home />
              </>
            
          }
        />

        <Route
          path="/menu/:id"
          element={
            
              <>
              <Navbar />
              <Menu />
              </>
           
      
          }
        />

        <Route
          path="/profile"
          element={
           
              <>
              <Navbar />
              <Profile />
              </>
            
          }
        />

        <Route
          path="/cart"
          element={
            
              <>
              <Navbar />
              <Cart />
              </>
            
          }
        />

        <Route
  path="/checkout"
  element={
    <>
      <Navbar />
      <Checkout />
    </>
  }
/>

        {/* 🚨 Default Route */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;