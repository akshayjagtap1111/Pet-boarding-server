const router = require("express").Router();

const Pet = require("../models/pet");

//user

router.post("/add", async (req, res) => {
  try {
    let pet_req = { ...req.body, status: "Pending" };

    console.log(pet_req);
    const new_pet = await Pet.create(pet_req);

    res.status(201).send(new_pet);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
});

router.patch("/approve/:id", async (req, res) => {
  try {
    
    const new_pet = await Pet.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { new: true }
    );

    res.status(201).send(new_pet);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);

    res.status(202).json({
      message: "deleted successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
});
router.get("/all", async (req, res) => {
  try {
    const all_pets = await Pet.find().lean().exec();

    res.status(200).send(all_pets);
  } catch (err) {}
});

router.get("/pending", async (req, res) => {
  try {
    const all_pets = await Pet.find({status:"Pending"}).lean().exec();

    res.status(200).send(all_pets);
  } catch (err) {}
});

router.get("/approved", async (req, res) => {
  try {
    const all_pets = await Pet.find({status:"Approved"}).lean().exec();

    res.status(200).send(all_pets);
  } catch (err) {}
});

module.exports = router;
