const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminAuthMiddleware = require("../middleware/adminAuth.js");

router.post("/login", adminController.handleAdminLogin)
router.get("/verify-admin-token", adminController.verifyAdminToken)
router.post("/logout", adminController.logoutAdmin)
router.put("/change-password",adminController.changePassword)

router.get("/blocks", adminAuthMiddleware.adminAuthorizationAPI, adminController.getBlocks);
router.post("/building", adminAuthMiddleware.adminAuthorizationAPI, adminController.addNewBuilding);
router.get("/building", adminAuthMiddleware.adminAuthorizationAPI, adminController.getBuilding);
router.delete("/building/:_id", adminAuthMiddleware.adminAuthorizationAPI, adminController.deleteBuilding);
router.get("/building/:block_id", adminAuthMiddleware.adminAuthorizationAPI, adminController.getBuildingById);

router.post("/flats", adminAuthMiddleware.adminAuthorizationAPI, adminController.handleAddFlats);
router.get("/flats", adminAuthMiddleware.adminAuthorizationAPI, adminController.getFlats)
router.delete("/flats/:_id", adminAuthMiddleware.adminAuthorizationAPI, adminController.deleteFlat)
router.put("/flats/:_id", adminAuthMiddleware.adminAuthorizationAPI, adminController.editFlat)

router.get("/flats/:building_id", adminAuthMiddleware.adminAuthorizationAPI, adminController.getFlatById);
router.post("/residents", adminAuthMiddleware.adminAuthorizationAPI, adminController.addResident);
router.get("/residents", adminAuthMiddleware.adminAuthorizationAPI, adminController.getResidents);
router.put("/residents/:_id", adminAuthMiddleware.adminAuthorizationAPI, adminController.updateStatus);
router.put("/assign-flat/:_id", adminAuthMiddleware.adminAuthorizationAPI, adminController.assignFlats);

router.get("/complaint", adminAuthMiddleware.adminAuthorizationAPI, adminController.getComplaints);
router.post("/helper", adminAuthMiddleware.adminAuthorizationAPI, adminController.addHelper);
router.get("/helper", adminAuthMiddleware.adminAuthorizationAPI, adminController.getHelper);
router.delete("/helper/:_id", adminAuthMiddleware.adminAuthorizationAPI, adminController.deleteHelper);
router.get("/helper/:type", adminAuthMiddleware.adminAuthorizationAPI, adminController.getHelperByType);
router.put("/assign-helper", adminAuthMiddleware.adminAuthorizationAPI, adminController.assignHelper);
router.put("/close-complaint/:_id", adminAuthMiddleware.adminAuthorizationAPI, adminController.closeComplaint);

router.post("/guards", adminAuthMiddleware.adminAuthorizationAPI, adminController.addSGuard);
router.get("/guards", adminAuthMiddleware.adminAuthorizationAPI, adminController.getSGuard);
router.delete("/guards/:_id", adminAuthMiddleware.adminAuthorizationAPI, adminController.deleteGuard);
router.put("/guards/:_id", adminAuthMiddleware.adminAuthorizationAPI, adminController.guardStatus);
router.get("/stats", adminAuthMiddleware.adminAuthorizationAPI, adminController.getDashboardStats);

module.exports = router;