const mongoose = require("mongoose");

const testimonialSchema = mongoose.Schema({
  commentaire: String,
  name: String,
  designation: String,
  company: String,
  // image: URL,
});

const Testimonial = mongoose.model("testimonials", testimonialSchema);

module.exports = Testimonial;
