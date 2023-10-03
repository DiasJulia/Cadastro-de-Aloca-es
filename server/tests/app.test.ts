import request from "supertest";
import { app } from "../src";

describe("API Endpoints", () => {
  it("should ping", async () => {
    const res = await request(app).get("/api/ping");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Pong!");
  });
});
