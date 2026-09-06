// app/icon.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#38bdf8",
          fontSize: "20px",
          fontWeight: "bold",
          fontFamily: "monospace",
          borderRadius: "0px",
          border: "1px solid #27272a",
        }}
      >
        R
      </div>
    ),
    {
      ...size,
    }
  );
}
