import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

function Cart() {
  const { items, increaseQty, decreaseQty, removeFromCart, totalPrice } =
    useCart();
  const navigate = useNavigate();

  return (
    <main style={pageStyle}>
      <section style={{ margin: "0 auto", maxWidth: "820px" }}>
        <h1 style={{ fontSize: "36px", margin: "0 0 24px" }}>Your Cart</h1>

        {items.length === 0 ? (
          <div style={emptyStyle}>
            <h2 style={{ margin: "0 0 8px" }}>Your cart is empty</h2>
            <p style={{ color: "#6b7280", margin: "0 0 20px" }}>
              Add something delicious from a restaurant nearby.
            </p>
            <Link to="/" style={orangeLinkStyle}>
              Browse restaurants
            </Link>
          </div>
        ) : (
          <>
            <div style={{ display: "grid", gap: "14px" }}>
              {items.map((item) => (
                <div key={item.id} style={cartItemStyle}>
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(event) => {
                      event.currentTarget.src =
                        "https://via.placeholder.com/100x100";
                    }}
                    style={cartImageStyle}
                  />
                  <div>
                    <h2 style={cartTitleStyle}>{item.name}</h2>
                    <p style={{ fontWeight: 900, margin: 0 }}>
                      ₹{Number(item.price).toFixed(2)}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={quantityWrapStyle}>
                      <button
                        type="button"
                        onClick={() => decreaseQty(item.id)}
                        style={quantityButtonStyle}
                      >
                        -
                      </button>
                      <span style={{ fontWeight: 900 }}>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => increaseQty(item.id)}
                        style={quantityButtonStyle}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      style={removeButtonStyle}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={totalCardStyle}>
              <div>
                <p style={{ color: "#6b7280", margin: "0 0 4px" }}>To pay</p>
                <h2 style={{ margin: 0 }}>₹{totalPrice.toFixed(2)}</h2>
              </div>
              <button
                type="button"
                onClick={() => navigate("/checkout")}
                style={primaryButtonStyle}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

const pageStyle = {
  background: "#f5f5f5",
  color: "#1f2933",
  fontFamily:
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  minHeight: "100vh",
  padding: "30px 20px 48px",
};

const emptyStyle = {
  background: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0 6px 20px rgba(15, 23, 42, 0.09)",
  padding: "34px",
  textAlign: "center",
};

const orangeLinkStyle = {
  color: "#fc8019",
  fontWeight: 900,
  textDecoration: "none",
};

const cartItemStyle = {
  alignItems: "center",
  background: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0 6px 20px rgba(15, 23, 42, 0.08)",
  display: "grid",
  gap: "16px",
  gridTemplateColumns: "86px 1fr auto",
  padding: "16px",
};

const cartImageStyle = {
  borderRadius: "14px",
  height: "86px",
  objectFit: "cover",
  width: "86px",
};

const cartTitleStyle = {
  fontSize: "18px",
  fontWeight: 900,
  margin: "0 0 7px",
};

const quantityWrapStyle = {
  alignItems: "center",
  display: "flex",
  gap: "9px",
  justifyContent: "flex-end",
  marginBottom: "10px",
};

const quantityButtonStyle = {
  background: "#fff7ed",
  border: "1px solid #fed7aa",
  borderRadius: "9px",
  color: "#fc8019",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: 900,
  height: "34px",
  width: "34px",
};

const removeButtonStyle = {
  background: "transparent",
  border: "none",
  color: "#dc2626",
  cursor: "pointer",
  fontWeight: 800,
};

const totalCardStyle = {
  alignItems: "center",
  background: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0 6px 20px rgba(15, 23, 42, 0.09)",
  display: "flex",
  justifyContent: "space-between",
  marginTop: "18px",
  padding: "20px",
};

const primaryButtonStyle = {
  background: "#fc8019",
  border: "none",
  borderRadius: "999px",
  boxShadow: "0 8px 18px rgba(252, 128, 25, 0.28)",
  color: "#ffffff",
  cursor: "pointer",
  fontWeight: 900,
  padding: "14px 22px",
};

export default Cart;
