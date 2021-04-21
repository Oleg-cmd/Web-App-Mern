let express = require('express'),
	router = express.Router();

let authenticationController = require('../controllers/authController.js');

/**
 * (POST Method)
 */
// SignUp
router.post('/signup', authenticationController.signup);

//SignIn
router.post('/signin', authenticationController.signin);

//Google singin
router.post('/google', authenticationController.google);

router.get('/logout', (req, res) => {
	req.session = null;
	req.logout();
	res.redirect('/');
});

module.exports = router;
