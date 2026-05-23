import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

function AddVisitors() {
    const [visitors, setVisitors] = useState([]);
    const { register, setValue, reset, handleSubmit, formState: { errors } } = useForm();
    dayjs.extend(customParseFormat);
    const dateFormat = 'DD-MM-YYYY';

    const url = "http://localhost:3000";

    useEffect(() => {
        fetchVisitors();
    }, []);

    async function fetchVisitors() {
        try {
            const endpoint = `${url}/user/visitor`;
            const response = await axios.get(endpoint, { withCredentials: true });
            setVisitors(response.data.visitors);
        } catch (error) {
            console.log(error);
        }
    }

    async function onSubmit(data) {
        try {
            const endpoint = `${url}/user/visitor`;
            const response = await axios.post(endpoint, data, { withCredentials: true });
            if (response.data.error) {
                toast.error(response.data.message);
            } else {
                toast.success(response.data.message);
                reset();
                fetchVisitors();
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    async function deleteVisitor(_id) {
        if (confirm("Are you sure you want to delete this Visitor?")) {
            try {
                const endpoint = `${url}/user/visitor/${_id}`;
                const response= await axios.delete(endpoint, { withCredentials: true });
                if (response.data.error) {
                    toast.error(response.data.message);
                } else {
                    toast.success("Visitor deleted successfully");
                    fetchVisitors();
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    }

    return (
        <div className="user-page pb-5">
            <div className="user-container">
                <div className="user-card mb-3">
                    <div className="user-card-header">
                        <h3 className="user-title text-center"> <i className="fa-solid fa-person-walking"></i> Manage Visitors</h3>
                        <p className="user-subtitle text-center">Add and track your visitors</p>
                    </div>
                </div>

                {/* FORM CARD */}
                <div className="user-card mb-4">
                    <h4 className="user-title m-4">Add Visitors</h4>
                    <div className="user-card-body">
                        <form onSubmit={handleSubmit(onSubmit)} className="user-form">
                            <div className="row g-3">

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-black" htmlFor="name">Name <span className="text-danger">*</span></label>
                                    <input {...register("name", { required: "Name is required" })} type="text" className="form-control" placeholder="Enter full name" />
                                    {errors.name && (<small className="text-danger">{errors.name.message}</small>)}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-black" htmlFor="mobile">Mobile No. <span className="text-danger">*</span></label>
                                    <input {...register("mobile", {
                                        required: "Mobile number is required",
                                        pattern: {
                                            value: /^[6-9]\d{9}$/,
                                            message:
                                                "Enter valid 10-digit mobile number"
                                        }
                                    })} type="text" maxLength={10} className="form-control" placeholder="Enter mobile number" />

                                    {errors.mobile && (<small className="text-danger">{errors.mobile.message}</small>)}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-black" htmlFor="email">Email</label>
                                    <input {...register("email", {
                                        required: false,
                                        pattern: {
                                            value:
                                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message:
                                                "Enter valid email address"
                                        }
                                    })} type="email" className="form-control text-black" placeholder="Enter email address" />
                                    {/* {errors.email && (<small className="text-danger">{errors.email.message}</small>)} */}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-black" htmlFor="gender">Gender</label>
                                    <select className="form-select" {...register("gender")}>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div className="offset-md-4">
                                    <div className="col-md-4">
                                        <label className="form-label fw-semibold text-black" htmlFor="date">Date <span className="text-danger">*</span></label>
                                        <br />

                                        <DatePicker
                                            className="large-datepicker"
                                            minDate={dayjs().startOf('day')} // cannot select past dates
                                            disabledDate={(current) => {
                                                return (
                                                    current &&
                                                    (
                                                        current > dayjs('2026-12-31', dateFormat)
                                                    )
                                                );
                                            }}
                                            onChange={(date) => {
                                                setValue("date", date.toDate());
                                            }}
                                            format={dateFormat}
                                        />
                                        <input
                                            type="hidden"
                                            {...register("date", { required: true })}
                                        />
                                        {errors.date && (<small className="text-danger">Select Valid date</small>)}
                                    </div>
                                </div>

                                <div className="col-12 text-center mt-3">
                                    <button className="user-btn">Add Visitor</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>

                {/* TABLE CARD */}
                <div className="user-card">
                    <div className="user-card-body">
                        <h4 className="user-title mb-4">Visitors List</h4>
                        <table className="user-table">
                            <thead>
                                <tr className="text-center">
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
                                        <td colSpan="7" className="user-empty">
                                            No visitors found
                                        </td>
                                    </tr>
                                ) : (
                                    visitors.map(x => (
                                        <tr key={x._id} className="text-center">
                                            <td>{x.name}</td>
                                            <td>{x.mobile}</td>
                                            <td>{x.email}</td>
                                            <td>{x.gender}</td>
                                            <td>{dayjs(x.date).format("DD-MM-YYYY")}</td>
                                            <td>
                                                <span className={`user-badge ${x.status === "Visited" ? "user-badge-success" : "user-badge-warning"}`}>{x.status}</span>
                                            </td>
                                            <td>
                                                {x.status === "Pending" ? (<button className="btn btn-danger btn-sm me-2" onClick={() => deleteVisitor(x._id)}><i className="fa-solid fa-trash me-1"></i> Delete</button>) : null}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>

                        </table>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddVisitors;