const router = require('express').Router();

const { signup, login ,getPreferences ,updatePreferences} = require('../middlewares/userLogic');

router.post('/signup', signup);

router.post('/login', login);

router.get('/preferences', getPreferences);

router.put('/preferences', updatePreferences);      

module.exports = router;
