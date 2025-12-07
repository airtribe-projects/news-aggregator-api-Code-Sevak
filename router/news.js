const router = require('express').Router();
const { getNews } = require('../middlewares/newsLogic');

router.get('/', getNews);

module.exports = router;