require("dotenv").config();
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Resident = require("../models/Resident.js");
const Complaint = require("../models/Complaint.js");
const Visitor = require("../models/Visitor.js");
const Flat = require("../models/Flat.js");
const Vehicle = require("../models/Vehicle.js");

const handleUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const document = await Resident.findOne({ email, password });
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

            const jwtSecret = process.env.USER_JWT_SECRET_KEY;
            const token = jwt.sign(payload, jwtSecret, { expiresIn: "1D" });

            res.cookie("userToken", token);
            console.log(res.cookie.userToken)
            return res.json({
                error: false,
                message: "Logged in successfully",
                data: payload
            });

        }
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });
    }
}

async function verifyUserToken(req, res) {

    if (!req.cookies.userToken) {
        return res.json({
            error: true,
            message: 'No user token found'
        });
    }
    try {
        // 1. Token
        const token = req.cookies.userToken;

        // 2. Secret Key
        const secret = process.env.USER_JWT_SECRET_KEY;

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
const logoutUser = (req, res) => {
    res.clearCookie("userToken");
    return res.json({
        error: false,
        message: "Logged out successfully"
    });
};

const changePassword = async (req, res) => {
    if (!req.cookies.userToken) {
        res.json({
            error: true,
            message: "Unauthorized Access"
        })
    } else {
        try {
            const token = req.cookies.userToken;
            const jwtSecret = process.env.USER_JWT_SECRET_KEY;
            const payload = jwt.verify(token, jwtSecret);

            const _id=payload._id;
            const document=await Resident.findOne({_id:_id, password:req.body.current_password});
            if(!document){
                res.json({
                    error:true,
                    message:"Current Password is Incorrect"
                })
            }else{
                await Resident.updateOne({_id:_id},{password:req.body.new_password});
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

const submitComplaint = async (req, res) => {
    try {
        const { type, title, description } = req.body;
        const resident = await Resident.findById(req.userData._id);
        const flat_id = resident.flat_id;
        const resident_id = resident._id;
        const complaint = await Complaint.create({ type, title, description, status: "Open", flat_id, resident_id });
        res.json({
            error: false,
            message: "Complaint Registered successfully",
            data: complaint
        });
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        })
    }
}

const getComplaints = async (req, res) => {
    try {
        const complaint = await Complaint.find({ resident_id: req.userData._id });
        res.json({
            error: false,
            complaint: complaint
        });
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });
    }
}

const addVisitor = async (req, res) => {
    try {
        const { name, mobile, gender, email, date } = req.body;
        const resident = await Resident.findById(req.userData._id);
        const flat_id = resident.flat_id;
        const resident_id = resident._id;
        const visitors = await Visitor.create({ name, mobile, gender, email, date, flat_id, resident_id });
        res.json({
            error: false,
            message: "Visitor added successfully",
            data: visitors
        });
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });
    }
}

const getVisitorDetails = async (req, res) => {
    try {
        const visitors = await Visitor.find({ resident_id: req.userData._id });
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
}

const deleteVisitor = async (req, res) => {
    try {
        const { _id } = req.params
        const visitor = await Visitor.findById(_id);
        if (visitor.status === "Pending") {
            await Visitor.findByIdAndDelete(_id);
            res.json({
                error: false,
                message: "Visitor deleted successfully"
            });
        }

    } catch (error) {
        res.json({
            error: true,
            message: error.message
        })
    }
}

const getUserDashboard = async (req, res) => {
    try {

        const userId = req.userData._id;

        const resident = await Resident.findById(userId)
            .select("name email payment_status flat_id");
        const flat = await Flat.findById(resident.flat_id);
        const visitors = await Visitor.countDocuments({ resident_id: userId });
        const vehicles = await Vehicle.countDocuments({ resident_id: userId });
        const complaints = await Complaint.countDocuments({ resident_id: userId });

        res.json({
            error: false,
            resident: {
                ...resident._doc,
                flat_no: flat?.flat_no || null
            },
            visitors,
            vehicles,
            complaints,

        });

    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });
    }
};

const getRentDetails = async (req, res) => {
    try {
        const { flat_id } = req.params;
        const flat = await Flat.findById(flat_id);
        res.json({
            error: false,
            rent: flat.rent,
            deposit: flat.deposit
        });

    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });
    }
};

const updatePayStatus = async (req, res) => {
    try {

        const userId = req.userData._id;
        const { payment_id } = req.body;

        const updated = await Resident.findByIdAndUpdate(
            userId,
            {
                payment_status: "Paid",
                payment_id: payment_id
            },
            { returnDocument: 'after' }
        );

        res.json({
            error: false,
            message: "Payment status updated successfully",
            resident: updated
        });
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });
    }
}

const getPayHistory = async (req, res) => {
    try {
        const userId = req.userData._id;

        const resident = await Resident.findById(userId);
        const flat = await Flat.findById(resident.flat_id);

        if (!resident.payment_id) {
            return res.json({
                error: false,
                payments: [
                    {
                        message: "No payment done yet",
                        rent: flat.rent,
                        deposit: flat.deposit,
                        amount: Number(flat.rent) + Number(flat.deposit),
                        payment_status: resident.payment_status,
                        createdAt: resident.createdAt
                    }
                ]
            });
        }

        return res.json({
            error: false,
            payments: [
                {
                    _id: resident._id,
                    rent: flat.rent,
                    deposit: flat.deposit,
                    amount: Number(flat.rent) + Number(flat.deposit),
                    payment_id: resident.payment_id,
                    payment_status: resident.payment_status,
                    createdAt: resident.createdAt
                }
            ]
        });

    } catch (err) {
        return res.json({
            error: true,
            message: err.message
        });
    }
}

const getMyFlat = async (req, res) => {
    try {
        const userId = req.userData._id;

        const resident = await Resident.findById(userId);
        const flat = await Flat.findById(resident.flat_id);

        if (!flat) {
            return res.json({
                error: true,
                message: "Flat not found"
            });
        }

        return res.json({
            error: false,
            flat: {
                flat_no: flat.flat_no,
                flat_type: flat.flat_type,
                floor_no: flat.floor_no,
                rent: flat.rent,
                deposit: flat.deposit,
                furnish: flat.furnish,
                status: flat.status,
                flat: flat.flat
            },
            resident: {
                name: resident.name,
                email: resident.email,
                payment_status: resident.payment_status,
                flat: resident.flat
            }
        });

    } catch (err) {
        return res.json({
            error: true,
            message: err.message
        });
    }
};

const addVehicle = async (req, res) => {
    try {
        const { name, mobile, vehicle_no, model, parking_no } = req.body;
        const resident = await Resident.findById(req.userData._id);
        const resident_id = resident._id;
        const vehicles = await Vehicle.create({ name, mobile, vehicle_no, model, parking_no, resident_id });
        res.json({
            error: false,
            message: "Vehicle added successfully",
            data: vehicles
        });
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });
    }
}

const getVehicle = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ resident_id: req.userData._id });
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
}

const deleteVehicle = async (req, res) => {
    try {
        const { _id } = req.params
        const vehicle = await Vehicle.findById(_id);
        await Vehicle.findByIdAndDelete(_id);
        res.json({
            error: false,
            message: "Vehicle deleted successfully"
        });

    } catch (error) {
        res.json({
            error: true,
            message: error.message
        })
    }
}

const getUserProfile = async (req, res) => {
    try {
        const userId = req.userData._id;
        const user = await Resident.findById(userId)
            .select("-password");

        if (!user) {
            return res.json({
                error: true,
                message: "User not found"
            });
        }

        return res.json({
            error: false,
            user
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
        const resident = await Resident.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.params._id)
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
                $lookup: {
                    from: "buildings",
                    localField: "flatDetails.building_id",
                    foreignField: "_id",
                    as: "buildingDetails"
                }
            },

            {
                $unwind: {
                    path: "$buildingDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "blocks",
                    localField: "buildingDetails.block_id",
                    foreignField: "_id",
                    as: "blockDetails"
                }
            },

            {
                $unwind: {
                    path: "$blockDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id:1,
                    name: 1,
                    email: 1,
                    password: 1,
                    mobile: 1,
                    status: 1,
                    flat_no: "$flatDetails.flat_no",
                    floor_no: "$flatDetails.floor_no",
                    flat_type: "$flatDetails.flat_type",
                    building_name: "$buildingDetails.building_name",
                    block_name: "$blockDetails.name"
                }
            }
        ]);

        const vehicles = await Vehicle.find({
            resident_id: req.params._id
        });

        res.status(200).json({
            error: false,
            resident: resident[0],
            vehicles
        });

    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { _id } = req.params;
        const {name,email, mobile} = req.body;

        const updatedResident = await Resident.findByIdAndUpdate(_id,{name,email,mobile},
            {
                returnDocument: 'after'
            }
        );

        res.json({
            error: false,
            message: "Profile updated successfully",
            resident: updatedResident
        });

    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });
    }
}

module.exports = {
    handleUserLogin: handleUserLogin,
    verifyUserToken: verifyUserToken,
    logoutUser: logoutUser,
    changePassword:changePassword,
    submitComplaint: submitComplaint,
    getComplaints: getComplaints,
    addVisitor: addVisitor,
    getVisitorDetails: getVisitorDetails,
    deleteVisitor: deleteVisitor,
    getUserDashboard: getUserDashboard,
    getRentDetails: getRentDetails,
    updatePayStatus: updatePayStatus,
    getPayHistory: getPayHistory,
    getMyFlat: getMyFlat,
    addVehicle: addVehicle,
    getUserProfile: getUserProfile,
    getVehicle: getVehicle,
    deleteVehicle: deleteVehicle,
    getProfile: getProfile,
    updateProfile: updateProfile
}
