const jwt = require("jsonwebtoken");

const adminAuthorizationAPI = (req, res, next) => {
    // console.log(req.cookies);

    if (req.cookies.adminToken === undefined) {
        return res.json({
            error: true,
            message: "Unauthorized"
        });
    } else {
        // console.log(req.cookies.adminToken);

        const token = req.cookies.adminToken;
        const jwtSecret = process.env.ADMIN_JWT_SECRET_KEY;

        try {
            const data = jwt.verify(token, jwtSecret);
            req['adminData'] = data;
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
    // adminAuthorization: adminAuthorization,
    adminAuthorizationAPI: adminAuthorizationAPI
} 