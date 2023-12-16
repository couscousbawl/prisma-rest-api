import { Router } from "express";
//import { welcome } from "../controllers/home.controller";

class HomeRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", (req, res) => {
        res.send('Welcome to Express & TypeScript API Server').status(200);
    });
  }
}

export default new HomeRoutes().router;