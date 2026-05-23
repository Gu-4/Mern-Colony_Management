const jwt = require("jsonwebtoken");

const guardAuthorizationAPI = (req, res, next) => {
    // console.log(req.cookies);

    if (req.cookies.guardToken === undefined) {
        return res.json({
            error: true,
            message: "Unauthorized"
        });
    } else {
        // console.log(req.cookies.guardToken);

        const token = req.cookies.guardToken;
        const jwtSecret = process.env.GUARD_JWT_SECRET_KEY;

        try {
            const data = jwt.verify(token, jwtSecret);
            req['guardData'] = data;
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
    guardAuthorizationAPI: guardAuthorizationAPI
} 