import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { Button, Drawer } from 'antd'

function ManageComplaints() {
    const [open, setOpen] = useState(false);
    const [complaints, setComplaints] = useState([]);
    const [helpers, setHelpers] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
        reset();
    };

    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const url = "http://localhost:3000";

    useEffect(() => {
        fetchComplaints();
        if (selectedComplaint?.type) {
            fetchHelper(selectedComplaint.type);
        }
    }, [selectedComplaint]);

    async function close(_id) {
        try {
            const endpoint = `${url}/admin/close-complaint/${_id}`;
            const response = await axios.put(endpoint, {}, { withCredentials: true });
            if (response.data.error) {
                toast.error(response.data.message);
                return;
            } else {
                toast.success(response.data.message)
                fetchComplaints();
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    async function fetchHelper(type) {
        try {
            const endpoint = `${url}/admin/helper/${type}`;
            const response = await axios.get(endpoint, { withCredentials: true });
            setHelpers(response.data.helpers)
        } catch (error) {
            console.log(error.message);

        }
    }

    async function fetchComplaints() {
        try {
            const endpoint = `${url}/admin/complaint`;
            const response = await axios.get(endpoint, { withCredentials: true });
            setComplaints(response.data.complaints)
            console.log(response.data.complaints);
        } catch (error) {
            console.log(error);
        }
    }

    async function onSubmit(data) {
        try {
            const endpoint = `${url}/admin/assign-helper`;
            const payload = {
                helperId: data.helper,
                complaintId: selectedComplaint._id
            };
            const res = await axios.put(endpoint, payload, { withCredentials: true });
            if (res.data.error) {
                toast.error(res.data.message);
                return;
            } else {
                toast.success(res.data.message)
                reset();
                fetchComplaints();
                onClose();
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="manage-complaint-page pb-5">

            <div className="container" style={{ paddingTop: "170px" }}>

                <div className="row mb-4">
                    <div className="col">
                        <div className="card shadow-sm top-card">
                            <div className="card-body">
                                <h3 className="complaint-title mb-0"><i className="fa-solid fa-file-circle-exclamation me-2"></i> Registered Complaints</h3>
                                <small className="text-muted">View and track all complaint records</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="table-card p-2">
                    <div className="card-body p-2">
                        <div className="table-responsive">
                            <table className="table table-hover custom-table align-middle">
                                <thead>
                                    <tr className="text-center">
                                        <th className="col-1">Flat No</th>
                                        <th className="col-2">Type</th>
                                        <th className="col-1">Title</th>
                                        <th className="col-4">Description</th>
                                        <th className="col-2">Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {complaints.length === 0 ? (
                                        <tr className="text-center">
                                            <td colSpan="6" className="text-center py-3">
                                                No Complaints Found
                                            </td>
                                        </tr>
                                    ) : (complaints.map((x) => (
                                        <tr key={x._id} className="text-center">
                                            <td className="fw-semibold">{x.flat_no}</td>
                                            <td><span className="type-badge">{x.type}</span></td>
                                            <td>{x.title}</td>
                                            <td className="desc-cell">{x.description}</td>
                                            <td><p className={x.status === "Open" ? "status-open" : x.status === "In Progress" ? "status-process" : "status-closed"}>{x.status}</p>
                                                {x.helper_name && (
                                                    <span className="ms-2">{x.helper_name}</span>
                                                )}</td>
                                            <td>{x.status === "Open" ? (<button className="btn custom-btn text-white px-3 py-2 mt-2" onClick={() => { setSelectedComplaint(x); showDrawer(); }}><i className="fa-solid fa-user-plus"></i> Assign Helper</button>) : x.status === "In Progress" ? (<button className="btn btn-danger px-3 py-2 mt-2" onClick={() => close(x._id)}><i className="fa-solid fa-xmark"></i> Close</button>) : null}</td>

                                        </tr>
                                    )))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Drawer
                className="admin-drawer"
                title="Assign Helpers"
                placement="right"
                onClose={onClose}
                open={open}
                width={400}
            >
                {selectedComplaint && (
                    <form onSubmit={handleSubmit(onSubmit)}><label className="form-label" htmlFor="helper">Type of Helper</label>
                        <select className="form-select" {...register("helper", { required: true })}>
                            <option value="">Select Type of Helper</option>
                            {helpers.map(x => (
                                <option key={x._id} value={x._id}>
                                    {x.name} | {x.mobile} | {x.type}
                                </option>
                            ))}
                        </select>
                        {errors.helper && <span className="text-danger">Please select type</span>}
                        <div className="text-center mt-4">
                            <button className="btn custom-btn text-white px-5 py-2">
                                Assign
                            </button>
                        </div>
                    </form>
                )}
            </Drawer>
        </div>
    );
}
export default ManageComplaints;