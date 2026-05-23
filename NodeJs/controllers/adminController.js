require("dotenv").config();
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const db = require("../config/connection.js");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const complaintToHelperMap = require("../utils/helperMapping");
const Admin = require("../models/Admin.js");
const Block = require("../models/Block.js");
const Building = require("../models/Building.js");
const Flat = require("../models/Flat.js");
const Resident = require("../models/Resident.js");
const Complaint = require("../models/Complaint.js");
const Helper = require("../models/Helper.js");
const Security = require("../models/Security.js");
const Vehicle = require("../models/Vehicle.js");



const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
function generatePassword(length = 8) {
    let password = crypto.randomBytes(length)
        .toString('base64')          // convert bytes to base64 string
        .replace(/[^a-zA-Z0-9]/g, '') // remove non-alphanumeric chars
        .slice(0, length);           // trim to exact length
    return password;
}

const handleAdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const document = await Admin.findOne({ email, password });
        if (!document) {
            return res.json({
                error: true,
                message: "Invalid credentials"
            });
        } else {
            const payload = {
                _id: document._id,
                name: document.name,
                email: document.email,
            };

            const jwtSecret = process.env.ADMIN_JWT_SECRET_KEY;
            const token = jwt.sign(payload, jwtSecret, { expiresIn: "1d" });

            res.cookie("adminToken", token);
            return res.json({
                error: false,
                message: "Logged in successfully"
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

async function verifyAdminToken(req, res) {

    if (!req.cookies.adminToken) {
        return res.json({
            error: true,
            message: 'No admin token found'
        });
    }
    try {
        // 1. Token
        const token = req.cookies.adminToken;

        // 2. Secret Key
        const secret = process.env.ADMIN_JWT_SECRET_KEY;

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

const logoutAdmin = (req, res) => {
    res.clearCookie("adminToken");
    return res.json({
        error: false,
        message: "Logged out successfully"
    });
};

const changePassword = async (req, res) => {
    if (!req.cookies.adminToken) {
        res.json({
            error: true,
            message: "Unauthorized Access"
        })
    } else {
        try {
            const token = req.cookies.adminToken;
            const jwtSecret = process.env.ADMIN_JWT_SECRET_KEY;
            const payload = jwt.verify(token, jwtSecret);

            const _id=payload._id;
            const document=await Admin.findOne({_id:_id, password:req.body.current_password});
            if(!document){
                res.json({
                    error:true,
                    message:"Current Password is Incorrect"
                })
            }else{
                await Admin.updateOne({_id:_id},{password:req.body.new_password});
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

const getBlocks = async (req, res) => {
    try {
        const blocks = await Block.find();
        res.json({
            error: false,
            blocks: blocks
        });
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });

    }
}

const addNewBuilding = async (req, res) => {
    try {
        const { building_name, block_id } = req.body;

        const building = await Building.create({
            building_name,
            block_id
        });

        res.json({
            error: false,
            message: "Building added successfully",
            data: building
        });
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        })
    }
}

const getBuilding = async (req, res) => {
    try {
        // const buildings = await db.collection("buildings").find().sort({block_id:1}).toArray();
        const buildings = await Building.aggregate([
            {
                $lookup: {
                    from: "blocks",           // collection to join
                    localField: "block_id", // field in buildings
                    foreignField: "_id",    // field in block
                    as: "blockDetails"
                }
            },
            {
                $unwind: "$blockDetails" // convert array → object
            },
            {
                $project: {
                    _id: 1,
                    building_name: 1,
                    block_name: "$blockDetails.name"
                }
            },
            {
                $sort: { block_name: 1 }
            }]);

        res.json({
            error: false,
            buildings: buildings
        });
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });
    }
}

const deleteBuilding = async (req, res) => {
    try {
        const { _id } = req.params
        await Building.findByIdAndDelete(_id);
        res.json({
            error: false,
            message: "Building deleted successfully"
        });
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        })
    }
}

const getBuildingById = async (req, res) => {
    try {
        const { block_id } = req.params;
        const buildings = await Building.find({ block_id: block_id });
        res.json({
            error: false,
            buildings: buildings
        });
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });
    }
}

const handleAddFlats = async (req, res) => {
    try {
        const { building_id, flat_no, flat_type, floor_no, rent, deposit, furnish } = req.body;

        const flats = await Flat.create({ building_id, flat_no, flat_type, floor_no, rent, deposit, furnish, status: "Available" });
        res.json({
            error: false,
            message: "Flat added successfully",
            data: flats
        });
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        })
    }
}

const getFlats = async (req, res) => {
    try {
        const flats = await Flat.aggregate([
            {
                $lookup: {
                    from: "buildings",
                    localField: "building_id",
                    foreignField: "_id",
                    as: "buildingDetails"
                }
            },
            {
                $unwind: "$buildingDetails"
            },
            {
                $project: {
                    _id: 1,
                    building_name: "$buildingDetails.building_name",
                    flat_no: 1,
                    flat_type: 1,
                    floor_no: 1,
                    furnish: 1,
                    deposit: 1,
                    rent: 1,
                    status: 1
                }
            }
        ]);

        res.json({
            error: false,
            flats: flats
        });

    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });
    }
}

const deleteFlat = async (req, res) => {
    try {
        let { _id } = req.params;
        await Flat.findByIdAndDelete(_id);
        res.json({
            error: false,
            message: "Flats deleted successfully"
        });
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        })
    }
}

const editFlat = async (req, res) => {
    try {
        const { _id } = req.params;
        const { flat_type, floor_no, rent, deposit, furnish } = req.body;
        const updatedFlat = await Flat.findByIdAndUpdate(
            _id,
            {
                $set: { flat_type, floor_no, rent, deposit, furnish }
            },
            {
                returnDocument: 'after',      // returns updated document
                runValidators: true
            }
        );

        if (!updatedFlat) {
            return res.json({
                error: true,
                message: "Flat not found"
            });
        }
        res.json({
            error: false,
            message: "Flat Updated",
            data: updatedFlat
        })
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        })
    }
}

const getFlatById = async (req, res) => {
    try {
        let { building_id } = req.params;
        const flats = await Flat.find({ building_id, status: "Available" });
        res.json({
            error: false,
            flats: flats
        });
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });
    }
}

const addResident = async (req, res) => {
    try {
        const { flat_id, name, email, mobile, pan, aadhaar } = req.body;

        // Check if email is already taken
        const existingResident = await Resident.findOne({ email });
        if (existingResident) {
            return res.json({ error: true, message: "User is already registered" });
        }

        // Generate password
        const plainPassword = generatePassword(8); // 6–8 characters
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        // Save resident to DB
        const resident = new Resident({
            flat_id,
            name,
            email,
            password: plainPassword,
            mobile,
            pan,
            aadhaar,
            status: "Active",
            flat: "Pending"
        });

        await resident.save();

        // Send email to resident
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "🏠 Your Resident Portal Credentials",
            html: `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border-radius: 10px; overflow: hidden; box-shadow: 0 0 15px rgba(0,0,0,0.1);">

        <div style="background: linear-gradient(90deg, #4e54c8, #8f94fb); color: white; padding: 30px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 26px;">Welcome, ${name}!</h1>
            <p style="margin: 5px 0 0; font-size: 16px;">Your resident account has been created successfully.</p>
        </div>

        <!-- Main Content -->
        <div style="background-color: #ffffff; padding: 25px 20px; text-align: center;">

            <!-- Icon or image -->
            <div style="margin-bottom: 20px;">
                <img src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png" 
                     width="80" height="80" alt="Welcome Icon" style="border-radius: 50%;">
            </div>

            <!-- Credentials Box -->
            <div style="background-color: #f4f6ff; padding: 20px; border-radius: 8px; display: inline-block; text-align: left; margin-bottom: 25px;">
                <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
                <p style="margin: 8px 0;"><strong>Password:</strong> ${plainPassword}</p>
            </div>
            <br>
            <!-- Login Button -->
            <a href="http://localhost:5173/login" 
               style="display: inline-block; padding: 14px 30px; background-color: #4e54c8; color: white; text-decoration: none; font-weight: bold; border-radius: 6px; font-size: 16px;">
                Login to Your Portal
            </a>

            <!-- Footer message -->
            <p style="margin-top: 25px; font-size: 14px; color: #555;">
                For security, please change your password after your first login.  
            </p>
        </div>

        <!-- Bottom Footer -->
        <div style="background-color: #f0f0f0; padding: 12px 20px; font-size: 12px; color: #888; text-align: center;">
            This is an automated email from your Apartment Management System. Please do not reply.
        </div>
    </div>
    `
        };

        await transporter.sendMail(mailOptions);

        return res.json({
            error: false,
            message: "Resident added and email sent",
            resident: {
                id: resident._id,
                name: resident.name,
                email: resident.email,
                flat_id: resident.flat_id
            }
        });

    } catch (error) {
        res.json({ error: true, message: error.message });
    }
};

const getResidents = async (req, res) => {
    try {

        const resident = await Resident.aggregate([

            {
                $lookup: {
                    from: "flats",
                    localField: "flat_id",
                    foreignField: "_id",
                    as: "flatDetails"
                }
            },

            {
                $unwind: "$flatDetails"
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
                    _id: 1,
                    name: 1,
                    email: 1,
                    mobile: 1,
                    pan: 1,
                    aadhaar: 1,
                    status: 1,
                    flat: 1,
                    payment_status: 1,

                    flat_no: "$flatDetails.flat_no",
                    floor_no: "$flatDetails.floor_no",
                    flat_type: "$flatDetails.flat_type",
                    furnish: "$flatDetails.furnish",

                    building_name: "$buildingDetails.building_name",
                    block_name: "$blockDetails.name"
                }
            }

        ]);

        res.json({
            error: false,
            resident
        });

    } catch (error) {

        res.json({
            error: true,
            message: error.message
        });

    }
};

const updateStatus = async (req, res) => {
    try {
        const { _id } = req.params;
        const resident = await Resident.findById(_id);
        const newStatus = resident.status === "Active" ? "Inactive" : "Active";
        const updatedResident = await Resident.findByIdAndUpdate(_id, { $set: { status: newStatus } },
            {
                returnDocument: 'after'
            }
        );

        res.json({
            error: false,
            message: `Resident ${newStatus} successfully`,
            resident: updatedResident
        });

    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });
    }
}

const assignFlats = async (req, res) => {
    try {
        const { _id } = req.params;
        const { block_id, building_id, flat_id } = req.body;
        await Resident.findByIdAndUpdate({ _id: _id }, {
            $set: {
                flat: "Allotted", block_id, building_id, flat_id,
                payment_status: "Pending"
            }
        });
        await Flat.findByIdAndUpdate(flat_id, {
            status: "Booked"
        });
        return res.json({
            error: false,
            message: "Flat assigned successfully"
        });
    } catch (error) {
        return res.json({
            error: true,
            message: error.message
        });
    }
}

const getComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.aggregate([
            {
                $lookup: {
                    from: "flats",
                    localField: "flat_id",
                    foreignField: "_id",
                    as: "flatDetails"
                }
            },
            {
                $unwind: "$flatDetails"
            },
            {
                $lookup: {
                    from: "helpers",
                    localField: "helper_id",
                    foreignField: "_id",
                    as: "helperDetails"
                }
            },
            {
                $unwind: {
                    path: "$helperDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    helper_name: { $ifNull: ["$helperDetails.name", null] },
                    flat_no: "$flatDetails.flat_no",
                    type: 1,
                    title: 1,
                    description: 1,
                    status: 1
                }
            }
        ]);

        res.json({
            error: false,
            complaints: complaints
        });
    } catch (error) {
        return res.json({
            error: true,
            message: error.message
        });
    }
}

const addHelper = async (req, res) => {
    try {
        const helper = await Helper.create(req.body);
        return res.json({
            error: false,
            message: "Helper added successfully"
        });

    } catch (error) {
        return res.json({
            error: true,
            message: error.message
        });
    }
}

const getHelper = async (req, res) => {
    try {
        const helpers = await Helper.find();
        res.json({
            error: false,
            helpers: helpers
        });
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });

    }
}

const deleteHelper = async (req, res) => {
    try {
        const { _id } = req.params;
        await Helper.findByIdAndDelete(_id);
        res.json({
            error: false,
            message: "Helper deleted successfully"
        });

    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });
    }
}

const getHelperByType = async (req, res) => {
    try {
        const { type } = req.params;
        const helperType = complaintToHelperMap[type];
        if (!helperType) {
            return res.json({
                error: true,
                message: "No helper found"
            });
        }

        const helpers = await Helper.find({ type: helperType, status: "Available" });
        return res.json({
            error: false,
            helpers: helpers
        });

    } catch (error) {
        return res.json({
            error: true,
            message: error.message
        });
    }
}

const assignHelper = async (req, res) => {
    try {
        const { helperId, complaintId } = req.body;
        const helper = await Helper.findByIdAndUpdate(helperId, {
            $set: {
                status: "Unavailable"
            }
        }, { returnDocument: 'after' });

        await Complaint.findByIdAndUpdate(complaintId, {
            status: "In Progress",
            helper_id: helperId,
        });

        return res.json({
            error: false,
            message: "Helper assigned successfully"
        });

    } catch (error) {
        return res.json({
            error: true,
            message: error.message
        });
    }
}

const closeComplaint = async (req, res) => {
    try {
        const { _id } = req.params;
        const complaint = await Complaint.findById(_id);
        await Complaint.findByIdAndUpdate(_id, { status: "Closed", helper_id: null });
        await Helper.findByIdAndUpdate(complaint.helper_id, { status: "Available" });
        return res.json({
            error: false,
            message: "Complaint closed successfully"
        });
    } catch (error) {
        return res.json({
            error: true,
            message: error.message
        });
    }
}

const addSGuard = async (req, res) => {
    try {
        const { name, email, mobile, pan, aadhaar, address } = req.body;

        // Check if email is already taken
        const existingGuard = await Security.findOne({ email });
        if (existingGuard) {
            return res.json({ error: true, message: "Guard is already registered" });
        }

        // Generate password
        const plainPassword = generatePassword(8); // 6–8 characters

        // Save guard to DB
        const guard = await Security.create({
            name,
            email,
            password: plainPassword,
            mobile,
            pan,
            aadhaar,
            address,
            status: "Active"
        });

        // Send email to guard
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "🏠 Your Login Portal Credentials",
            html: `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border-radius: 10px; overflow: hidden; box-shadow: 0 0 15px rgba(0,0,0,0.1);">

        <div style="background: linear-gradient(90deg, #4e54c8, #8f94fb); color: white; padding: 30px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 26px;">Welcome, ${name}!</h1>
            <p style="margin: 5px 0 0; font-size: 16px;">Your resident account has been created successfully.</p>
        </div>

        <!-- Main Content -->
        <div style="background-color: #ffffff; padding: 25px 20px; text-align: center;">

            <!-- Icon or image -->
            <div style="margin-bottom: 20px;">
                <img src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png" 
                     width="80" height="80" alt="Welcome Icon" style="border-radius: 50%;">
            </div>

            <!-- Credentials Box -->
            <div style="background-color: #f4f6ff; padding: 20px; border-radius: 8px; display: inline-block; text-align: left; margin-bottom: 25px;">
                <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
                <p style="margin: 8px 0;"><strong>Password:</strong> ${plainPassword}</p>
            </div>
            <br>
            <!-- Login Button -->
            <a href="http://localhost:5173/login" 
               style="display: inline-block; padding: 14px 30px; background-color: #4e54c8; color: white; text-decoration: none; font-weight: bold; border-radius: 6px; font-size: 16px;">
                Login to Your Portal
            </a>

            <!-- Footer message -->
            <p style="margin-top: 25px; font-size: 14px; color: #555;">
                For security, please change your password after your first login.  
            </p>
        </div>

        <!-- Bottom Footer -->
        <div style="background-color: #f0f0f0; padding: 12px 20px; font-size: 12px; color: #888; text-align: center;">
            This is an automated email from your Apartment Management System. Please do not reply.
        </div>
    </div>
    `
        };

        await transporter.sendMail(mailOptions);

        return res.json({
            error: false,
            message: "Guard added and email sent",
            guard: {
                id: guard._id,
                name: guard.name,
                email: guard.email
            }
        });

    } catch (error) {
        res.json({ error: true, message: error.message });
    }
};

const getSGuard = async (req, res) => {
    try {
        const guards = await Security.find();
        res.json({
            error: false,
            guards: guards
        });
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });

    }
}

const deleteGuard = async (req, res) => {
    try {
        const { _id } = req.params;
        await Security.findByIdAndDelete(_id);
        res.json({
            error: false,
            message: "Guard deleted successfully"
        });

    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });
    }
}

const guardStatus = async (req, res) => {
    try {
        const { _id } = req.params;
        const guard = await Security.findById(_id);
        const newStatus = guard.status === "Active" ? "Inactive" : "Active";
        const updatedGuard = await Security.findByIdAndUpdate(_id, { $set: { status: newStatus } },
            {
                returnDocument: 'after'
            }
        );

        res.json({
            error: false,
            message: `Guard ${newStatus} successfully`,
            guard: updatedGuard
        });

    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });
    }
}

const getDashboardStats = async (req, res) => {
    try {
        const flatsCount = await Flat.countDocuments();
        const usersCount = await Resident.countDocuments();
        const helpersCount = await Helper.countDocuments();
        const complaintsCount = await Complaint.countDocuments();
        const guardsCount = await Security.countDocuments();

        const openComplaints = await Complaint.countDocuments({
            status: "Open"
        });

        const processComplaints = await Complaint.countDocuments({
            status: "In Progress"
        });

        const closedComplaints = await Complaint.countDocuments({
            status: "Closed"
        });

        const availableHelpers = await Helper.countDocuments({
            status: "Available"
        });

        const busyHelpers = await Helper.countDocuments({
            status: "Unavailable"
        });

        const recentComplaints = await Complaint.aggregate([
            {
                $sort: {
                    createdAt: -1
                }
            },

            {
                $limit: 2
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
                $unwind: "$flatDetails"
            },
            {
                $lookup: {
                    from: "helpers",
                    localField: "helper_id",
                    foreignField: "_id",
                    as: "helperDetails"
                }
            },
            {
                $unwind: {
                    path: "$helperDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    helper_name: { $ifNull: ["$helperDetails.name", null] },
                    flat_no: "$flatDetails.flat_no",
                    type: 1,
                    title: 1,
                    description: 1,
                    status: 1
                }
            }
        ]);

        const latestComplaints = await Complaint.aggregate([
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $limit: 3
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
                $unwind: "$flatDetails"
            },
            {
                $project: {
                    createdAt: "$createdAt",

                    title: {
                        $concat: [
                            "Complaint submitted for Flat ",
                            { $toString: "$flatDetails.flat_no" }
                        ]
                    },

                    description: "$title",

                    time: {
                        $dateToString: {
                            format: "%d %b %Y",
                            date: "$createdAt"
                        }
                    },

                    icon: "fa-file-circle-exclamation",
                    color: "danger"
                }
            }
        ]);

        const latestResidents = await Resident.aggregate([
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $limit: 2
            },
            {
                $project: {
                    createdAt: "$createdAt",

                    title: {
                        $concat: ["New resident added: ", "$name"]
                    },

                    description: "$email",

                    time: {
                        $dateToString: {
                            format: "%d %b %Y",
                            date: "$createdAt"
                        }
                    },

                    icon: "fa-user-plus",
                    color: "primary"
                }
            }
        ]);

        const latestHelpers = await Helper.aggregate([
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $limit: 2
            },
            {
                $project: {
                    createdAt: "$createdAt",

                    title: {
                        $concat: ["Helper added: ", "$name"]
                    },

                    description: "$type",

                    time: {
                        $dateToString: {
                            format: "%d %b %Y",
                            date: "$createdAt"
                        }
                    },

                    icon: "fa-screwdriver-wrench",
                    color: "warning"
                }
            }
        ]);

        // MERGE ALL ACTIVITIES
        const activities = [
            ...latestComplaints,
            ...latestResidents,
            ...latestHelpers
        ]
            .sort((a, b) => { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); })
            .slice(0, 8);

        return res.json({
            error: false,
            flats: flatsCount,
            users: usersCount,
            helpers: helpersCount,
            complaints: complaintsCount,
            guards: guardsCount,
            openComplaints,
            processComplaints,
            closedComplaints,
            availableHelpers,
            busyHelpers,
            recentComplaints,
            activities
        });

    } catch (error) {
        return res.json({
            error: true,
            message: error.message
        });
    }
};

module.exports = {
    handleAdminLogin: handleAdminLogin,
    verifyAdminToken: verifyAdminToken,
    logoutAdmin: logoutAdmin,
    changePassword: changePassword,
    handleAddFlats: handleAddFlats,
    getBlocks: getBlocks,
    addNewBuilding: addNewBuilding,
    getBuilding: getBuilding,
    deleteBuilding: deleteBuilding,
    getBuildingById: getBuildingById,
    deleteFlat: deleteFlat,
    getFlats: getFlats,
    editFlat: editFlat,
    getFlatById: getFlatById,
    addResident: addResident,
    getResidents: getResidents,
    updateStatus: updateStatus,
    assignFlats: assignFlats,
    getComplaints: getComplaints,
    addHelper: addHelper,
    getHelper: getHelper,
    deleteHelper: deleteHelper,
    getHelperByType: getHelperByType,
    assignHelper: assignHelper,
    closeComplaint: closeComplaint,
    addSGuard: addSGuard,
    getSGuard: getSGuard,
    deleteGuard: deleteGuard,
    guardStatus: guardStatus,
    getDashboardStats: getDashboardStats
}
