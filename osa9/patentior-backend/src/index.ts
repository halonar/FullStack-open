import express from "express";
import cors from "cors";
//const cors = require("cors");
//import cors = require("cors");
import diagnoseRouter from "./routes/diagnoseRouter";
import patientRouter from "./routes/patientRouter";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnosis", diagnoseRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
