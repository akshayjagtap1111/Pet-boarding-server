const { Schema, model } = require("mongoose");

const pet_schema = new Schema({
  name: { type: String, required: true }, 
  breed: { type: String, required: true },
  weight:{ type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  status:{type: String},

  place:{
    type:Schema.Types.ObjectId,
    ref: "pet_place",
    required: true,
   }
});

module.exports = model("pet", pet_schema);