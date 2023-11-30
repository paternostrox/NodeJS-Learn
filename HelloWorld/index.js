const express = require('express');
const { readFile } = require('fs').promises;

const app = express();

app.get('/', async (request, response) => {
    response.send(await readFile('./home.html', 'utf-8'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App available on http://localhost:${port}`));