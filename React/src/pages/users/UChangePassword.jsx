import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';

const UChangePassword = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const newPassword = watch("new_password");
    async function onSubmit(data) {
        try {
            const url = "http://localhost:3000/user/change-password";
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
                    navigate('/user/dashboard');
                }, 2000)
            }
        } catch (error) {
            console.log(error.message)
        }
    };

    return (
        <div className="user-page">
            <div className="user-container">
                <div className="row align-items-center">
                    {/* Left Side Illustration */}
                    <div className="col-lg-5 d-none d-lg-flex flex-column text-white align-items-center justify-content-center text-center">
                        <div className="user-card user-card-body user-hero-card d-flex flex-column align-items-center justify-content-center text-center">
                            <div className="mt-4 p-2">
                                <h3 className="helper-title mb-2 text-white"> Secure Your Account </h3>
                                <p className="mb-0 text-white" > Update your password regularly to keep your
                                    account safe and protected. </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="col-lg-6 col-md-8">
                        <div className="user-card user-card-body p-4 p-md-5">
                            <div className="text-center mb-4">
                                <div className="user-btn mx-auto px-1 mb-3 d-flex align-items-center justify-content-center" style={{ width: "60px", height: "60px", borderRadius: "14px" }} >
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
                                        className="user-btn w-100 py-3"
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

export default UChangePassword;