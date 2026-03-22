import request from "supertest";
import app from "../app";
import * as authUtils from "../utils/getUserFromRequest";

describe("API routes", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns 404 on unknown API route", async () => {
    const response = await request(app).get("/api/unknown-route");

    expect(response.status).toBe(404);
  });

  it("validates required fields on user creation", async () => {
    const response = await request(app).post("/api/users").send({
      email: "john@example.com",
    });

    // Error targeting
    expect(response.status).toBe(501);
    expect(response.body).toEqual({
      message: "email and password are required",
    });
  });

  it("validates required fields on token creation", async () => {
    const response = await request(app).post("/api/users/tokens").send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "email and password are required",
    });
  });

  it("forbids access to /users/me without auth", async () => {
    const response = await request(app).get("/api/users/me");

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ message: "access denied" });
  });

  it("validates radius on addresses search endpoint", async () => {
    jest
      .spyOn(authUtils, "getUserFromRequest")
      .mockResolvedValue({ id: 1 } as any);

    const response = await request(app).post("/api/addresses/searches").send({
      from: { lat: 48.8566, lng: 2.3522 },
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "radius is required, must be a positive number",
    });
  });
});
