const path = require('path');

const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const mysqlDb = require('../mysqlDb');
const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
    const news = await mysqlDb.getConnection().query('SELECT * FROM `news`')
    res.send(news)
});
router.get('/:id', async (req, res) => {
    const news = await mysqlDb.getConnection().query('SELECT * FROM `news`  WHERE `id` = ?', req.params.id)
    res.send(news)
});
router.post('/', upload.single('image'),async (req, res) => {
    const news = req.body;
    if (req.file) {
        news.image = req.file.filename
    }

    if(!news.title || !news.description) {
        res.send('Заполни всё')
    } else {
        const result = await mysqlDb.getConnection().query('INSERT INTO `news` (`title`, `description`, `image`) VALUES (?, ?, ?)', [news.title, news.description, news.image])
        res.send({id: result.insertId})
    }

});
router.delete('/:id', async (req, res) => {
   const news = await mysqlDb.getConnection().query('DELETE FROM `news` WHERE `id` = ?',req.params.id);
   if (news) {
       res.send('DELETED')
   }
});


module.exports = router;