const express = require('express');
const cors = require('cors');
const mysqlDb = require('./mysqlDb');
const news = require('./app/news');
const comments = require('./app/comments');
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.use('/news', news);
app.use('/comments', comments);

const run = async () => {
    await mysqlDb.connect();
    const result = await mysqlDb.getConnection().query('SELECT 1 + 1 as `result`');
    console.log(result);
    app.listen(port, () => {
        console.log(`HTTP Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mysqlDb.disconnect()
    })

};
run().catch (e => {
    console.log(e)
});