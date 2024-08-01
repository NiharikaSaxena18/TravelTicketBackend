import express from "express";
import {
  showPackages,
  showDetailPackages,
} from "../controllers/packageController.js";

const packageRouter = express.Router();

// sending data to server
packageRouter.get("/listings", showPackages);
packageRouter.get("/:id", showDetailPackages);

export default packageRouter;
