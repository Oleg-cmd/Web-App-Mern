var exports = (module.exports = {});
var passwordValidator = require('password-validator');
let config = require('config');

let jwt = require('jsonwebtoken');
let schema = new passwordValidator();

// Call User model
let User = require('../models/user');

schema
	.is()
	.min(8) // Minimum length 8
	.is()
	.max(20) // Maximum length 20
	.has()
	.uppercase() // Must have uppercase letters
	.has()
	.lowercase() // Must have lowercase letters
	.has()
	.digits(2) // Must have at least 2 digits
	.has()
	.not()
	.spaces(); // Should not have spaces
// .is()
// .not()
// .oneOf() // Blacklist these values

exports.signup = function (req, res) {
	userUsername = req.body.username;
	userPassword = req.body.password;
	if (!userUsername || !userPassword) {
		return res.json({
			success: false,
			msg: 'Please pass username and password.',
		});
	} else {
		const toReg = async () => {
			const pass = schema.validate(userPassword);
			if (pass) {
				let newUser = new User({
					username: userUsername,
					password: userPassword,
				});
				// save the user
				newUser.save(function (err) {
					if (err) {
						return res.json({
							success: false,
							msg: 'Username already exists.',
						});
					} else {
						console.log(new Date());
						console.log(`Created new user: ${username}`);
						console.log(newUser);
						return res.json({
							success: true,
							msg: 'Successful created new user.',
						});
					}
				});
			} else {
				if (!valid) {
					return res.json({
						success: false,
						msg: 'Your username is not valid',
					});
				}
				if (!pass) {
					return res.json({
						success: false,
						msg: 'Your password is not valid',
					});
				}
			}
		};
		toReg();
	}
};

exports.signin = function (req, res) {
	User.findOne(
		{
			username: req.body.username,
		},
		function (err, user) {
			if (err) throw err;

			if (!user) {
				res.status(401).send({
					success: false,
					msg: 'Authentication failed. User not found.',
				});
			} else {
				// check if password matches
				user.comparePassword(req.body.password, function (err, isMatch) {
					if (isMatch && !err) {
						// if user is found and password is right create a token
						let token = jwt.sign(user.toJSON(), config.get('jwt'));
						// return the information including token as JSON
						console.log(new Date());
						console.log(`Success login user: ${user.username}`);
						console.log(user);
						res.json({
							success: true,
							token: token,
							user: {
								userId: user._id,
								username: user.username,
								isAdmin: user.isAdmin,
							},
						});
					} else {
						res.status(401).send({
							success: false,
							msg: 'Authentication failed. Wrong password.',
						});
					}
				});
			}
		},
	);
};
