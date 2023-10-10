const { app, server_port, express, path } = require('./index.base');

app.use(express.static(path.resolve(__dirname, '../dist')));

app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.listen(server_port, () => {
    console.log(`Server is running on http://localhost:${server_port}`);
});
