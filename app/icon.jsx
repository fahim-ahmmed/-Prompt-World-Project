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
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0d111a 0%, #07090e 100%)",
          borderRadius: "10px",
          border: "1.5px solid rgba(167, 139, 250, 0.4)",
          boxShadow: "0 4px 12px rgba(124, 58, 237, 0.3)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Subtle Gradient Glow */}
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: "radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, transparent 60%)",
          }}
        />

        {/* High-Tech PW Lettermark */}
        <div
          style={{
            fontSize: "13px",
            fontWeight: "900",
            fontFamily: "sans-serif",
            letterSpacing: "-0.5px",
            background: "linear-gradient(135deg, #ffffff 0%, #a78bfa 50%, #ec4899 100%)",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          PW
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}