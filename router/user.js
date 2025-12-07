const router = require('express').Router();

const { signup, login ,getPreferences ,updatePreferences} = require('../controllers/userLogic');

const verifyToken = require('../middlewares/verifyToken');

router.post('/signup', signup);

router.post('/login', login);

router.get('/preferences', verifyToken, getPreferences);

router.put('/preferences', verifyToken, updatePreferences);


module.exports = router;

