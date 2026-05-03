const IMAGE_MAP = [
  {
    keywords: ["biryani", "dum", "hyderabad"],
    query: "biryani",
  },
  {
    keywords: ["pizza", "dominos", "oven story"],
    query: "pizza",
  },
  {
    keywords: ["burger", "kfc", "patty"],
    query: "burger",
  },
  {
    keywords: ["sweet", "dessert", "ice cream", "waffle", "brownie", "cake"],
    query: "dessert",
  },
  {
    keywords: ["chinese", "noodles", "fried rice", "manchurian", "chilli"],
    query: "chinese-food",
  },
  {
    keywords: ["dosa", "idli", "uttapam", "south indian", "mtr", "udupi"],
    query: "south-indian-food",
  },
  {
    keywords: ["paneer", "naan", "dal", "chole", "north indian", "punjabi"],
    query: "indian-food",
  },
  {
    keywords: ["coffee", "chai"],
    query: "coffee-snacks",
  },
  {
    keywords: ["roll", "wrap", "faasos"],
    query: "food-wrap",
  },
];

export function getFoodImage(name = "", size = "400x300") {
  const normalizedName = name.toLowerCase();
  const match = IMAGE_MAP.find(({ keywords }) =>
    keywords.some((keyword) => normalizedName.includes(keyword))
  );
  const query = match ? match.query : "indian-food";

  return `https://source.unsplash.com/${size}/?${query}`;
}

export function getCategoryImage(category) {
  return getFoodImage(category, "120x120");
}
