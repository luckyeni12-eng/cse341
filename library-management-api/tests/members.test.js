import request from "supertest";
import mongoose from "mongoose";
import app from "../server.js";

describe("Members GET endpoints", () => {

  test("GET /members returns 200", async () => {
    const response = await request(app)
      .get("/members");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });


  test("GET /members/:id returns 404 for nonexistent member", async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const response = await request(app)
      .get(`/members/${fakeId}`);

    expect(response.statusCode).toBe(404);
  });


  test("GET /members/:id returns 500 for invalid ID", async () => {
    const response = await request(app)
      .get("/members/not-a-valid-id");

    expect(response.statusCode).toBe(500);
  });

});