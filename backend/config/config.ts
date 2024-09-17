const config = {
    port: process.env.PORT || 3000,
    
    databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/yourdbname',
    
    imageStoragePath: process.env.IMAGE_STORAGE_PATH || './public/og-images',
    
    maxImageSize: 5 * 1024 * 1024, 
    
    env : 'PRODUCTION'
  };
  
export default config;