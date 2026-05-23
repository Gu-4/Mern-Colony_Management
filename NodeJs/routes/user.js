const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const userAuthMiddleware= require("../middleware/userAuth.js");


router.post("/login", userController.handleUserLogin)
router.get("/verify-user-token", userController.verifyUserToken)
router.post("/logout", userController.logoutUser)
router.put("/change-password",userController.changePassword)


router.post("/complaint",userAuthMiddleware.userAuthorizationAPI, userController.submitComplaint)
router.get("/complaint",userAuthMiddleware.userAuthorizationAPI, userController.getComplaints)

router.post("/visitor",userAuthMiddleware.userAuthorizationAPI, userController.addVisitor)
router.get("/visitor",userAuthMiddleware.userAuthorizationAPI, userController.getVisitorDetails)
router.delete("/visitor/:_id",userAuthMiddleware.userAuthorizationAPI, userController.deleteVisitor)

router.get("/dashboard",userAuthMiddleware.userAuthorizationAPI, userController.getUserDashboard);
router.get("/rent/:flat_id",userAuthMiddleware.userAuthorizationAPI, userController.getRentDetails);
router.put("/pay_status", userAuthMiddleware.userAuthorizationAPI,userController.updatePayStatus);
router.get("/payments", userAuthMiddleware.userAuthorizationAPI, userController.getPayHistory);
router.get("/my-flat",userAuthMiddleware.userAuthorizationAPI, userController.getMyFlat);

router.post("/vehicle",userAuthMiddleware.userAuthorizationAPI, userController.addVehicle);
router.get("/profile", userAuthMiddleware.userAuthorizationAPI, userController.getUserProfile);
router.get("/vehicle",userAuthMiddleware.userAuthorizationAPI, userController.getVehicle);
router.delete("/vehicle/:_id",userAuthMiddleware.userAuthorizationAPI, userController.deleteVehicle);
router.get("/profile/:_id",userAuthMiddleware.userAuthorizationAPI, userController.getProfile);
router.put("/profile/:_id",userAuthMiddleware.userAuthorizationAPI, userController.updateProfile);


module.exports= router;