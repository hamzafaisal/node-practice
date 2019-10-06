var validator = require("validator");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Task = require("../models/task");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email not valid");
        }
      }
    },
    age: {
      type: Number,
      default: 0
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("password can't be password");
        }
      }
    },
    tokens: [
      {
        token: {
          required: true,
          type: String
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

// Relationship with task
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner"
});

userSchema.methods.generateToken = async function() {
  let user = this;
  let token = jwt.sign({ _id: user._id.toString() }, "mr.jonty");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// hashing the password
userSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// hashing the password
userSchema.pre("remove", async function(next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
