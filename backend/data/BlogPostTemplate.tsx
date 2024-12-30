const BlogPostTemplate = `<div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundColor: "#ffffff",
        backgroundImage: imageUrl ? \`url(\${imageUrl})\` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Georgia, serif",
        padding: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "2rem",
          borderRadius: "0.5rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {logoUrl && (
          <img
            src={logoUrl}
            alt="Logo"
            style={{
              width: "48px",
              height: "48px",
              marginBottom: "1rem",
              objectFit: "contain",
            }}
          />
        )}
        <h1
          style={{
            fontSize: "52px",
            fontWeight: "bold",
            color: "#333333",
            margin: "0 0 1rem 0",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: "24px",
            color: "#666666",
            margin: "0",
            lineHeight: 1.5,
          }}
        >
          {content}
        </p>
      </div>
    </div>
  `;

export default BlogPostTemplate;
