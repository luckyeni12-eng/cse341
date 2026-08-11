import request from "supertest";
import mongoose from "mongoose";
import app from "../server.js";

describe("Books GET endpoints", () => {

  test("GET /books returns 200", async () => {
    const response = await request(app)
      .get("/books");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });


  test("GET /books/:id returns 404 for nonexistent book", async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const response = await request(app)
      .get(`/books/${fakeId}`);

    expect(response.statusCode).toBe(404);
  });


  test("GET /books/:id returns 500 for invalid ID", async () => {
    const response = await request(app)
      .get("/books/not-a-valid-id");

    expect(response.statusCode).toBe(500);
  });

});