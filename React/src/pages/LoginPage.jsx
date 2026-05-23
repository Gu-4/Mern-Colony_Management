import { useState } from "react";
import { ToastContainer } from "react-toastify";
import AdminLogin from "../pages/admin/AdminLogin";
import UserLogin from "../pages/users/UserLogin";
import GuardLogin from "../pages/security/GuardLogin";

export default function LoginPage() {
    const [role, setRole] = useState("admin");

    return (
        <main>
            <section id="bg" className=" py-4 relative align-items-center min-vh-100">
                <div className="container">
                    <div className="row g-4 justify-content-center">
                        {/* LOGIN CARD */}
                        <div className="col-lg-5 ">
                            <div className="p-4 p-lg-5 rounded-3 bg-colour shadow-lg">
                                {/* TITLE */}
                                <div className="text-center mb-4">
                                    <h2 className="mb-2 text-white">Welcome Back</h2>
                                    <p className=" text-white">
                                        Sign in to access your colony dashboard
                                    </p>
                                </div>

                                {/* ROLE SWITCH */}
                                <div className="d-flex flex-column flex-sm-row gap-2 mb-4">
                                    <button onClick={() => setRole("admin")} className={`role-btn flex-fill ${role === "admin" ? "active" : ""}`}><i className="fas fa-user-shield"></i> Admin</button>
                                    <button onClick={() => setRole("user")} className={`role-btn flex-fill ${role === "user" ? "active" : ""}`}><i className="fas fa-user" /> User</button>
                                    <button onClick={() => setRole("guard")} className={`role-btn flex-fill ${role === "guard" ? "active" : ""}`}>
                                        <i className="fas fa-shield-alt" />Guard
                                    </button>
                                </div>
                                {/* FORM */}
                                <div className="mt-3">
                                    {role === "admin" ? <AdminLogin /> : role === "user" ? <UserLogin /> : <GuardLogin />}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 d-none d-lg-flex flex-column text-white align-items-center justify-content-center log-image text-center">
                            <h1 className="fs-1 fw-bold text-center text-white">
                                The simple way to manage your users
                            </h1>
                            <ul className="mt-4">
                                <li>✔ 24/7 Security Monitoring</li>
                                <li>✔ Visitor Management</li>
                                <li>✔ Complaint Tracking</li>
                                <li>✔ Maintenance Requests</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </main>
    );
}
