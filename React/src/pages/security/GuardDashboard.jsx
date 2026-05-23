import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button, Drawer } from 'antd';
import dayjs from "dayjs";

function GuardDashboard() {
    const [visitors, setVisitors] = useState([]);
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [stats, setStats] = useState({
        visitors: 0,
        vehicles: 0
    });
    const url = "http://localhost:3000";

    useEffect(() => {
        fetchVisitors();
        fetchDashboard();
    }, []);
    async function changeStatus(_id) {
        try {
            const endpoint = `${url}/guard/visitor/${_id}`;
            const res = await axios.put(endpoint, {}, { withCredentials: true });

            if (res.data.error) {
                toast.error(res.data.message);
                return;


            } else {
                toast.success(res.data.message);
                fetchVisitors();
            }
        } catch (error) {
            toast.error(error.message);
        }

    }
    async function fetchVisitors() {
        try {
            const endpoint = `${url}/guard/today-visitor`;
            const response = await axios.get(endpoint, { withCredentials: true });

            if (response.data.error) {
                toast.error(response.data.message)
            } else {
                setVisitors(response.data.visitors);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function fetchDashboard() {
        try {
            const res = await axios.get(`${url}/guard/stats`, { withCredentials: true });
            if (res.data.error) {
                toast.error(res.data.message);
                return;
            } else {
                setStats({
                    visitors: res.data.visitors,
                    vehicles: res.data.vehicles
                });
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="security-page">
                <div className="security-container">
                    <div className="security-card mb-4">
                        <div className="security-card-header">
                            <h3 className="security-title"><i className="fa-solid fa-shield-halved me-2"></i>Guard Dashboard</h3>
                            <p className="security-subtitle">Monitor visitors and vehicle activities</p>
                        </div>
                    </div>

                    <div className="row g-4">
                        <div className="col-md-6">
                            <Link to="/guard/manage-visitors" className="text-decoration-none" >
                                <div className="security-stat-card">
                                    <div className="d-flex justify-content-between align-items-center p-3">
                                        <div>
                                            <div className="security-stat-icon">
                                                <i className="fa-solid fa-users"></i>
                                            </div>
                                            <h4 className="security-title"> Total Visitors</h4>
                                            <p className="mb-0" style={{ color: "#64748b", fontSize: "14px" }} >
                                                Track all visitor entries and monitor pending visits.
                                            </p>
                                        </div>
                                        <div className="security-title pe-2" style={{ fontSize: "52px", fontWeight: "700" }}>
                                            {stats.visitors}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end mt-4">
                                        <div className="fs-4 pe-2" style={{ color: "#0f766e" }}>
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="col-md-6">
                            <Link to="/guard/vehicle" className="text-decoration-none">
                                <div className="security-stat-card">
                                    <div className="d-flex justify-content-between align-items-center p-3">
                                        <div>
                                            <div className="security-stat-icon">
                                                <i className="fa-solid fa-car-side"></i>
                                            </div>
                                            <h4 className="security-title"> Total Vehicles </h4>
                                            <p className="mb-0" style={{ color: "#64748b", fontSize: "14px" }}>Manage parking assignments of registered vehicles.</p>
                                        </div>

                                        <div className="security-title pe-2" style={{ fontSize: "52px", fontWeight: "700" }}>
                                            {stats.vehicles}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end mt-4">
                                        <div className="fs-4 pe-2" style={{ color: "#0f766e" }}>
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="security-card my-3">
                        <div className="security-card-body">
                            <h4 className="security-title mb-0"><i className="fa-solid fa-file-circle-exclamation me-2"></i> Today's Visitors</h4>
                            <small className="text-muted">View and track today's visitors records</small>
                            <div className="table-responsive">
                                <table className="security-table">
                                    <thead>
                                        <tr className="text-center">
                                            <th>Flat No</th>
                                            <th>Name</th>
                                            <th>Mobile</th>
                                            <th>Email</th>
                                            <th>Gender</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {visitors.length === 0 ? (
                                            <tr>
                                                <td colSpan="8" className="security-empty">
                                                    No Visitor Found
                                                </td>
                                            </tr>
                                        ) : (visitors.map((x) => (
                                            <tr key={x._id} className="text-center">
                                                <td>{x.flat_no}</td>
                                                <td>{x.name}</td>
                                                <td>{x.mobile}</td>
                                                <td>{x.email}</td>
                                                <td>{x.gender}</td>
                                                <td>{dayjs(x.date).format("DD-MM-YYYY")}</td>
                                                <td><span className={
                                                    x.status === "Pending"
                                                        ? "security-badge security-badge-warning"
                                                        : x.status === "Approved"
                                                            ? "security-badge security-badge-success"
                                                            : "security-badge security-badge-danger"
                                                }>
                                                    {x.status}
                                                </span>
                                                </td>
                                                <td className="text-center">
                                                    {x.status === "Pending" ? (<button className="security-btn" onClick={() => changeStatus(x._id)}>Visited</button>) : null}</td>
                                            </tr>)))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}
export default GuardDashboard;