import express from "express";
import cors from "cors";
// import ViteExpress from "vite-express";

const app = express();

app.use(cors());

app.get("/message", (_, res) => {
  res.send("Hello from express!");
});

// ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
app.listen(3000, () => console.log("Server is listening..."));
