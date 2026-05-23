import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ManageHelper() {
    const [helpers, setHelpers] = useState([]);
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const url = "http://localhost:3000";

    useEffect(() => {
        fetchHelpers();
    }, []);

    async function fetchHelpers() {
        try {
            const endpoint = `${url}/admin/helper`;
            const response = await axios.get(endpoint, { withCredentials: true });
            setHelpers(response.data.helpers);
        } catch (error) {
            console.log(error);
        }
    }

    async function onSubmit(data) {
        try {
            const endpoint = `${url}/admin/helper`;
            const response = await axios.post(endpoint, data, { withCredentials: true });
            if (response.data.error) {
                toast.error(response.data.message);
            } else {
                toast.success(response.data.message);
                reset();
                fetchHelpers();
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    async function deleteHelper(id) {
        if (confirm("Are you sure you want to delete this Helper?")) {
            try {
                const endpoint = `${url}/admin/helper/${id}`;
                await axios.delete(endpoint, { withCredentials: true });
                toast.success("Helper deleted successfully");
                fetchHelpers();
            } catch (error) {
                toast.error(error.message);
            }
        }
    }

    return (
        <div className="manage-helper-page pb-5">
            <div className="container " style={{ paddingTop: "170px" }}>
                <div className="row mb-4">
                    <div className="col">
                        <div className="card shadow-sm top-card">
                            <div className="card-body">
                                <h3 className="complaint-title fw-bold mb-1"><i className="fa-solid fa-handshake-angle me-2"></i> Manage Helpers </h3>
                                <small className="text-muted">Add and manage helper details</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card shadow helper-form-card mb-5">
                    <div className="card-body p-4">
                        <h4 className="text-center helper-title mb-4"> Add New Helper</h4>
                        <form onSubmit={handleSubmit(onSubmit)} className="helper-form-card p-3">
                            <div className="row g-4">
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
                                    })} type="email" className="form-control" placeholder="Enter email address" />
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

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold text-black" htmlFor="address">Address <span className="text-danger">*</span></label>
                                    <textarea rows="3" className="form-control" placeholder="Enter address" {...register("address", { required: "Address is required" })} />
                                    {errors.address && (<small className="text-danger">{errors.address.message}</small>)}
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-black" htmlFor="type">Type of Helper</label>
                                    <select className="form-select" {...register("type", { required: true })}>
                                        <option value="">Select Type of Helper</option>
                                        <option value="Electrician">Electrician</option>
                                        <option value="Plumber">Plumber</option>
                                        <option value="Technician">Technician</option>
                                        <option value="Garbage Manager">Garbage Manager</option>
                                        <option value="Housekeeping">Housekeeping</option>
                                        <option value="Security Guard">Security Guard</option>
                                        <option value="Others">Others</option>
                                    </select>
                                    {errors.type && <span className="text-danger">Please select type</span>}
                                </div>

                                <div className="col-12 text-center mt-3">
                                    <button type="submit" className="btn custom-btn text-white px-5 py-2"><i className="fa-solid fa-plus me-2"></i>Add Helper</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="card border-0 shadow-sm table-card">
                    <div className="card-body">
                        <h4 className="helper-title mb-4">Helpers List</h4>
                        <div className="table-responsive">
                            <table className="table table-hover custom-table align-middle">
                                <thead>
                                    <tr className="text-center">
                                        <th>Name</th>
                                        <th>Mobile</th>
                                        <th>Email</th>
                                        <th>Gender</th>
                                        <th>Address</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {helpers.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" className="text-center py-4">
                                                No Helpers Found
                                            </td>
                                        </tr>
                                    ) : (helpers.map((x) => (
                                        <tr key={x._id}>
                                            <td>{x.name}</td>
                                            <td>{x.mobile}</td>
                                            <td>{x.email}</td>
                                            <td>{x.gender}</td>
                                            <td>{x.address}</td>
                                            <td>{x.type}</td>
                                            <td><span className="status-badge">{x.status}</span>
                                            </td>
                                            <td className="text-center">
                                                <button className="btn btn-danger btn-sm" onClick={() => deleteHelper(x._id)}><i className="fa-solid fa-trash me-1"></i>Delete</button></td>
                                        </tr>)))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageHelper;