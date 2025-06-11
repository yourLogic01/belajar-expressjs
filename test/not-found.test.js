import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.send(`Hello response!`);
});

app.use((req, res, next) => {
  res.status(404).send("Not Found cuy");
});

test("Test Response", async () => {
  const response = await request(app).get("/");
  expect(response.text).toBe("Hello response!");
});
test("Test Response not found", async () => {
  const response = await request(app).get("/404");
  expect(response.text).toBe("Not Found cuy");
});
