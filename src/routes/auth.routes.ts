import { Router } from "express";
import AuthController from "../controllers/auth.controller";

class AuthRoutes {
  router = Router();
  auth = new AuthController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/login", this.auth.login);
  }
}

export default new AuthRoutes().router;