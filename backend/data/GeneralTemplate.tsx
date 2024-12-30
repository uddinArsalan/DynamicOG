const GeneralTemplate = `
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        backgroundImage: imageUrl ? \`url(\${imageUrl})\` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "2rem",
          borderRadius: "1rem",
          maxWidth: "80%",
        }}
      >
        {logoUrl && (
          <img
            src={logoUrl}
            alt="Logo"
            style={{
              width: "80px",
              height: "80px",
              marginBottom: "1rem",
              objectFit: "contain",
            }}
          />
        )}
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "#ffffff",
            textAlign: "center",
            margin: "0 0 1rem 0",
            lineHeight: "1.2",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: "32px",
            color: "#e0e0e0",
            textAlign: "center",
            margin: "0",
            lineHeight: "1.5",
          }}
        >
          {content}
        </p>
      </div>
    </div>
  `;
export default GeneralTemplate;
