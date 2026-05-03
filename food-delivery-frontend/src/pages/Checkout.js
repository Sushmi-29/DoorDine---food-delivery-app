import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

const ORDERS_STORAGE_KEY = "doordine_order_history";
const LEGACY_ORDERS_STORAGE_KEY = "foodie_order_history";

function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleChange = (event) => {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const order = {
      id: Date.now(),
      customer: form,
      date: new Date().toLocaleString(),
      items,
      total: totalPrice,
    };
    const previousOrders = JSON.parse(
      localStorage.getItem(ORDERS_STORAGE_KEY) ||
        localStorage.getItem(LEGACY_ORDERS_STORAGE_KEY) ||
        "[]"
    );

    localStorage.setItem(
      ORDERS_STORAGE_KEY,
      JSON.stringify([order, ...previousOrders])
    );
    alert("Order placed successfully!");
    clearCart();
    setForm({ name: "", address: "", phone: "" });
    navigate("/profile");
  };

  return (
    <main style={pageStyle}>
      <section style={checkoutGridStyle}>
        <form onSubmit={handleSubmit} style={cardStyle}>
          <h1 style={{ fontSize: "32px", margin: "0 0 20px" }}>Checkout</h1>
          <input
            name="name"
            onChange={handleChange}
            placeholder="Name"
            required
            style={inputStyle}
            type="text"
            value={form.name}
          />
          <textarea
            name="address"
            onChange={handleChange}
            placeholder="Address"
            required
            rows="4"
            style={{ ...inputStyle, resize: "vertical" }}
            value={form.address}
          />
          <input
            name="phone"
            onChange={handleChange}
            placeholder="Phone number"
            required
            style={inputStyle}
            type="tel"
            value={form.phone}
          />
          <button
            type="submit"
            disabled={items.length === 0}
            style={{
              ...primaryButtonStyle,
              background: items.length === 0 ? "#cbd5e1" : "#fc8019",
              boxShadow:
                items.length === 0
                  ? "none"
                  : "0 8px 18px rgba(252, 128, 25, 0.28)",
              cursor: items.length === 0 ? "not-allowed" : "pointer",
              width: "100%",
            }}
          >
            Place Order
          </button>
        </form>

        <aside style={cardStyle}>
          <h2 style={{ margin: "0 0 18px" }}>Order Summary</h2>
          {items.length === 0 ? (
            <p style={{ color: "#6b7280" }}>
              No items in cart. <Link to="/">Add food</Link>
            </p>
          ) : (
            <div style={{ display: "grid", gap: "13px" }}>
              {items.map((item) => (
                <div key={item.id} style={summaryRowStyle}>
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <strong>
                    ₹{(Number(item.price) * item.quantity).toFixed(2)}
                  </strong>
                </div>
              ))}
            </div>
          )}
          <div style={summaryTotalStyle}>
            <strong>Total</strong>
            <strong>₹{totalPrice.toFixed(2)}</strong>
          </div>
        </aside>
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

const checkoutGridStyle = {
  display: "grid",
  gap: "22px",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  margin: "0 auto",
  maxWidth: "1060px",
};

const cardStyle = {
  background: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0 6px 20px rgba(15, 23, 42, 0.09)",
  padding: "24px",
};

const inputStyle = {
  border: "1px solid #e5e7eb",
  borderRadius: "13px",
  boxSizing: "border-box",
  display: "block",
  font: "inherit",
  marginBottom: "14px",
  outline: "none",
  padding: "15px",
  width: "100%",
};

const primaryButtonStyle = {
  border: "none",
  borderRadius: "999px",
  color: "#ffffff",
  fontWeight: 900,
  padding: "15px 22px",
};

const summaryRowStyle = {
  display: "flex",
  gap: "14px",
  justifyContent: "space-between",
};

const summaryTotalStyle = {
  borderTop: "1px solid #e5e7eb",
  display: "flex",
  fontSize: "18px",
  justifyContent: "space-between",
  marginTop: "20px",
  paddingTop: "18px",
};

export default Checkout;
