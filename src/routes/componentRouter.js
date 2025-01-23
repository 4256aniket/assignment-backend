import express from "express";
import {
  createComponent,
  deleteComponent,
  filterComponent,
  getAllComponents,
  getComponent,
  searchComponents,
} from "../controllers/controller.js";
const componentRouter = express.Router();

componentRouter.route("/search").get(searchComponents);
componentRouter.route("/get-all").get(getAllComponents);
componentRouter.route("/:id").get(getComponent);
componentRouter.route("/filter").post(filterComponent);
componentRouter.route("/create-component").post(createComponent);
componentRouter.route("/delete/:id").delete(deleteComponent);

export default componentRouter;
