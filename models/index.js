const mongoose = require("mongoose");

//This schema follows the same pattern of the "users" collection
const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  city: { type: String },
  country: { type: String },
  instagram: { type: String },
  facebook: { type: String },
});

const User = mongoose.model("user", userSchema);

//This schema follows the same pattern of the "technology_articles" collection
const articleSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  publishedAt: { type: Date, default: Date.now },
});

const techArticle = mongoose.model("technology_article", articleSchema);

//This schema follows the same pattern of the "hardware_products" collection
const hardWareProductsSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  description: { type: String },
  model: { type: String },
  brand: { type: String },
  category: { type: String },
});

const Hardware = mongoose.model("hardware_product", hardWareProductsSchema);

//This schema follows the same pattern of the "digital_products" collection
const digitalProductsSchema = new mongoose.Schema({
  name: {type: String},
  version: {type: String},
  company: {type: String},
  description: {type: String},
  extra: {type: String},
  plan: {type: String},
  available: {type: Boolean}
})

const Digital = mongoose.model("digital_product", digitalProductsSchema);

module.exports = { User, techArticle, Hardware, Digital };
