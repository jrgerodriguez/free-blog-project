require("dotenv").config();
const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const router = require("../routes");
const { Digital } = require("../models/index");

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
  
  describe("Get All Digital Products", () => {
    test("responds to GET /digital-products", async () => {
      const res = await request(app).get("/digital-products");
      //console.log(res.body);  
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    }, 15000);
});
  
describe("Get a Digital Product by id", () => {
      test("responds to GET /digital-products/:id", async () => {
        const productId = "67f9be73475dc1c686778adc"
        const res = await request(app).get(`/digital-products/${productId}`);
  
        const productExists = await Digital.findById(productId)
  
        expect(productExists).not.toBeNull();
        expect(res.body._id).toBe(productId);
  
      }, 15000);
});