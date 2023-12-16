import { Router } from "express";

class StatusRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/status", (req, res) => {
        res.send('status').status(200);
    });
  }
}

export default new StatusRoutes().router;