const mongoose = require("mongoose");

const pubSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});

const Pub = mongoose.model("Pub", pubSchema);

module.exports = Pub;