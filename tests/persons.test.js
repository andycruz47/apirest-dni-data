import request from "supertest";
import app from "../src/app";
import { pool } from "../src/db";

describe("persons Routes", () => {
  it("should respond a list of persons", async () => {
    const res = await request(app).get("/api/persons");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          salary: expect.any(Number),
        }),
      ])
    );
  });

  it("should create a new person", async () => {
    const res = await request(app).post("/api/persons").send({
      name: "John Doe",
      salary: 1000,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: "John Doe",
        salary: 1000,
      })
    );
  });

  it("should get an person by id", async () => {
    const res = await request(app).get("/api/person/firstname/david/lastname/aguilar");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: 1,
        name: expect.any(String),
        salary: expect.any(Number),
      })
    );
  });

  it("should delete an person by id", async () => {
    const res = await request(app).delete("/api/persons/1");
    expect(res.statusCode).toEqual(204);
  });

  afterAll(async () => {
    await pool.end();
  });
});
