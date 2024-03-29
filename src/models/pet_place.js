const { Schema, model } = require("mongoose");

const pet_place_schema = new Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  capacity: { type: String, required: true },
  cost_per_day: { type:Number, required: true },
  verified: { type: String, required: true },
  rating: { type: Number, required: true },
});

module.exports = model("pet_place", pet_place_schema);
