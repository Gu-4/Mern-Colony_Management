import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';

const ChangePassword = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const newPassword = watch("new_password");

    async function onSubmit(data) {
        try {
            const url = "http://localhost:3000/admin/change-password";
            const response = await axios.put(url, data, { withCredentials: true });
            if (response.data.error) {
                if (response.data.message === "Unauthorized Access") {
                    navigate("/login")
                } else {
                    toast.error(response.data.message);
                }
            } else {
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate('/admin/dashboard');
                }, 2000)
            }
        } catch (error) {
            console.log(error.message)
        }
    };

    return (
        <div className="manage-helper-page">
            <div className="container page-content py-5">
                <div className="row justify-content-center align-items-center">
                    {/* Left Side Illustration */}
                    <div className="col-lg-5 d-none d-lg-flex flex-column text-white align-items-center justify-content-center text-center">
                        <div className="top-card p-4 text-center w-100" style={{
                            backgroundImage: "linear-gradient(rgba(15,23,42,0.55), rgba(15,23,42,0.55)),url('/assets/images/pass.png')", backgroundSize: "cover",
                            height: " 750px", width: "100%", backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            borderRadius: "20px", display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}>
                            <div className="mt-4">
                                <h3 className="helper-title mb-2 text-white"> Secure Your Account </h3>
                                <p className="mb-0 text-white" > Update your password regularly to keep your
                                    admin account safe and protected. </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="col-lg-6 col-md-8">
                        <div className="helper-form-card p-4 p-md-5">
                            <div className="text-center mb-4">
                                <div className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                                    style={{ width: "70px", height: "70px", borderRadius: "18px", background: "linear-gradient(135deg,#0f172a,#1e3a8a)", color: "white", fontSize: "30px", boxShadow: "0 10px 25px rgba(30,58,138,0.25)", }} >
                                    <i className="bx bx-lock-alt"></i>
                                </div>

                                <h3 className="helper-title"> Change Password </h3>

                                <p className="mb-0" style={{ color: "#64748b" }} >
                                    Enter your current password and choose a new
                                    secure password.
                                </p>
                            </div>

                            {/* FORM */}
                            <form onSubmit={handleSubmit(onSubmit)}>

                                {/* Current Password */}
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="current_password">Current Password</label>
                                    <input type="password" id="current_password" className="form-control" placeholder="Enter current password"
                                        {...register("current_password", {
                                            required:
                                                "Current password is required",
                                        })}
                                    />
                                    {errors.current_password && (<small className="text-danger"> {errors.current_password.message}</small>)}
                                </div>

                                {/* New Password */}
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="new_password"> New Password</label>
                                    <input type="password" id="new_password" className="form-control" placeholder="Enter new password"
                                        {...register("new_password", {
                                            required: "New password is required",
                                            minLength: {
                                                value: 8,
                                                message: "Minimum 8 characters",
                                            },
                                        })} />
                                    {errors.new_password && (<small className="text-danger"> {errors.new_password.message}</small>)}
                                </div>

                                {/* Confirm Password */}
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="confirm_password"> Confirm Password </label>
                                    <input type="password" id="confirm_password" className="form-control" placeholder="Confirm new password"
                                        {...register("confirm_password", {
                                            required:
                                                "Please confirm password",
                                            validate: (value) =>
                                                value === newPassword ||
                                                "Passwords do not match",
                                        })}
                                    />

                                    {errors.confirm_password && (
                                        <small className="text-danger">
                                            {errors.confirm_password.message}
                                        </small>
                                    )}
                                </div>

                                {/* Buttons */}
                                <div className="d-grid gap-3">

                                    <button
                                        type="submit"
                                        className="btn custom-btn py-3 text-white"
                                    >
                                        <i className="bx bx-check-shield me-2"></i>
                                        Change Password
                                    </button>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;