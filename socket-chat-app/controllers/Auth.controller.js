import AuthServices from "../services/auth.js";
import userServices from "../services/userServices.js";

class AuthController {
  async login(req, res, next) {
    const { username, password } = req.body;
    const source = req.headers["user-agent"];
    console.log(source)
    try {
      const { token, refreshToken } = await AuthServices.login(
        username,
        password,
        source
      );
      res.json({ token, refreshToken });
    } catch (error) {
      console.log(error, "::")
      next(error);
    }
  }
  async regiseterUser(req, res, next) {
    try {
      const data = await AuthServices.registerUser(req.body);

      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  // [GET]  /users/:username
  async getUserInfo(req, res, next) {
    const { username } = req.params;

    try {
      const user = await userServices.getUserSummaryInfo(username);

      return res.json(user);
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
