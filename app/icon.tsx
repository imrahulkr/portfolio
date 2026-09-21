import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#375D81",
          borderRadius: 7,
          color: "#FBFBF9",
          fontFamily: "sans-serif",
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: -0.5,
        }}
      >
        RK
      </div>
    ),
    { ...size }
  );
}
