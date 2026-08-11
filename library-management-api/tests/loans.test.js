import request from "supertest";
import mongoose from "mongoose";
import app from "../server.js";

describe("Loans GET endpoints", () => {

  test("GET /loans returns 200", async () => {
    const response = await request(app)
      .get("/loans");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });


  test("GET /loans/:id returns 404 for nonexistent loan", async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const response = await request(app)
      .get(`/loans/${fakeId}`);

    expect(response.statusCode).toBe(404);
  });


  test("GET /loans/:id returns 500 for invalid ID", async () => {
    const response = await request(app)
      .get("/loans/not-a-valid-id");

    expect(response.statusCode).toBe(500);
  });

});