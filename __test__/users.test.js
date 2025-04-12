require("dotenv").config();
const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const router = require("../routes");
const { User } = require("../models/index");

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

describe("Get All Users", () => {
  test("responds to GET /users", async () => {
    const res = await request(app).get("/users");
    // console.log(res.body); 
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 15000);
});

describe("Get a user by id", () => {
    test("responds to GET /users/:id", async () => {
      const userId = "67f15644cb8e29a9b455a3da"
      const res = await request(app).get(`/users/${userId}`);

      const userExists = await User.findById(userId)

      expect(userExists).not.toBeNull();
      expect(res.body._id).toBe(userId);

    }, 15000);
  });