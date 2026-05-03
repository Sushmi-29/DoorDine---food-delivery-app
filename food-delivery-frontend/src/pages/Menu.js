import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useCart } from "../context/CartContext";
import api from "../utils/api";

function Menu() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`restaurants/${id}/menu/`)
      .then((res) => {
        setMenuItems(res.data);
        setError("");
      })
      .catch(() => {
        setError("Unable to load menu.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <main style={pageStyle}>
      <section style={{ margin: "0 auto", maxWidth: "900px" }}>
        <Link to="/" style={backLinkStyle}>
          Back to restaurants
        </Link>

        <div style={menuHeaderStyle}>
          <div>
            <p style={{ color: "#6b7280", fontWeight: 800, margin: "0 0 6px" }}>
              Curated dishes
            </p>
            <h1 style={{ fontSize: "36px", margin: 0 }}>Restaurant Menu</h1>
          </div>
          <span style={menuCountStyle}>{menuItems.length} items</span>
        </div>

        {loading && <p>Loading menu...</p>}
        {error && <p style={{ color: "crimson" }}>{error}</p>}

        <div>
          {menuItems.map((item) => {
            const image = item.image;

            return (
              <div key={item.id} style={menuItemStyle}>
                <div style={{ minWidth: 0, paddingRight: "12px" }}>
                  <p style={{ fontSize: "13px", margin: "0 0 8px" }}>
                    {item.is_veg ? "🟢" : "🔴"}
                  </p>
                  <h2 style={itemTitleStyle}>{item.name}</h2>
                  <p style={priceStyle}>₹{item.price}</p>
                  <p style={descriptionStyle}>
                    {item.description || "Freshly prepared and packed with flavour."}
                  </p>
                </div>

                <div style={{ flex: "0 0 auto", position: "relative" }}>
                  <img
                    src={image}
                    alt={item.name}
                    onError={(event) => {
                      event.currentTarget.src =
                        "https://via.placeholder.com/300x300";
                    }}
                    style={itemImageStyle}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image,
                      })
                    }
                    style={addButtonStyle}
                  >
                    ADD
                  </button>
                </div>
              </div>
            );
          })}
        </div>
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

const backLinkStyle = {
  color: "#fc8019",
  display: "inline-block",
  fontWeight: 900,
  marginBottom: "18px",
  textDecoration: "none",
};

const menuHeaderStyle = {
  alignItems: "center",
  background: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0 6px 20px rgba(15, 23, 42, 0.09)",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "18px",
  padding: "22px",
};

const menuCountStyle = {
  background: "#fff7ed",
  borderRadius: "999px",
  color: "#fc8019",
  fontWeight: 900,
  padding: "9px 14px",
};

const menuItemStyle = {
  alignItems: "center",
  background: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0 6px 20px rgba(15, 23, 42, 0.08)",
  display: "flex",
  gap: "18px",
  justifyContent: "space-between",
  marginBottom: "14px",
  padding: "18px",
};

const itemTitleStyle = {
  fontSize: "20px",
  fontWeight: 900,
  lineHeight: 1.35,
  margin: "0 0 8px",
};

const priceStyle = {
  color: "#111827",
  fontWeight: 900,
  margin: "0 0 9px",
};

const descriptionStyle = {
  color: "#6b7280",
  lineHeight: 1.45,
  margin: 0,
  maxWidth: "560px",
};

const itemImageStyle = {
  borderRadius: "14px",
  display: "block",
  height: "132px",
  objectFit: "cover",
  width: "132px",
};

const addButtonStyle = {
  background: "#ffffff",
  border: "1px solid #fed7aa",
  borderRadius: "999px",
  bottom: "-13px",
  boxShadow: "0 7px 15px rgba(0, 0, 0, 0.16)",
  color: "#fc8019",
  cursor: "pointer",
  fontWeight: 950,
  left: "50%",
  padding: "9px 22px",
  position: "absolute",
  transform: "translateX(-50%)",
};

export default Menu;
