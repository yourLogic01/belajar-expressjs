import express from "express";
import request from "supertest";

const app = express();

app.get("/products/:id", (req, res) => {
  res.send(`Product: ${req.params.id}`);
});
app.get("/categories/:id(\\d+)", (req, res) => {
  res.send(`Category: ${req.params.id}`);
});

test("Test Route Params", async () => {
  let response = await request(app).get("/products/maulana");
  expect(response.text).toBe(`Product: maulana`);

  response = await request(app).get("/categories/123");
  expect(response.text).toBe(`Category: 123`);

  response = await request(app).get("/categories/salah");
  expect(response.status).toBe(404);
});
