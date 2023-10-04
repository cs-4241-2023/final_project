const express = require('express');
const session = require('express-session');
const { createServer: createViteServer } = require('vite');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const server_port = process.env.PORT || 3000;
const express_session_token = process.env.EXPRESS_SESSION_TOKEN;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: express_session_token,
    resave: false,
    saveUninitialized: false
}));


async function createViteServerMiddleware() {
    const vite = await createViteServer({
        server: { middlewareMode: 'true' },
        configFile: path.resolve(__dirname, '../vite.config.ts'),  // Path to your Vite config file
    });

    // Use Vite's connect instance as middleware
    app.use(vite.middlewares);

    app.use('*', async (req, res) => {
        try {
            // Serve index.html - Vite transforms it on-the-fly!
            const { render } = await vite.ssrLoadModule('./src/index.tsx');  // Adjust path if necessary
            const html = await render({ url: req.originalUrl });
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        } catch (e) {
            vite.ssrFixStacktrace(e);
            console.error(e.stack);
            res.status(500).end(e.stack);
        }
    });

    app.listen(server_port, () => {
        console.log(`Server is running on http://localhost:${server_port}`);
    });
}

createViteServerMiddleware();
