require("dotenv").config();
const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const router = require("../routes");
const { Hardware } = require("../models/index");

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
  
  describe("Get All Hardware Products", () => {
    test("responds to GET /hardware-products", async () => {
      const res = await request(app).get("/hardware-products");
      //console.log(res.body); 
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    }, 15000);
});
  
describe("Get a Hardware Product by id", () => {
      test("responds to GET /hardware-products/:id", async () => {
        const productId = "67f999c8475dc1c68677855b"
        const res = await request(app).get(`/hardware-products/${productId}`);
  
        const productExists = await Hardware.findById(productId)
  
        expect(productExists).not.toBeNull();
        expect(res.body._id).toBe(productId);
  
      }, 15000);
});