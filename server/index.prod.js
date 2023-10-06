const { app, server_port, express, path } = require('./index.base');

// Serving static files from 'dist' directory
app.use(express.static(path.resolve(__dirname, '../dist')));

// For Single Page Application (SPA) setup with React-Router
app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.listen(server_port, () => {
    console.log(`Server is running on http://localhost:${server_port}`);
});
