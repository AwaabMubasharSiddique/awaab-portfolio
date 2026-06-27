import { ImageResponse } from "next/og";

export const alt = "Awaab Mubashar Siddique · Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#f3efe4",
          backgroundImage:
            "linear-gradient(to right, rgba(29,74,54,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(29,74,54,0.10) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          borderTop: "12px solid #1d4a36",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              border: "2px dashed #1d4a36",
              color: "#1d4a36",
              padding: "8px 18px",
              fontFamily: "monospace",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Software Engineer @ AppCraftr
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 116,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -2,
              color: "#171c17",
            }}
          >
            Awaab Mubashar
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 116,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -2,
              fontStyle: "italic",
              color: "#1d4a36",
            }}
          >
            Siddique.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              maxWidth: 920,
              fontSize: 32,
              lineHeight: 1.35,
              color: "#5d6b5f",
            }}
          >
            Production AI systems: agentic workflows, RAG pipelines, FastAPI
            backends and document/media automation.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "monospace",
            fontSize: 24,
            letterSpacing: 3,
            color: "#171c17",
          }}
        >
          <div style={{ display: "flex" }}>gr9awaab@gmail.com</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex" }}>GitHub</div>
            <div style={{ display: "flex", color: "#cfc9b6" }}>·</div>
            <div style={{ display: "flex" }}>LinkedIn</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
