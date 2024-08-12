import express from "express";
import {
  showPackages,
  showDetailPackages,
  searchEngine,
} from "../controllers/packageController.js";

const packageRouter = express.Router();

// sending data to server
packageRouter.get("/listings", showPackages);
packageRouter.get("/:id", showDetailPackages);
packageRouter.post("/filter", searchEngine);

export default packageRouter;
