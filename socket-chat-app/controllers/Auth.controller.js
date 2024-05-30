import AuthServices from "../services/auth.js";


class AuthController {
    async login(req, res, next) {
        const { username, password } = req.body;
        const source = req.headers['user-agent'];
        try {
            const { token, refreshToken } = await AuthServices.login(
                username,
                password,
                source
            );
            res.json({ token, refreshToken });

        } catch (error) {
            next(err);
        }

    }
}

export default new AuthController()