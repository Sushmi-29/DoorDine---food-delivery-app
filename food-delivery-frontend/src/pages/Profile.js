import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const ORDERS_STORAGE_KEY = "doordine_order_history";
const LEGACY_ORDERS_STORAGE_KEY = "foodie_order_history";

function Profile() {
  const { profileLoading, refreshProfile, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [profileError, setProfileError] = useState("");

  useEffect(() => {
    const legacyOrders = localStorage.getItem(LEGACY_ORDERS_STORAGE_KEY);
    const currentOrders = localStorage.getItem(ORDERS_STORAGE_KEY);

    if (!currentOrders && legacyOrders) {
      localStorage.setItem(ORDERS_STORAGE_KEY, legacyOrders);
    }

    const storedOrders = JSON.parse(
      localStorage.getItem(ORDERS_STORAGE_KEY) || "[]"
    );
    setOrders(storedOrders);
  }, []);

  useEffect(() => {
    refreshProfile().catch(() => {
      setProfileError("Unable to load profile details.");
    });
  }, [refreshProfile]);

  const displayName = user?.name || "DoorDine User";
  const avatarLetter = displayName.trim().charAt(0).toUpperCase() || "D";

  return (
    <main style={pageStyle}>
      <section style={{ margin: "0 auto", maxWidth: "900px" }}>
        <div style={profileCardStyle}>
          <div style={avatarStyle}>{avatarLetter}</div>
          <div>
            <p style={{ color: "#6b7280", fontWeight: 800, margin: "0 0 4px" }}>
              Welcome back
            </p>
            <h1 style={{ fontSize: "32px", margin: 0 }}>{displayName}</h1>
            {profileLoading && (
              <p style={{ color: "#6b7280", margin: "8px 0 0" }}>
                Loading profile...
              </p>
            )}
            {profileError && (
              <p style={{ color: "crimson", margin: "8px 0 0" }}>
                {profileError}
              </p>
            )}
            {user && (
              <div style={profileDetailsStyle}>
                <span>{user.email}</span>
                <span>{user.phone}</span>
              </div>
            )}
          </div>
        </div>

        <h2 style={{ fontSize: "26px", margin: "28px 0 18px" }}>
          Order History
        </h2>

        {orders.length === 0 ? (
          <div style={emptyStyle}>
            <h3 style={{ margin: "0 0 8px" }}>No orders yet</h3>
            <p style={{ color: "#6b7280", margin: "0 0 18px" }}>
              Your completed orders will show up here.
            </p>
            <Link
              to="/"
              style={{
                color: "#fc8019",
                fontWeight: 900,
                textDecoration: "none",
              }}
            >
              Start ordering
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "16px" }}>
            {orders.map((order) => (
              <article key={order.id} style={orderCardStyle}>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "14px",
                  }}
                >
                  <div>
                    <h3 style={{ margin: "0 0 5px" }}>Order #{order.id}</h3>
                    <p style={{ color: "#6b7280", margin: 0 }}>{order.date}</p>
                  </div>
                  <strong style={{ fontSize: "18px" }}>
                    Rs {Number(order.total).toFixed(2)}
                  </strong>
                </div>

                <div style={{ display: "grid", gap: "10px" }}>
                  {order.items.map((item) => (
                    <div key={item.id} style={orderItemStyle}>
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <strong>
                        Rs {(Number(item.price) * item.quantity).toFixed(2)}
                      </strong>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
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

const profileCardStyle = {
  alignItems: "center",
  background: "#ffffff",
  borderRadius: "18px",
  boxShadow: "0 6px 20px rgba(15, 23, 42, 0.09)",
  display: "flex",
  gap: "18px",
  padding: "24px",
};

const avatarStyle = {
  alignItems: "center",
  background: "linear-gradient(135deg, #ff6d00, #ff8a00)",
  borderRadius: "50%",
  color: "#ffffff",
  display: "flex",
  fontSize: "28px",
  fontWeight: 950,
  height: "66px",
  justifyContent: "center",
  width: "66px",
};

const profileDetailsStyle = {
  color: "#4b5563",
  display: "flex",
  flexWrap: "wrap",
  fontWeight: 700,
  gap: "12px",
  marginTop: "10px",
};

const emptyStyle = {
  background: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0 6px 20px rgba(15, 23, 42, 0.09)",
  padding: "30px",
  textAlign: "center",
};

const orderCardStyle = {
  background: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0 6px 20px rgba(15, 23, 42, 0.09)",
  padding: "20px",
};

const orderItemStyle = {
  color: "#374151",
  display: "flex",
  gap: "14px",
  justifyContent: "space-between",
};

export default Profile;
