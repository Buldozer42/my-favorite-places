import { Router } from "express";
import usersRouter from "./controllers/Users";
import addressesRouter from "./controllers/Addresses";

const apiRouter = Router();

// Route GET /hello qui renvoie "Bonjour !"
apiRouter.get("/hello", (req, res) => {
	res.send("Bonjour !");
});

apiRouter.use("/users", usersRouter);
apiRouter.use("/addresses", addressesRouter);

export default apiRouter;
