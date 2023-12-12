// requiring the modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//defining the uesr schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});
//middleware for salting and hashing the password before saving
userSchema.pre('save', async function (next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });
// creating User class for accessing the db associated with the userSchema
const User = mongoose.model('User', userSchema);
//export this user
module.exports = User;