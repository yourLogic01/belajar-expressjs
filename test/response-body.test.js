import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send("<html><body>Hello World!</body></html>");
});

test("Test Response Body", async () => {
  const response = await request(app).get("/");
  expect(response.get("content-type")).toContain("text/html");
  expect(response.text).toBe("<html><body>Hello World!</body></html>");
});
