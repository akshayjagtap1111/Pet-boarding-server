const PetPlace = require("../models/pet_place");

const express = require("express");


const router = express.Router();

const { checkRole, userAuth } = require("../utils/Auth");

router.get("", async (req, res) => {
  try {
    const { ord1, ord2, page, qty, city, verified } = req.query;

    console.log(ord1, ord2, page, qty, city, verified);

    let pet_place;
    if (ord1) {
      if (city && verified) {
        const regex = new RegExp(escapeRegex(city),'gi')
     
        let filter = {
          city: regex,
          verified: verified,
        };
        pet_place = await PetPlace.find(filter)
          .sort({ cost_per_day: ord1 })
          .sort({ rating: ord2 })
          .skip((page - 1) * qty)
          .limit(qty)
          .lean()
          .exec();
      } else if (city && !verified) {
        const regex = new RegExp(escapeRegex(city),'gi')

       
        pet_place = await PetPlace.find({
          city: regex,
        })
          .sort({ cost_per_day: ord1 })
          .sort({ rating: ord2 })
          .skip((page - 1) * qty)
          .limit(qty)
          .lean()
          .exec();
      } else if (!city && verified) {

        pet_place = await PetPlace.find({ verified: verified })
          .sort({ cost_per_day: ord1 })
          .sort({ rating: ord2 })
          .skip((page - 1) * qty)
          .limit(qty)
          .lean()
          .exec();
      } else {

        pet_place = await PetPlace.find({})
          .sort({ cost_per_day: ord1 })
          .sort({ rating: ord2 })
          .skip((page - 1) * qty)
          .limit(qty)
          .lean()
          .exec();
      }
    } else {
      if (city && verified) {
        const regex = new RegExp(escapeRegex(city),'gi')

        let filter = {
          city: regex,
          verified: verified,
        };
        pet_place = await PetPlace.find(filter)
          .sort({ rating: ord2 })
          .sort({ cost_per_day: ord1 })
          .skip((page - 1) * qty)
          .limit(qty)
          .lean()
          .exec();
      } else if (city && !verified) {
        const regex = new RegExp(escapeRegex(city),'gi')


    
        pet_place = await PetPlace.find({
          city: regex,
        })
          .sort({ rating: ord2 })
          .sort({ cost_per_day: ord1 })
          .skip((page - 1) * qty)
          .limit(qty)
          .lean()
          .exec();
      } else if (!city && verified) {

        pet_place = await PetPlace.find({ verified: verified })
          .sort({ rating: ord2 })
          .sort({ cost_per_day: ord1 })
          .skip((page - 1) * qty)
          .limit(qty)
          .lean()
          .exec();
      } else {

        pet_place = await PetPlace.find({})
          .sort({ rating: ord2 })
          .sort({ cost_per_day: ord1 })
          .skip((page - 1) * qty)
          .limit(qty)
          .lean()
          .exec();
      }
    }

    res.status(200).send(pet_place);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const pet_place = await PetPlace.findById(req.params.id).lean().exec();

    res.status(200).send(pet_place);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
});

router.get("/:name", async (req, res) => {
  try {
    const pet_place = await PetPlace.find({ name: req.params.name })
      .lean()
      .exec();

    res.status(200).send(pet_place);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
});

router.post("/add", userAuth, checkRole(["admin"]), async (req, res) => {
  try {
    console.log("add");
    const pet_place = await PetPlace.create(req.body);

    res.status(200).send(pet_place);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
});

router.patch("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const pet_place = await PetPlace.findByIdAndUpdate(id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    res.status(201).send(pet_place);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const pet_place = await PetPlace.findByIdAndDelete(req.params.id)
      .lean()
      .exec();

    res.status(202).json({ ...pet_place, message: "successfully deleted" });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
});


function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
