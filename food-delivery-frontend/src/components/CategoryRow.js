

const categories = [
  {
    name: "Biryani",
    image: "https://plus.unsplash.com/premium_photo-1694141251673-1758913ade48?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Chinese",
    image: "https://images.unsplash.com/photo-1670300522639-ce378e5d23a1?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Desserts",
    image: "https://images.unsplash.com/photo-1709195902163-7eee13e78970?q=80&w=746&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Burgers",
    image:  "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "South Indian",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function CategoryRow({ activeCategory, onSelectCategory }) {
  return (
    <section style={{ margin: "34px auto", maxWidth: "1180px" }}>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "18px",
        }}
      >
        <h2 style={{ fontSize: "24px", margin: 0 }}>What's on your mind?</h2>
        {activeCategory && (
          <button
            type="button"
            onClick={() => onSelectCategory("")}
            style={{
              background: "#fff7ed",
              border: "1px solid #fed7aa",
              borderRadius: "999px",
              color: "#fc8019",
              cursor: "pointer",
              fontWeight: 800,
              padding: "8px 13px",
            }}
          >
            Clear
          </button>
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: "24px",
          overflowX: "auto",
          padding: "4px 2px 12px",
        }}
      >
        {categories.map((category) => (
          <button
            key={category.name}
            type="button"
            onClick={() => onSelectCategory(category.name)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              flex: "0 0 auto",
              opacity: activeCategory && activeCategory !== category ? 0.62 : 1,
              padding: 0,
              textAlign: "center",
              transform: activeCategory === category ? "translateY(-4px)" : "none",
              transition: "transform 160ms ease, opacity 160ms ease",
              width: "120px",
            }}
          >
            <img
              src={category.image}
              alt={category.name}
              onError={(event) => {
                event.currentTarget.src = "https://via.placeholder.com/120x120";
              }}
              style={{
                border:
                  activeCategory === category.name
                    ? "3px solid #fc8019"
                    : "3px solid #ffffff",
                borderRadius: "50%",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
                height: "100px",
                objectFit: "cover",
                width: "100px",
              }}
            />
            <p
              style={{
                color: "#374151",
                fontSize: "15px",
                fontWeight: 800,
                margin: "10px 0 0",
              }}
            >
              {category.name}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default CategoryRow;
