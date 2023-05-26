var express = require("express");
var router = express.Router();

require("../models/connection");
const Testimonial = require("../models/testimonials");

router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    console.log(testimonials);
    res.json(testimonials);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des témoignages" });
  }
});

// router.get("/", (req, res) => {
//   Testimonial.find().then((data) => {
//     res.json({ testimonials: data });
//   });
// });

router.post("/", (req, res) => {
  // Check if the user has not already been registered
  Testimonial.findOne({ name: req.body.name }).then((data) => {
    if (data === null) {
      const newTestimonial = new Testimonial({
        testimonial: req.body.testimonial,
        name: req.body.name,
        designation: req.body.designation,
        company: req.body.company,
        // image: req.body.URL,
      });

      newTestimonial.save().then((newDoc) => {
        res
          .status(200)
          .json({ result: true, message: "Données enregistrées avec succès" });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: "User already exists" });
    }
  });
});

module.exports = router;
