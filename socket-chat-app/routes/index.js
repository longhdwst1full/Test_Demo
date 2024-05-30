import { authRouter } from "./auth.js";


const routes = (app, io) => {

    app.use("/api/auth", authRouter)

};

export default routes;
