import express from "express";
import diagnoseService from "../services/diagnoseService";

const diagnoseRouter = express.Router();

diagnoseRouter.get("/", (_req, res) => {
  res.send(diagnoseService.getDiagnosis());
});

diagnoseRouter.post("/", (_req, res) => {
  res.send("Saving a diagnosis!");
});

export default diagnoseRouter;
