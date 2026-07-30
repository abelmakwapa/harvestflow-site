import { ImageResponse } from "next/og";

export const alt = "HarvestFlow — connected agricultural supply chains";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#15120d",
        color: "#f6f4e4",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "80px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: "980px" }}>
        <div style={{ color: "#d3fbe4", display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: 5 }}>
          HARVESTFLOW
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.05, marginTop: 32 }}>
          Trade infrastructure from seed to shelf.
        </div>
        <div style={{ color: "#b8b1a4", display: "flex", fontSize: 30, lineHeight: 1.4, marginTop: 32 }}>
          Farmers, fleets, suppliers, and enterprise buyers on one connected chain.
        </div>
      </div>
    </div>,
    size,
  );
}
