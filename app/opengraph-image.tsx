import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0B0D0F",
          color: "#EDEEF0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#6E9BC2", marginBottom: 24 }}>
          {siteConfig.role}
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 600 }}>{siteConfig.name}</div>
        <div style={{ display: "flex", fontSize: 28, color: "#9BA0A6", marginTop: 24 }}>
          Backend &amp; full-stack engineer — Java, Spring Boot, React
        </div>
      </div>
    ),
    { ...size }
  );
}
