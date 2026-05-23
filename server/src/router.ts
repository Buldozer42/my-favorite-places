import { Router } from "express";
import usersRouter from "./controllers/Users";
import addressesRouter from "./controllers/Addresses";

const apiRouter = Router();

// Route GET /hello qui renvoie "Hello !"
apiRouter.get("/hello", (req, res) => {
	res.send("Hello !");
});

apiRouter.use("/users", usersRouter);
apiRouter.use("/addresses", addressesRouter);

export default apiRouter;
