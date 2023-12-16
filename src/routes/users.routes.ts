import { Router } from "express";
import UserController from "../controllers/user.controller";

class UsersRoutes {
  router = Router();
  user = new UserController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post('/create', this.user.create); // create a new user
    this.router.get('/:id', this.user.getUserById); // get a user by ID
    this.router.delete('/:id', this.user.deleteUser); // delete a specific user
    this.router.put('/:id', this.user.update); // update a specific user
    this.router.get('', this.user.getAllUsers); // get all users
  }
}

export default new UsersRoutes().router;