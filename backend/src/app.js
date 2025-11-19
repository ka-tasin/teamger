import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();
// Import routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import teamRoutes from './routes/team.routes';
import projectRoutes from './routes/projects.routes';
import taskRoutes from './routes/task.routes';
import dashboardRoutes from './routes/dashboard.routes';
// Import middleware
import { errorHandler } from './handlers/error.handler';
import { notFoundHandler } from './handlers/notFound.handler';
class App {
    app;
    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }
    initializeMiddlewares() {
        // Security middleware
        this.app.use(helmet());
        // CORS middleware
        this.app.use(cors({
            origin: process.env.FRONTEND_URL || 'http://localhost:3000',
            credentials: true,
        }));
        // Body parsing middleware
        this.app.use(express.json({ limit: '10mb' }));
        this.app.use(express.urlencoded({ extended: true }));
        // Request logging middleware
        this.app.use((req, res, next) => {
            console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
            next();
        });
    }
    initializeRoutes() {
        // Health check route
        this.app.get('/health', (req, res) => {
            res.status(200).json({
                status: 'OK',
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
            });
        });
        // API routes
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/users', userRoutes);
        this.app.use('/api/teams', teamRoutes);
        this.app.use('/api/projects', projectRoutes);
        this.app.use('/api/tasks', taskRoutes);
        this.app.use('/api/dashboard', dashboardRoutes);
    }
    initializeErrorHandling() {
        // Handle 404 errors
        this.app.use(notFoundHandler);
        // Handle all other errors
        this.app.use(errorHandler);
    }
}
export default App;
//# sourceMappingURL=app.js.map