import express from "express";
import request from "supertest";

const errorMiddleware = (err, req, res, next) => {
  res.status(500).send(`Terjadi error: ${err.message}`);
};

const app = express();

app.get("/", (req, res) => {
  throw new Error("Ups");
});

app.use(errorMiddleware);
test("Test Response Error", async () => {
  const response = await request(app).get("/");
  expect(response.status).toBe(500);
  expect(response.text).toBe("Terjadi error: Ups");
});
