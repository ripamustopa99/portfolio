// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Ripa Mustopa A — Software Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#090a0f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "monospace",
          border: "4px solid #1e2230",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "16px", height: "16px", background: "#00f0ff" }} />
            <span style={{ color: "#00f0ff", fontSize: "20px", letterSpacing: "0.2em" }}>
              RIPA MUSTOPA A.
            </span>
          </div>
          <span style={{ color: "#8a93a6", fontSize: "18px" }}>SOFTWARE DEVELOPER</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ color: "#00f0ff", fontSize: "24px" }}>{`// PORTFOLIO & SHOWCASE`}</div>
          <div
            style={{
              color: "#ffffff",
              fontSize: "64px",
              fontWeight: "bold",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Building high-performance scalable systems.
          </div>
          <div style={{ color: "#8a93a6", fontSize: "24px", maxWidth: "900px" }}>
            Architecture, frontend systems, and developer experience.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #1e2230", paddingTop: "30px" }}>
          <span style={{ color: "#8a93a6", fontSize: "18px" }}>ripamustopa.dev</span>
          <span style={{ color: "#00f0ff", fontSize: "18px" }}>TypeScript • React • Next.js • Node.js</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
