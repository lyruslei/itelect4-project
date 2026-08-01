import type { Item } from "../types/index";

interface ItemCardProps {
  item: Item;
}

function ItemCard({ item }: ItemCardProps) {
  return (
    <div style={{ border: "1px solid #007bff", padding: "1rem", borderRadius: "8px", marginBottom: "1rem", backgroundColor: "#f8f9fa" }}>
      <h3>
        {item.title}{" "}
        <span style={{ fontSize: "0.8em", color: item.status === "lost" ? "red" : "green" }}>
          ({item.status.toUpperCase()})
        </span>
      </h3>
      <p>{item.description}</p>
      <p><strong>Location:</strong> {item.location}</p>
      <p><strong>Reported:</strong> {item.reportedAt.toLocaleDateString()}</p>
    </div>
  );
}

export default ItemCard;