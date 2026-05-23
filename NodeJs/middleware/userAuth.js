const jwt = require("jsonwebtoken");
const userAuthorizationAPI = (req, res, next) => {
    if (req.cookies.userToken === undefined) {
        return res.json({ error: true, message: "Unauthorized" });
    } else {
        const token = req.cookies.userToken;
        const jwtSecret = process.env.USER_JWT_SECRET_KEY;
        try {
            const data = jwt.verify(token, jwtSecret);
            req['userData'] = data;
            next();
        }
        catch (error) {
            return res.json({
                error: true,
                message: "Token expired or invalid"
            });
        }
    }
}
module.exports = {
    // userAuthorization: userAuthorization,
    userAuthorizationAPI: userAuthorizationAPI
} 