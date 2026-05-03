import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import CategoryRow from "../components/CategoryRow";
import RestaurantCard from "../components/RestaurantCard";
import api from "../utils/api";

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    async function fetchRestaurants() {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("restaurants/");

        console.log("Restaurants API status:", response.status);
        console.log("Restaurants API data:", response.data);

        const restaurantList = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.results)
            ? response.data.results
            : [];

        if (isMounted) {
          setRestaurants(restaurantList);
        }
      } catch (fetchError) {
        console.error("Failed to fetch restaurants:", fetchError);

        if (isMounted) {
          setRestaurants([]);
          setError("Unable to load restaurants.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchRestaurants();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredRestaurants = useMemo(() => {
  const query = search.trim().toLowerCase();
  const selectedCategory = activeCategory.toLowerCase();

  return restaurants.filter((restaurant) => {
    const name = restaurant.name?.toLowerCase() || "";

    const category =
      typeof restaurant.category === "string"
        ? restaurant.category.toLowerCase()
        : restaurant.category?.name?.toLowerCase() || "";

    const matchesSearch =
      !query || name.includes(query) || category.includes(query);

    const matchesCategory =
      !selectedCategory || category.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });
}, [activeCategory, restaurants, search]);

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <div style={{ margin: "0 auto", maxWidth: "900px" }}>
          <p style={eyebrowStyle}>DoorDine delivers in minutes</p>
          <h1 style={heroHeadingStyle}>
            Order food & groceries. Discover best restaurants.
          </h1>
          <p style={heroTextStyle}>Order from top restaurants near you</p>
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search for restaurants, biryani, pizza..."
            style={searchStyle}
          />
        </div>
      </section>

      <div style={{ padding: "0 24px 48px" }}>
        <CategoryRow
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        <section style={{ margin: "0 auto", maxWidth: "1180px" }}>
          <div
            style={{
              alignItems: "end",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div>
              <h2 style={{ fontSize: "26px", margin: "0 0 6px" }}>
                Restaurants to explore
              </h2>
              
            </div>
          </div>

          {loading && <p>Loading restaurants...</p>}
          {!loading && error && <p style={{ color: "crimson" }}>{error}</p>}

          {!loading && !error && (
            <div
              style={{
                display: "grid",
                gap: "20px",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              }}
            >
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={() => navigate(`/menu/${restaurant.id}`)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

const pageStyle = {
  background: "#f5f5f5",
  color: "#1f2933",
  fontFamily:
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  minHeight: "100vh",
};

const heroStyle = {
  background:
    "radial-gradient(circle at 20% 0%, rgba(255,255,255,0.26), transparent 30%), linear-gradient(135deg, #ff6d00, #ff8a00)",
  color: "#ffffff",
  padding: "72px 24px 84px",
  textAlign: "center",
};

const eyebrowStyle = {
  fontSize: "15px",
  fontWeight: 900,
  letterSpacing: "0.8px",
  margin: "0 0 12px",
  textTransform: "uppercase",
};

const heroHeadingStyle = {
  fontSize: "clamp(34px, 5vw, 46px)",
  fontWeight: 950,
  letterSpacing: "-0.8px",
  lineHeight: 1.1,
  margin: "0 auto 16px",
};

const heroTextStyle = {
  fontSize: "19px",
  margin: "0 0 32px",
  opacity: 0.95,
};

const searchStyle = {
  background: "#ffffff",
  border: "none",
  borderRadius: "999px",
  boxShadow: "0 16px 34px rgba(0, 0, 0, 0.22)",
  boxSizing: "border-box",
  color: "#111827",
  fontSize: "17px",
  maxWidth: "720px",
  outline: "none",
  padding: "19px 26px",
  width: "100%",
};

export default Home;
