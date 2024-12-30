const LinkedinTemplate = `
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#0077B5",
        backgroundImage: imageUrl ? \`url(\${imageUrl})\` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Segoe UI, Helvetica, Arial, sans-serif",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: "rgba(0, 119, 181, 0.8)",
        }}
      >
        {logoUrl && (
          <img
            src={logoUrl}
            alt="Logo"
            style={{
              width: "64px",
              height: "64px",
              marginBottom: "1rem",
              objectFit: "contain",
            }}
          />
        )}
        <h1
          style={{
            fontSize: "56px",
            fontWeight: "bold",
            color: "#ffffff",
            margin: "0 0 1rem 0",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: "28px",
            color: "#e0e0e0",
            margin: "0",
            lineHeight: 1.5,
          }}
        >
          {content}
        </p>
      </div>
      <div
        style={{
          width: "40%",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        }}
      />
    </div>
  `;

export default LinkedinTemplate;
