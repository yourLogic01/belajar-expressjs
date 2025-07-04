import express from "express";
import request from "supertest";

const app = express();

//app.use(express.static(__dirname + "/static"));
app.use("/static", express.static(__dirname + "/static"));

app.get("/", (req, res) => {
  res.send(`Hello response!`);
});
app.get("/contoh.txt", (req, res) => {
  res.send(`Hello response!`);
});

test("Test Static File", async () => {
  const response = await request(app).get("/");
  expect(response.text).toBe("Hello response!");
});
test("Test Static File /contoh.txt", async () => {
  const response = await request(app).get("/contoh.txt");
  expect(response.text).toBe("Hello response!");
});
test("Test Static File contoh.txt", async () => {
  const response = await request(app).get("/static/contoh.txt");
  expect(response.text).toContain("ini contoh text");
});
