const mongoose = require("mongoose")

//This schema follows the same pattern of the "users" collection
const userSchema = new mongoose.Schema({
    firstName: { type: String},
    lastName: { type: String},
    email: { type: String},
    city: { type: String},
    country: { type: String},
    instagram: { type: String },
    facebook: { type: String }
});

const User = mongoose.model('user', userSchema);

//This schema follows the same pattern of the "technology_articles" collection
const articleSchema = new mongoose.Schema({
    title: {type: String},
    content: {type: String},
    publishedAt: { type: Date, default: Date.now }
});

const techArticle = mongoose.model('technology_article', articleSchema);

module.exports = {User, techArticle}