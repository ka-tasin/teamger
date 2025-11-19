import dotenv from 'dotenv';
dotenv.config();
import App from './app';
const PORT = process.env.PORT || 3001;
// Initialize Express app
const app = new App().app;
// Start server
const server = app.listen(PORT, () => {
    console.log(`
    🚀 Server running on port ${PORT}
    📊 Environment: ${process.env.NODE_ENV || 'development'}
    🗄️  Database: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}
  `);
});
// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Received SIGINT. Shutting down gracefully...');
    server.close(() => {
        console.log('💤 Server closed.');
        process.exit(0);
    });
});
process.on('SIGTERM', () => {
    console.log('\n👋 Received SIGTERM. Shutting down gracefully...');
    server.close(() => {
        console.log('💤 Server closed.');
        process.exit(0);
    });
});
// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('❌ Unhandled Promise Rejection:', err.message);
    console.log(err.stack);
    // Close server & exit process
    server.close(() => {
        process.exit(1);
    });
});
// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log('❌ Uncaught Exception:', err.message);
    console.log(err.stack);
    process.exit(1);
});
export default server;
//# sourceMappingURL=server.js.map