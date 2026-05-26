"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
const dev = process.env.NODE_ENV !== 'production';
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
app.prepare().then(() => {
    const server = (0, express_1.default)();
    // Custom Express APIs can go here
    server.get('/api/health', (req, res) => {
        res.json({ status: 'ok', message: 'Express backend is running' });
    });
    // Next.js request handler
    server.use((req, res) => {
        return handle(req, res);
    });
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
}).catch((err) => {
    console.error('Error starting server:', err);
    process.exit(1);
});
