import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/maulana", (req, res) => {
  res.send("Hello Maulana!");
});

app.listen(3000, () => {
  console.info("Server running on port 3000");
});
