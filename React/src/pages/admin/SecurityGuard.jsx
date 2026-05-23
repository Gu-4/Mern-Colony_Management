import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Drawer } from 'antd'

function SecurityGuard() {
    const [guard, setGuard] = useState([]);
    const { register, reset, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const url = "http://localhost:3000";

    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchGuards();
    }, [])

    async function changeStatus(_id) {
        try {
            const endpoint = `${url}/admin/guards/${_id}`;
            const res = await axios.put(endpoint, {}, { withCredentials: true });

            if (res.data.error) {
                toast.error(res.data.message);
                return;


            } else {
                toast.success(res.data.message);
                fetchGuards();
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    async function deleteGuard(_id) {
        if (confirm("Are you sure you want to delete this Guard?")) {
            try {
                const endpoint = `${url}/admin/guards/${_id}`;
                await axios.delete(endpoint, { withCredentials: true });
                toast.success("Guard deleted successfully");
                fetchGuards();
            } catch (error) {
                toast.error(error.message);
            }
        }
    }

    async function fetchGuards() {
        try {
            const endpoint = `${url}/admin/guards`;
            const response = await axios.get(endpoint, { withCredentials: true });
            setGuard(response.data.guards);
        } catch (error) {
            console.log(error);
        }

    }
    async function onSubmit(data) {
        const endpoint = `${url}/admin/guards`;
        const response = await axios.post(endpoint, data, { withCredentials: true });
        if (response.data.error) {
            toast.error(response.data.message);
            return;
        } else {
            toast.success(response.data.message);
            reset();
            fetchGuards();
        }
    }
    return (
        <div className="manage-helper-page pb-5">
            <div className="container" style={{ paddingTop: "170px" }}>
                <div className="row mb-3">
                    <div className="col">
                        <div className="card top-card shadow-sm">
                            <div className="card-body">
                                <h3 className="complaint-title mb-0"><i className="fa-solid fa-users"></i> Manage Guards</h3>
                                <small className="text-muted">Add, update and manage Guards</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <div className="card helper-form-card shadow-sm">
                            <div className="card-body">
                                <h4 className="text-center helper-title mb-4">Add Security Guards</h4>
                                <form onSubmit={handleSubmit(onSubmit)} className="helper-form-card p-3">
                                    <div className="row g-3 mt-1">
                                        <div className="col-4 mb-3">
                                            <label className="form-label text-black" htmlFor="name">Guard Name <span className="text-danger">*</span></label>
                                            <input {...register("name", { required: true })} id="name" className="form-control" type="text" />
                                            {errors.name && <span className="text-danger">This field is required</span>}
                                        </div>
                                        <div className="col-4 mb-3">
                                            <label className="form-label text-black" htmlFor="email">Email <span className="text-danger">*</span></label>
                                            <input {...register("email", {
                                                required: "This field is required",
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: "Enter valid email address"
                                                }
                                            })} type="email" id="email" name="email" className='form-control' />
                                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                                        </div>
                                        <div className="col-4 mb-3">
                                            <label className="form-label text-black" htmlFor="mobile">Mobile No <span className="text-danger">*</span></label>
                                            <input {...register("mobile", {
                                                required: "Mobile number is required",
                                                pattern: {
                                                    value: /^[6-9]\d{9}$/,
                                                    message: "Enter valid 10-digit mobile number"
                                                }
                                            })} type="text" maxLength={10} className="form-control" />
                                            {errors.mobile && <span className="text-danger">{errors.mobile.message}</span>}
                                        </div>
                                    </div>

                                    <div className="row g-3 mt-1 offset-md-3">
                                        <div className="col-4 mb-3">
                                            <label className="form-label text-black" htmlFor="pan">PAN No <span className="text-danger">*</span></label>
                                            <input {...register("pan", {
                                                required: "This field is required",
                                                pattern: {
                                                    value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                                                    message: "Invalid PAN number"
                                                }
                                            })}
                                                type="text" placeholder="ABCDE1234G" maxLength={10} id="pan" name="pan" className='form-control' onChange={(e) => { e.target.value = e.target.value.toUpperCase(); }} />
                                            {errors.pan && <span className="text-danger">{errors.pan.message}</span>}
                                        </div>
                                        <div className="col-4 mb-3">
                                            <label className="form-label text-black" htmlFor="aadhaar">Aadhaar No <span className="text-danger">*</span></label>
                                            <input {...register("aadhaar", {
                                                required: "Aadhaar number is required",
                                                pattern: {
                                                    value: /^\d{12}$/,
                                                    message: "Aadhaar must be exactly 12 digits"
                                                }
                                            })} type="text" maxLength={12} id="aadhaar" className="form-control" />
                                            {errors.aadhaar && <span className="text-danger">{errors.aadhaar.message}</span>} </div>
                                    </div>
                                    <div className="col-12">

                                        <label className="form-label fw-semibold text-black" htmlFor="address">Address <span className="text-danger">*</span></label>
                                        <textarea rows="3" className="form-control" placeholder="Enter address" {...register("address", { required: "Address is required" })} />
                                        {errors.address && (<small className="text-danger">{errors.address.message}</small>)}
                                    </div>

                                    <div className="text-center mt-3">
                                        <button className="btn custom-btn text-white px-5 py-2" disabled={isSubmitting}> {isSubmitting ? "Submitting" : "Submit"}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="card table-card shadow-sm">
                            <div className="card-body">
                                <h4 className="helper-title mb-3"> Guards Details</h4>
                                <div className="table-responsive">
                                    <table className="table table-hover custom-table align-middle">
                                        <thead>
                                            <tr className="text-center">
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Mobile</th>
                                                <th>PAN</th>
                                                <th>Aadhaar</th>
                                                <th>Address</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {guard.length === 0 ? (
                                                <tr>
                                                    <td colSpan="8" className="text-center">
                                                        No Guard found
                                                    </td>
                                                </tr>) : (guard.map((x) => (
                                                    <tr key={x._id} className="text-center" >
                                                        <td>{x.name}</td>
                                                        <td>{x.email}</td>
                                                        <td>{x.mobile}</td>
                                                        <td>{x.pan}</td>
                                                        <td>{x.aadhaar}</td>
                                                        <td>{x.address}</td>
                                                        <td>{x.status}</td>
                                                        <td className="text-center">
                                                            <div className="d-flex flex-column align-items-center gap-2">
                                                                <button className="btn btn-warning btn-sm" style={{ width: "110px" }} onClick={() => changeStatus(x._id)}>{x.status === "Active" ? "Inactive" : "Active"} </button>
                                                                <button className="btn btn-danger btn-sm" style={{ width: "110px" }} onClick={() => deleteGuard(x._id)}><i className="fa-solid fa-trash me-1"></i>Delete</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </div >
    )
}
export default SecurityGuard;
