import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <nav style={navStyle}>
      <Link to="/" style={brandStyle}>
        DoorDine
      </Link>

      <div style={linksStyle}>
        <Link to="/profile" style={navLinkStyle}>
          <span>Profile</span>
        </Link>

        <Link to="/cart" style={navLinkStyle}>
          <span>Cart</span>
          {cartCount > 0 && <span style={cartBadgeStyle}>{cartCount}</span>}
        </Link>

        <button onClick={logout} style={logoutButtonStyle} type="button">
          Logout
        </button>
      </div>
    </nav>
  );
}

const navStyle = {
  alignItems: "center",
  background: "#ffffff",
  boxShadow: "0 4px 18px rgba(15, 23, 42, 0.08)",
  display: "flex",
  justifyContent: "space-between",
  padding: "14px 7vw",
  position: "sticky",
  top: 0,
  zIndex: 10,
};

const brandStyle = {
  color: "#fc8019",
  fontFamily:
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontSize: "24px",
  fontWeight: 900,
  textDecoration: "none",
};

const linksStyle = {
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
  gap: "18px",
  justifyContent: "flex-end",
};

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



const cartBadgeStyle = {
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
};

const logoutButtonStyle = {
  background: "#1f2933",
  border: "none",
  borderRadius: "6px",
  color: "#ffffff",
  cursor: "pointer",
  fontFamily:
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontWeight: 900,
  padding: "9px 12px",
};

export default Navbar;
