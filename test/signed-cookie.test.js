import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser("SECRET"));
app.use(express.json());

app.get("/", (req, res) => {
  const name = req.signedCookies["Login"];
  res.send(`Hello ${name}`);
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  res.cookie("Login", name, { path: "/", signed: true });
  res.send(`Hello ${name}`);
});

test("Test Cookie Read", async () => {
  const response = await request(app).get("/").set("Cookie", "Login=s%3AMaulana.LwemWzY8uS57w3tEBqhBQKTooRfXAq4WiNogHOspAC8; Path=/");
  expect(response.text).toBe("Hello Maulana");
});
test("Test Cookie Write", async () => {
  const response = await request(app).post("/login").send({ name: "Maulana" });
  console.info(response.get("Set-Cookie"));
  expect(response.get("Set-Cookie").toString()).toContain("Maulana");
  expect(response.text).toBe("Hello Maulana");
});
