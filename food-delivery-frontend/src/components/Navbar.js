import { Link } from "react-router-dom";


import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartCount } = useCart();

  

 

  return (
    <nav
      style={{
        alignItems: "center",
        background: "#ffffff",
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.08)",
        display: "flex",
        justifyContent: "space-between",
        padding: "14px 7vw",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Link
        to="/"
        style={{
          color: "#fc8019",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontSize: "24px",
          fontWeight: 900,
          letterSpacing: "-0.3px",
          textDecoration: "none",
        }}
      >
        DoorDine
      </Link>

      <div style={{ alignItems: "center", display: "flex", gap: "22px" }}>
  
  
      {/* ✅ Profile */}
      <Link to="/profile" style={navLinkStyle}>
        <span>Profile</span>
      </Link>

      {/* ✅ Cart */}
      <Link to="/cart" style={navLinkStyle}>
        <span>Cart</span>
        {cartCount > 0 && (
          <span
            style={{
              alignItems: "center",
              background: "#fc8019",
              borderRadius: "999px",
              color: "#ffffff",
              display: "flex",
              fontSize: "12px",
              fontWeight: 900,
              height: "22px",
              justifyContent: "center",
              minWidth: "22px",
              padding: "0 6px",
            }}
          >
            {cartCount}
          </span>
        )}
      </Link>


</div>
    </nav>
  );
}

const navLinkStyle = {
  alignItems: "center",
  color: "#1f2933",
  display: "flex",
  fontFamily:
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontWeight: 800,
  gap: "7px",
  textDecoration: "none",
};



export default Navbar;
