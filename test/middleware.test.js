import express from "express";
import request from "supertest";

const logger = (req, res, next) => {
  console.info(`Receive Request: ${req.method} ${req.originalUrl}`);
  next();
};

const addPoweredHeader = (req, res, next) => {
  res.set("X-Powered-By", "Asyifa Maulana");
  next();
};

const apiKeyMiddleware = (req, res, next) => {
  if (req.query.apiKey) {
    next();
  } else {
    res.status(401).end();
  }
};

const requestTimeMiddleware = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

const app = express();

app.use(logger);
app.use(apiKeyMiddleware);
app.use(addPoweredHeader);
app.use(requestTimeMiddleware);

app.get("/", (req, res) => {
  res.send(`Hello response!`);
});
app.get("/time", (req, res) => {
  res.send(`Hello, Today is ${req.requestTime}!`);
});

test("Test Response Middleware", async () => {
  const response = await request(app).get("/").query({ apiKey: "123" });
  expect(response.get("x-powered-by")).toBe("Asyifa Maulana");
  expect(response.text).toBe("Hello response!");
});
test("Test Response Middleware Unauthorized", async () => {
  const response = await request(app).get("/");
  expect(response.status).toBe(401);
});
test("Test Response Middleware Time", async () => {
  const response = await request(app).get("/time").query({ apiKey: "123" });
  expect(response.get("x-powered-by")).toBe("Asyifa Maulana");
  expect(response.text).toContain("Today is");
});
