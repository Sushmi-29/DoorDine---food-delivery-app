

function RestaurantCard({ restaurant, onClick }) {
  const imageUrl=restaurant.image;


  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={(event) => {
        event.currentTarget.style.transform = "scale(1.04)";
        event.currentTarget.style.boxShadow =
          "0 14px 32px rgba(0, 0, 0, 0.18)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = "scale(1)";
        event.currentTarget.style.boxShadow =
          "0 6px 20px rgba(15, 23, 42, 0.09)";
      }}
      style={{
        background: "#ffffff",
        border: "none",
        borderRadius: "16px",
        boxShadow: "0 6px 20px rgba(15, 23, 42, 0.09)",
        cursor: "pointer",
        overflow: "hidden",
        padding: 0,
        textAlign: "left",
        transition: "transform 180ms ease, box-shadow 180ms ease",
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={imageUrl}
          alt={restaurant.name}
          onError={(event) => {
            event.currentTarget.src = "https://via.placeholder.com/400x300";
          }}
          style={{
            display: "block",
            height: "180px",
            objectFit: "cover",
            width: "100%",
          }}
        />
        
      </div>

      <div style={{ padding: "15px 16px 17px" }}>
        <h3
          style={{
            color: "#111827",
            fontSize: "19px",
            fontWeight: 900,
            lineHeight: 1.25,
            margin: "0 0 8px",
          }}
        >
          {restaurant.name}
        </h3>
        <p
          style={{
            color: "#111827",
            fontSize: "15px",
            fontWeight: 800,
            margin: "0 0 7px",
          }}
        >
          ⭐ {restaurant.rating}
        </p>
        <p style={{ color: "#7b8190", fontSize: "14px", margin: 0 }}>
          {restaurant.category?.name || "Uncategorized"}
        </p>
      </div>
    </button>
  );
}

export default RestaurantCard;
