import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.set({
    "X-Powered-By": "Asyifa Maulana",
    "X-Author": "Asyifa Maulana",
  });
  res.send(`Hello response!`);
});

test("Test Response Header", async () => {
  const response = await request(app).get("/");
  expect(response.text).toBe("Hello response!");
  expect(response.get("x-powered-by")).toBe("Asyifa Maulana");
  expect(response.get("x-author")).toBe("Asyifa Maulana");
});
