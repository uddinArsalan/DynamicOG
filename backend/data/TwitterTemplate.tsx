const TwitterTemplate = `
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundColor: "#1DA1F2",
        backgroundImage: imageUrl ? \`url(\${imageUrl})\` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Helvetica, Arial, sans-serif",
        padding: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "1.5rem",
          borderRadius: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          {logoUrl && (
            <img
              src={logoUrl}
              alt="Logo"
              style={{
                width: "48px",
                height: "48px",
                marginRight: "1rem",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          )}
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#ffffff",
              margin: "0",
              lineHeight: "1.2",
            }}
          >
            {title}
          </h1>
        </div>
        <p
          style={{
            fontSize: "24px",
            color: "#e0e0e0",
            margin: "0",
            lineHeight: "1.5",
          }}
        >
          {content}
        </p>
      </div>
    </div>
  `;
export default TwitterTemplate;
