const express = require("express");
const router = express.Router();
const guardController = require("../controllers/guardController");
const guardAuthMiddleware = require("../middleware/guardAuth.js");

router.post("/login", guardController.handleGuardLogin)
router.get("/verify-guard-token", guardController.verifyGuardToken)
router.post("/logout", guardController.logoutGuard)
router.put("/change-password",guardController.changePassword)


router.get("/today-visitor", guardAuthMiddleware.guardAuthorizationAPI, guardController.getTodayVisitors);
router.get("/visitor", guardAuthMiddleware.guardAuthorizationAPI, guardController.getVisitorDetails)
router.put("/visitor/:_id", guardAuthMiddleware.guardAuthorizationAPI, guardController.updateVisitorStatus)

router.get("/vehicle", guardAuthMiddleware.guardAuthorizationAPI, guardController.getVehicleDetails)
router.put("/assign-parking", guardAuthMiddleware.guardAuthorizationAPI, guardController.assignParking);

router.get("/stats", guardAuthMiddleware.guardAuthorizationAPI, guardController.getDashboardStats);
router.get("/profile/:_id",guardAuthMiddleware.guardAuthorizationAPI, guardController.getProfile);
router.put("/profile/:_id",guardAuthMiddleware.guardAuthorizationAPI, guardController.updateProfile);


module.exports = router;