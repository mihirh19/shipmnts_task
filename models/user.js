const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const UserSchema = new Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },

   password: {
      type: String,
      required: true,
   },
},
   { timestamps: true })


UserSchema.methods.mathchPassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre("save", async function (next) {
   if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
   }
   next();
});

module.exports = mongoose.model('User', UserSchema)