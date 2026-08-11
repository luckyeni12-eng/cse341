import request from "supertest";
import mongoose from "mongoose";
import app from "../server.js";

describe("Authors GET endpoints", () => {

  test("GET /authors returns 200", async () => {
    const response = await request(app)
      .get("/authors");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });


  test("GET /authors/:id returns 404 for nonexistent author", async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const response = await request(app)
      .get(`/authors/${fakeId}`);

    expect(response.statusCode).toBe(404);
  });


  test("GET /authors/:id returns 500 for invalid ID", async () => {
    const response = await request(app)
      .get("/authors/not-a-valid-id");

    expect(response.statusCode).toBe(500);
  });

});