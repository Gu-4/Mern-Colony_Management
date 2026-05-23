import { Button, Drawer } from "antd";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function GuardProfile() {
    const [guard, setGuard] = useState({});
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const profileFields = [
        guard?.name,
        guard?.email,
        guard?.mobile,
        guard?.pan,
        guard?.aadhaar,
        guard?.address,
    ];

    const filledFields = profileFields.filter(
        (field) => field && field.toString().trim() !== ""
    ).length;

    const profileCompletion = Math.round(
        (filledFields / profileFields.length) * 100
    );

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const guardData = JSON.parse(localStorage.getItem("guardData"));
            const guardId = guardData?._id;
            const response = await axios.get(`http://localhost:3000/guard/profile/${guardId}`, { withCredentials: true });

            if (response.data.error) {
                toast.error(response.data.message);
            } else {
                setGuard(response.data.guard);
                reset({
                    name: response.data.guard.name,
                    email: response.data.guard.email,
                    mobile: response.data.guard.mobile,
                    pan: response.data.guard.pan,
                    aadhaar: response.data.guard.aadhaar,
                    address: response.data.guard.address,
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const onSubmit = async (data) => {
        try {
            const guardData = JSON.parse(localStorage.getItem("guardData"));
            const guardId = guardData?._id;
            const response = await axios.put(`http://localhost:3000/guard/profile/${guardId}`, data, { withCredentials: true });

            if (response.data.error) {
                toast.error(response.data.message);
            } else {
                toast.success("Profile updated successfully");
                setGuard(response.data.guard);
                onClose();
                fetchProfile();
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="security-page pb-3">
            <div className="p-3">
            </div>
            <div className="security-card d-flex align-items-center justify-content-between p-4 mb-4">
                <div>
                    <h3 className="security-title">Guard Profile</h3>
                    <p className="security-subtitle mb-0">
                        Manage your security account information
                    </p>
                </div>

                <Button className="security-btn p-4 fw-5 fs-6 border-0" onClick={showDrawer} > Edit Profile </Button>
            </div>

            {/* Drawer */}
            <Drawer
                className="security-drawer"
                title="Edit Guard Profile"
                placement="right"
                onClose={onClose}
                open={open}
                width={700}
            >
                <div className="security-card mb-4">
                    <div className="security-card-body p-3">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row g-3">
                                <div className="mb-3 col-md-6">
                                    <label className="form-label text-black">Full Name</label>
                                    <input type="text" className="form-control security-form-control" {...register("name", { required: true, })} />
                                    {errors.name && (<span className="text-danger"> Please enter full name </span>)}
                                </div>

                                <div className="mb-3 col-md-6">
                                    <label className="form-label text-black"> Mobile Number </label>
                                    <input type="text" className="form-control security-form-control" {...register("mobile", { required: true, })} />
                                    {errors.mobile && (<span className="text-danger"> Please enter mobile number </span>)}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label text-black"> Email Address </label>
                                <input type="email" className="form-control security-form-control" {...register("email", { required: true, })} />
                                {errors.email && (<span className="text-danger"> Please enter email </span>)}
                            </div>

                            <div className="row g-3">
                                <div className="mb-3 col-md-6">
                                    <label className="form-label text-black"> PAN Number </label>
                                    <input type="text" className="form-control security-form-control" {...register("pan")} readOnly/>
                                </div>

                                <div className="mb-3 col-md-6">
                                    <label className="form-label text-black"> Aadhaar Number </label>
                                    <input type="text" className="form-control security-form-control" {...register("aadhaar")} readOnly/>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label text-black">Address</label>
                                <textarea className="form-control security-form-control" rows={3} {...register("address", { required: true, })} />
                                {errors.address && (<span className="text-danger"> Please enter address </span>)}
                            </div>

                            <button type="submit" className="security-btn offset-4" > Save Changes </button>
                        </form>
                    </div>
                </div>
            </Drawer>

            <div className="container-fluid">
                <div className="row g-4">
                    {/* Left Profile Card */}
                    <div className="col-lg-4">
                        <div className="security-card sec-profile-card">
                            <div className="security-card-body text-center">
                                <div className="sec-profile-image-wrapper">
                                    <img src="/assets/images/guard_pic.png"
                                        alt="Guard" className="sec-profile-image" />
                                </div>

                                <h4 className="mt-3 mb-1">{guard?.name || "Security Guard"} </h4>
                                <p className="security-role text-light">Security Guard</p>
                                <p className="security-location text-light">Security Staff</p>

                                <div className="d-flex justify-content-center gap-2 mt-4">
                                    Verified Guard ✔
                                </div>

                                <hr className="my-4" />

                                <div className="security-info-list">

                                    <div className="security-info-item">
                                        <span>Email</span> <strong>{guard?.email}</strong>
                                    </div>

                                    <div className="security-info-item">
                                        <span>Mobile</span> <strong>{guard?.mobile}</strong>
                                    </div>

                                    <div className="security-info-item">
                                        <span>PAN</span> <strong>{guard?.pan}</strong>
                                    </div>

                                    <div className="security-info-item">
                                        <span>Status</span> <strong className="security-badge security-badge-success rounded-3 p-1">
                                            {guard?.status}
                                        </strong>
                                    </div>
                                </div>

                                {/* Profile Completion */}
                                <div className="security-profile-completion mt-4">

                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Profile Completion</span>
                                        <span>{profileCompletion}%</span>
                                    </div>

                                    <div className="progress rounded-pill"
                                        style={{
                                            height: "10px",
                                            background: "rgba(255,255,255,0.25)"
                                        }}>
                                        <div
                                            className={`progress-bar`}
                                            style={{
                                                width: `${profileCompletion}%`, borderRadius: "20px",
                                                background:
                                                    profileCompletion < 40
                                                        ? "#ff4d6d"
                                                        : profileCompletion < 80
                                                            ? "#ffd60a"
                                                            : "#38ffb3",
                                                boxShadow: "0 0 10px rgba(255,255,255,0.4)"
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="security-card mt-4">
                            <div className="security-card-body">
                                <div className="security-title fs-5">
                                    Quick Actions
                                </div>

                                <div className="d-grid gap-3">
                                    <Link to="/guard/manage-visitors" className="btn security-btn"  >Manage Visitors  </Link>
                                    <Link to="/guard/vehicle" className="btn security-btn" >Manage Vehicles </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="col-lg-8">
                        {/* Personal Information */}
                        <div className="security-card mb-4">
                            <div className="security-card-body">
                                <div className="security-title fs-5">
                                    Personal Information
                                </div>

                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Full Name</label>
                                        <input type="text" className="form-control security-form-control" value={guard?.name || ""} readOnly />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label"> Mobile Number </label>
                                        <input type="text" className="form-control security-form-control " value={guard?.mobile || ""} readOnly />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label"> Email Address </label>
                                        <input type="email" className="form-control security-form-control " value={guard?.email || ""} readOnly />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label"> PAN Number </label>
                                        <input type="text" className="form-control security-form-control" value={guard?.pan || ""} readOnly />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label"> Aadhaar Number </label>

                                        <input type="text" className="form-control security-form-control " value={guard?.aadhaar || ""} readOnly />
                                    </div>

                                    <div className="col-md-12">
                                        <label className="form-label"> Address </label>
                                        <textarea className="form-control security-form-control " rows={3} value={guard?.address || ""} readOnly />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Account Security */}
                        <div className="security-card mb-4">
                            <div className="security-card-body">

                                <div className="security-title fs-5">
                                    Account Security
                                </div>

                                <div className="security-info-item">
                                    <span>Email Verified</span>
                                    <strong className="text-success">
                                        Verified
                                    </strong>
                                </div>

                                <div className="security-info-item">
                                    <span>Password</span>
                                    <div className="d-flex align-items-center gap-2">
                                        <strong>
                                            {showPassword
                                                ? guard?.password
                                                : "••••••••"}
                                        </strong>

                                        <i
                                            className={`bx ${showPassword ? "bx-hide" : "bx-show"} fs-5`}
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }
                                        ></i>
                                    </div>
                                </div>

                                <Link to="/security/change-password" className="btn security-btn mt-3"  >
                                    Change Password
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default GuardProfile;