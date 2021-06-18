const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

SALT_ROUNDS = 7;
const reviewSchema = new Schema({
  content: String,
  rating: {type: Number, min: 1, max: 5, default: 5}
}, {
  timestamps: true
});

//reference https://stackoverflow.com/questions/29299477/how-to-create-and-use-enum-in-mongoose (from)
const roleSchema = new Schema({
  role :{ 
    type: String,
    enum:['user', 'admin', 'client', 'agent']
  }
}, {
  timestamps: true
});

const serviceSchema = new Schema({
  name :{ 
    type: String
  },
  price :{ 
    type: Number
  },
  minimumHours:{
  type: Number,
  min: 1, max: 10, default: 3,
  }
}, {
  timestamps: true
});
const userSchema = new Schema({
  name: {type: String, unique: true, required: true},
  email: {
    type: String,
    unique: true,
    trim: true, // trims whitespace if your user types something like " alex@123.com " into "alex@123.com"
    lowercase: true,
    required: true
  },
  displayName:{type: String, required: false},
  joined: {
    type: Date, 
    default: Date.now
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
    required: true
  },
  birthday:{
    type: Date,
    required: false
  },
  cardNumber:{
    type:Number,
    required: false
  },
  roles: [roleSchema],
  location: {
    address:{
      type: String,
      required: true
    },
    addressDetails:{
      type: String,
      required: false
    },
    unit:{
      type: String,
      required: false
    },
    city:{
      type: String,
      required: true
    },
    region:{
      type: String,
      required: true
    },
    country:{
      type: String,
      required: true
    },
    postalCode:{
      type: String,
      required: true
    }
  },
  latitude: {
    type: Number,
    trim: true,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  reviews:[reviewSchema],
  services:[serviceSchema],
  appointments: [{type: Schema.Types.ObjectId, ref: 'Appointment'}]

} ,{
  timestamps: true,
  // A cool mongoose trick to not send passwords to clients! (even though they'll be hashed)
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});
userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  console.log("howdy pardner!")
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);
    // Update the password property with the hash
    user.password = hash;
    return next();
  });
});
module.exports = mongoose.model('User', userSchema);