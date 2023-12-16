import { Application } from "express";
import homeRoutes from "./home.routes";
import statusRoutes from "./status.routes";
import usersRoutes from "./users.routes";
import authRoutes from "./auth.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api", statusRoutes);
    app.use("/api/users", usersRoutes);
    app.use('/api/auth', authRoutes);
  }
}