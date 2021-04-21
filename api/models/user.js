const { Schema, model, Types } = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
const schema = new Schema(
	{
		name: { type: String, required: false },
		password: { type: String, required: false },
		email: { type: String, unique: true },
		isAdmin: { type: Boolean, default: false, required: false },
		salary: { type: String, required: false, unique: false },
	},
	{
		timestamps: true,
	},
);
schema.pre('save', function (next) {
	var user = this;
	if (this.isModified('password') || this.isNew) {
		bcrypt.genSalt(10, function (err, salt) {
			if (err) {
				return next(err);
			}
			bcrypt.hash(user.password, salt, null, function (err, hash) {
				if (err) {
					return next(err);
				}
				user.password = hash;
				next();
			});
		});
	} else {
		return next();
	}
});

schema.methods.comparePassword = function (passw, cb) {
	bcrypt.compare(passw, this.password, function (err, isMatch) {
		if (err) {
			return cb(err);
		}
		cb(null, isMatch);
	});
};

module.exports = model('User', schema);
