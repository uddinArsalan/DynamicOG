function HtmlTemplateJsx(title : string, content : string ,imageUrl : string | null) {
  return (
    <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: '#1E293B',
          fontFamily: 'Inter, sans-serif',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {imageUrl && (
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '50%',
            height: '100%',
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
        )}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: imageUrl 
            ? 'linear-gradient(90deg, rgba(30,41,59,1) 0%, rgba(30,41,59,1) 50%, rgba(30,41,59,0) 100%)'
            : 'radial-gradient(circle at 70% 50%, #4338CA 0%, transparent 50%)',
        }} />
        <div style={{
          display: "flex", 
          flexDirection: "column", 
          width: '60%',
          padding: '60px',
          zIndex: 1,
        }}>
          <h1 style={{ 
            fontSize: '72px', 
            fontWeight: 'bold', 
            margin: '0 0 20px 0', 
            lineHeight: '1.1',
            background: 'linear-gradient(90deg, #60A5FA, #A78BFA)',
            backgroundClip: 'text',
            // '-webkit-background-clip': 'text',
            color: 'transparent',
          }}>
            {title}
          </h1>
          <p style={{ 
            fontSize: '36px', 
            margin: '0', 
            lineHeight: '1.4', 
            color: '#E2E8F0'
          }}>
            {content}
          </p>
        </div>
      </div>
  )
}

export default HtmlTemplateJsx;