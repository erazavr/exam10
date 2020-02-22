
const express = require('express');
const mysqlDb = require('../mysqlDb');


const router = express.Router();

router.get('/', async (req, res) => {
    if (req.query.news_id) {
        const comment = await mysqlDb.getConnection().query('SELECT * FROM `comments` WHERE `news_id` = ?', req.query.news_id);
        res.send(comment)

    } else {
        const comments = await mysqlDb.getConnection().query('SELECT * FROM `comments`');
        res.send(comments);
    }

});
router.post('/', async (req,res) => {
    const comments = req.body;
    if (!comments.author) {
        comments.author = 'Anonymous'
    }
    const result = await mysqlDb.getConnection().query('INSERT INTO `comments` (`news_id`, `author`, `comment`) VALUES (?, ?, ?)', [comments.newsId, comments.author, comments.comment])
    res.send({id: result.insertId})
});
router.delete('/:id' ,async (req, res) => {
    const comment = await mysqlDb.getConnection().query('DELETE FROM `comments` WHERE `id` = ?',req.params.id);
    if (comment) {
        res.send('DELETED')
    }
});


module.exports = router