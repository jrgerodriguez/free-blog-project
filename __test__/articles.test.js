require("dotenv").config();
const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const router = require("../routes");
const { techArticle } = require("../models/index");

const app = express();
app.use(express.json()); 
app.use("/", router);

beforeAll(async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("Connection to database failed");
    }
  
    await mongoose.connect(uri);
  });
  
  afterAll(async () => {
    await mongoose.connection.close();
  });
  
  describe("Get All Articles", () => {
    test("responds to GET /articles", async () => {
      const res = await request(app).get("/articles");
      // console.log(res.body); 
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    }, 15000);
});
  
describe("Get an article by id", () => {
      test("responds to GET /articles/:id", async () => {
        const articleId = "67f1593ccb8e29a9b455a461"
        const res = await request(app).get(`/articles/${articleId}`);
  
        const articleExists = await techArticle.findById(articleId)
  
        expect(articleExists).not.toBeNull();
        expect(res.body._id).toBe(articleId);
  
      }, 15000);
});