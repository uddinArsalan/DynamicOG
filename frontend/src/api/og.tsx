import { ImageResponse } from '@vercel/og'; 

export async function getOGImage(
  title: string,
  content: string,
  imageUrl?: string | null
) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f0f0",
          fontFamily: "Arial, sans-serif",
          padding: "40px",
        }}
      >
        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>{title}</h1>
        <p style={{ fontSize: "24px", marginBottom: "20px" }}>
          {content.substring(0, 100)}...
        </p>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Post image"
            style={{ maxWidth: "400px", maxHeight: "300px" }}
          />
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
