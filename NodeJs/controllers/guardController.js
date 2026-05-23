require("dotenv").config();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const Security = require("../models/Security.js");
const Visitor = require("../models/Visitor.js");
const Vehicle = require("../models/Vehicle.js")

const handleGuardLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const document = await Security.findOne({ email, password });
        if (!document) {
            return res.json({
                error: true,
                message: "Invalid credentials"
            });
        }
        if (document.status === "Inactive") {
            return res.json({
                error: true,
                message: "Inactive Resident"
            }
            )
        } else {
            const payload = {
                _id: document._id,
                name: document.name,
                email: document.email,
            };

            const jwtSecret = process.env.GUARD_JWT_SECRET_KEY;
            const token = jwt.sign(payload, jwtSecret, { expiresIn: "1d" });

            res.cookie("guardToken", token);
            return res.json({
                error: false,
                message: "Logged in successfully",
                data: payload
            });
        }
    }
    catch (error) {
        res.json({
            error: true,
            message: error.message
        });
    }
}

async function verifyGuardToken(req, res) {

    if (!req.cookies.guardToken) {
        return res.json({
            error: true,
            message: 'No guard token found'
        });
    }
    try {
        // 1. Token
        const token = req.cookies.guardToken;

        // 2. Secret Key
        const secret = process.env.GUARD_JWT_SECRET_KEY;

        const data = jwt.verify(token, secret);

        return res.json({
            error: false,
            message: 'Token is valid',
            data: data
        });

    } catch (error) {
        return res.json({
            error: true,
            message: error.message
        });
    }
}

const logoutGuard = (req, res) => {
    res.clearCookie("guardToken");
    return res.json({
        error: false,
        message: "Logged out successfully"
    });
};

const changePassword = async (req, res) => {
    if (!req.cookies.guardToken) {
        res.json({
            error: true,
            message: "Unauthorized Access"
        })
    } else {
        try {
            const token = req.cookies.guardToken;
            const jwtSecret = process.env.GUARD_JWT_SECRET_KEY;
            const payload = jwt.verify(token, jwtSecret);

            const _id=payload._id;
            const document=await Security.findOne({_id:_id, password:req.body.current_password});
            if(!document){
                res.json({
                    error:true,
                    message:"Current Password is Incorrect"
                })
            }else{
                await Security.updateOne({_id:_id},{password:req.body.new_password});
                res.json({
                    error:false,
                    message:"Password updated Successfully"
                });
            }

        } catch (error) {
            res.json({
                error: true,
                message: error.message
            });
        }
    }
}

const getTodayVisitors = async (req, res) => {
    try {

        // Start of today
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        // End of today
        const end = new Date();
        end.setHours(23, 59, 59, 999);

        // Fetch only today's visitors
        const visitors = await Visitor.aggregate([
            {
                $match: {
                    date: {
                        $gte: start,
                        $lte: end
                    }
                }
            },
            {
                $lookup: {
                    from: "flats",
                    localField: "flat_id",
                    foreignField: "_id",
                    as: "flatDetails"
                }
            },

            {
                $unwind: {
                    path: "$flatDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    mobile: 1,
                    gender: 1,
                    date: 1,
                    status: 1,
                    flat_no: "$flatDetails.flat_no"
                }
            },
            {
                $sort: { date: -1 }
            }

        ]);

        res.json({
            error: false,
            visitors
        });

    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });
    }
};

const getVisitorDetails = async (req, res) => {
    try {
        const visitors = await Visitor.aggregate([
            {
                $lookup: {
                    from: "flats",
                    localField: "flat_id",
                    foreignField: "_id",
                    as: "flatDetails"
                }
            },

            {
                $unwind: {
                    path: "$flatDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    mobile: 1,
                    gender: 1,
                    date: 1,
                    status: 1,
                    flat_no: "$flatDetails.flat_no"
                }
            }

        ]);
        res.json({
            error: false,
            visitors: visitors
        });
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });
    }
};

const updateVisitorStatus = async (req, res) => {
    try {
        const { _id } = req.params;
        await Visitor.findByIdAndUpdate({ _id: _id }, {
            $set: {
                status: "Visited",
            }
        });

        res.json({
            error: false,
            message: `Visitor status updated successfully`,
        });

    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });
    }
};

const getVehicleDetails = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json({
            error: false,
            vehicles: vehicles
        });
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });
    }
};

const assignParking = async (req, res) => {
    try {
        const { vehicle_id, parking_no } = req.body;
         const pattern = /^[A-Z]{1,3}-\d{1,4}$/;
         if (!pattern.test(parking_no)) {
            return res.json({
                error: true,
                message: "Invalid format. Use like B-153 or EV-12"
            });
        }

        if (!vehicle_id || !parking_no) {
            return res.json({
                error: true,
                message: "Vehicle ID and Parking Number are required"
            });
        }
        const existing = await Vehicle.findOne({ parking_no });

        if (existing) {
            return res.json({
                error: true,
                message: "Parking slot already assigned"
            });
        }

        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            vehicle_id,
            {
                parking_no: parking_no
            },
            {
                returnDocument: 'after'
            }
        );

        if (!updatedVehicle) {
            return res.json({
                error: true,
                message: "Vehicle not found"
            });
        }

        return res.json({
            error: false,
            message: "Parking assigned successfully",
            vehicle: updatedVehicle
        });

    } catch (error) {
        return res.json({
            error: true,
            message: "Internal Server Error"
        });
    }
}

const getDashboardStats = async (req, res) => {
    try {
        const visitorCount = await Visitor.countDocuments();
        const vehicleCount = await Vehicle.countDocuments();

        return res.json({
            error: false,
            visitors: visitorCount,
            vehicles: vehicleCount
        });

    } catch (error) {
        return res.json({
            error: true,
            message: error.message
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const guard = await Security.findById(req.params._id).select(
            "name email password mobile pan aadhaar address status"
        );
        res.json({
            error: false,
            guard
        });

    } catch (error) {
        resjson({
            error: true,
            message: error.message
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { _id } = req.params;
        const { name, email, mobile, pan, aadhaar, address } = req.body;
        const updatedGuard = await Security.findByIdAndUpdate(_id, { name, email, mobile, pan, aadhaar, address },
            {
                returnDocument: 'after'
            }
        );

        res.json({
            error: false,
            message: "Profile updated successfully",
            guard: updatedGuard
        });

    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });
    }
};

module.exports = {
    handleGuardLogin: handleGuardLogin,
    verifyGuardToken: verifyGuardToken,
    logoutGuard: logoutGuard,
    changePassword:changePassword,
    getTodayVisitors: getTodayVisitors,
    updateVisitorStatus: updateVisitorStatus,
    getVisitorDetails: getVisitorDetails,
    getVehicleDetails: getVehicleDetails,
    assignParking: assignParking,
    getDashboardStats: getDashboardStats,
    getProfile: getProfile,
    updateProfile: updateProfile
}