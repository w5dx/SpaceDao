// Cross-platform start script for Windows environments
process.env.NODE_ENV = 'production';
import('./dist/index.js').catch(err => {
  console.error('Error starting the application:', err);
  process.exit(1);
});