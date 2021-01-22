var mongoose = require("mongoose");

var contractSchema = mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: String,
  nickname: String,
  phone: String,
  gender: String,
  create_date: {
    type: Date,
    default: Date.now,
  },
});

var Contract = (module.exports = mongoose.model("contact", contractSchema));

module.exports.get = function (callback, limit) {
  Contract.find(callback).limit(limit);
};
