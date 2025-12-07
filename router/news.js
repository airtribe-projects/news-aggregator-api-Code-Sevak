const router = require('express').Router();
const { getNews } = require('../controllers/newsLogic');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, getNews);


module.exports = router;
