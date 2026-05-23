import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Drawer, Modal } from 'antd'
import AssignFlats from "../../components/AssignFlats";

function ManageResidents() {

    const [blocks, setBlocks] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [flats, setFlats] = useState([]);
    const [resident, setResident] = useState([]);
    const [selectedResident, setSelectedResident] = useState(null);
    const [selectedFlatResident, setSelectedFlatResident] = useState(null);
    const [isFlatModalOpen, setIsFlatModalOpen] = useState(false);

    const { register, reset, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const url = "http://localhost:3000";

    const openFlatModal = (resident) => {
        setSelectedFlatResident(resident);
        setIsFlatModalOpen(true);
    };

    const closeFlatModal = () => {
        setIsFlatModalOpen(false);

        // ensure cleanup AFTER state update
        setTimeout(() => {
            setSelectedFlatResident(null);
        }, 150);
    };

    const [open, setOpen] = useState(false);
    const showDrawer = (resident) => {
        setSelectedResident(resident);
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
        setSelectedResident(null);
    };

    useEffect(() => {
        fetchBlocks();
        viewResidents();
    }, []);

    async function changeStatus(_id) {
        try {
            const endpoint = `${url}/admin/residents/${_id}`;
            const res = await axios.put(endpoint, {}, { withCredentials: true });

            if (res.data.error) {
                toast.error(res.data.message);
                return;


            } else {
                toast.success(res.data.message);
                viewResidents();
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    async function viewResidents() {
        try {
            const endpoint = `${url}/admin/residents`
            const res = await axios.get(endpoint, { withCredentials: true });
            // console.log(res.data);
            if (res.data.error) {
                toast.error(res.data.message);
                return;
            }

            setResident(res.data.resident);
        } catch (error) {
            console.log(error);

        }
    }

    async function fetchFlatsById(building_id) {
        try {
            const endpoint = `${url}/admin/flats/${building_id}`;
            const res = await axios.get(endpoint, { withCredentials: true });
            console.log(res.data);
            setFlats(res.data.flats || []);
        } catch (error) {
            console.error("Error fetching blocks:", error);
        }
    }

    async function fetchBuildingById(block_id) {
        try {
            const endpoint = `${url}/admin/building/${block_id}`;
            const res = await axios.get(endpoint, { withCredentials: true });
            console.log(res.data);
            setBuildings(res.data.buildings || []);
        } catch (error) {
            console.error("Error fetching blocks:", error);
        }
    }

    async function fetchBlocks() {
        try {
            const endpoint = `${url}/admin/blocks`;
            const res = await axios.get(endpoint, { withCredentials: true });
            setBlocks(res.data.blocks);
        } catch (error) {
            console.error("Error fetching blocks:", error);
        }
    };

    async function onSubmit(data) {
        const endpoint = `${url}/admin/residents`;
        const response = await axios.post(endpoint, data, { withCredentials: true });
        if (response.data.error) {
            toast.error(response.data.message);
            return;
        } else {
            toast.success(response.data.message);
            reset();
            viewResidents();
        }
    }
    return (
        <div className="manage-helper-page pb-5">
            <div className="container" style={{ paddingTop: "170px" }}>
                <div className="row mb-3">
                    <div className="col">
                        <div className="card top-card shadow-sm">
                            <div className="card-body">
                                <h3 className="complaint-title mb-0"><i className="fa-solid fa-users"></i> Manage Residents</h3>
                                <small className="text-muted">Add, update and manage Residents</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <div className="card helper-form-card shadow-sm">
                            <div className="card-body">
                                <h4 className="text-center helper-title mb-4">Add Residents</h4>
                                <form onSubmit={handleSubmit(onSubmit)} className="helper-form-card p-3">
                                    <div className="row g-3">
                                        <div className="col-4 mb-3">
                                            <label className="form-label text-black" htmlFor="block_id">Block <span className="text-danger">*</span></label>
                                            <select className="form-select" id="block_id" {...register("block_id", { required: true })} onChange={(e) => { fetchBuildingById(e.target.value) }}>
                                                <option value="">Select Block</option>
                                                {blocks?.map((x) => (<option key={x._id} value={x._id}>{x.name}</option>))}
                                            </select>
                                            {errors.block_id && <span className="text-danger">Please select block</span>}
                                        </div>
                                        <div className="col-4 mb-3">
                                            <label className="form-label text-black" htmlFor="building_id">Building <span className="text-danger">*</span></label>
                                            <select className="form-select" id="building_id" {...register("building_id", { required: true })} onChange={(e) => { fetchFlatsById(e.target.value) }}>
                                                <option value="">Select Building</option>
                                                {buildings?.map((b) => (<option key={b._id} value={b._id}> {b.building_name} </option>))}
                                            </select>
                                            {errors.building_id && <span className="text-danger">Please select Building</span>}
                                        </div>
                                        <div className="col-4 mb-3">
                                            <label className="form-label text-black" htmlFor="flat_id">Flat <span className="text-danger">*</span></label>
                                            <select className="form-select" id="flat_id" {...register("flat_id", { required: true })}>
                                                <option value="">Select Flat</option>
                                                {flats.map((b) => (<option key={b._id} value={b._id}> Flat: {b.flat_no} | {b.floor_no} | {b.flat_type} | {b.furnish} </option>))}
                                            </select>
                                            {errors.flat_id && <span className="text-danger">Please select flat</span>}
                                        </div>
                                    </div>

                                    <div className="row g-3 mt-1">
                                        <div className="col-4 mb-3">
                                            <label className="form-label text-black" htmlFor="name">Resident Name <span className="text-danger">*</span></label>
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

                                    <div className="row g-3 mt-1">
                                        <div className="col-4 mb-3">
                                            <label className="form-label text-black" htmlFor="pan">PAN No <span className="text-danger">*</span></label>
                                            <input {...register("pan", {
                                                required: "This field is required",
                                                pattern: {
                                                    value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                                                    message: "Invalid PAN number"
                                                }
                                            })}
                                                type="text" maxLength={10} id="pan" name="pan" className='form-control' onChange={(e) => { e.target.value = e.target.value.toUpperCase(); }} />
                                            {errors.pan && <span className="text-danger">{errors.pan.message}</span>}
                                        </div>
                                        <div className="col-4 mb-3">
                                            <label className="form-label text-black " htmlFor="aadhaar">Aadhaar No <span className="text-danger">*</span></label>
                                            <input {...register("aadhaar", {
                                                required: "Aadhaar number is required",
                                                pattern: {
                                                    value: /^\d{12}$/,
                                                    message: "Aadhaar must be exactly 12 digits"
                                                }
                                            })} type="text" maxLength={12} id="aadhaar" className="form-control" />
                                            {errors.aadhaar && <span className="text-danger">{errors.aadhaar.message}</span>} </div>
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
                                <h4 className="helper-title mb-3"> Residents Details</h4>
                                <div className="table-responsive">
                                    <table className="table table-hover custom-table align-middle">
                                        <thead>
                                            <tr className="text-center">
                                                <th>Flat No</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Mobile</th>
                                                <th>PAN</th>
                                                <th>Aadhaar</th>
                                                <th>Status</th>
                                                <th>Flat Status</th>
                                                <th>Payment Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {resident.length === 0 ? (
                                                <tr>
                                                    <td colSpan="10" className="text-center">
                                                        No Residents found
                                                    </td>
                                                </tr>) : (resident.map((x) => (
                                                    <tr key={x._id} className="text-center" >
                                                        <td>{x.flat_no}</td>
                                                        <td>{x.name}</td>
                                                        <td>{x.email}</td>
                                                        <td>{x.mobile}</td>
                                                        <td>{x.pan}</td>
                                                        <td>{x.aadhaar}</td>
                                                        <td>{x.status}</td>
                                                        <td>{x.flat}
                                                            {x.flat === "Allotted" && (<button className="btn btn-primary btn-sm" style={{ width: "110px" }} onClick={() => { openFlatModal(x) }}>View Flat </button>)}

                                                        </td>
                                                        <td>{x.payment_status}</td>
                                                        <td className="text-center">
                                                            <div className="d-flex flex-column align-items-center gap-2">
                                                                <button className="btn btn-warning btn-sm" style={{ width: "110px" }} onClick={() => changeStatus(x._id)}>{x.status === "Active" ? "Inactive" : "Active"} </button>
                                                                {x.flat === "Pending" && (<button className="btn btn-primary btn-sm" style={{ width: "110px" }} onClick={() => { setSelectedResident(x); showDrawer(x); }}>Assign Flats </button>)}
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
                <Drawer
                    className="admin-drawer"
                    title="Assign Flats"
                    size={400}
                    onClose={onClose}
                    open={open}
                    styles={{ body: { paddingBottom: 80 } }}
                >
                    {selectedResident && (<AssignFlats selectedResident={selectedResident} fetchResidents={viewResidents} onClose={onClose} />)}
                </Drawer>
                <Modal
                    open={isFlatModalOpen}
                    onCancel={closeFlatModal}
                    onOk={closeFlatModal}
                    destroyOnClose
                    maskClosable={true}
                    keyboard={true}
                    footer={null}
                    centered
                    className="pro-modal"
                >
                    {selectedFlatResident && (
                        <div>
                            <div className="pro-header">
                                <div className="pro-title">Flat Details</div>
                                <div className="pro-subtitle">Complete resident information</div>
                            </div>

                            <div className="pro-grid">
                                <div className="pro-card">
                                    <div className="pro-label">Resident Name</div>
                                    <div className="pro-value">{selectedFlatResident.name}</div>
                                </div>

                                <div className="pro-card">
                                    <div className="pro-label">Block</div>
                                    <div className="pro-value">{selectedFlatResident.block_name}</div>
                                </div>

                                <div className="pro-card">
                                    <div className="pro-label">Building</div>
                                    <div className="pro-value">{selectedFlatResident.building_name}</div>
                                </div>

                                <div className="pro-card">
                                    <div className="pro-label">Flat Type</div>
                                    <div className="pro-value">{selectedFlatResident.flat_type}</div>
                                </div>

                                <div className="pro-card">
                                    <div className="pro-label">Floor No</div>
                                    <div className="pro-value">{selectedFlatResident.floor_no}</div>
                                </div>

                                <div className="pro-card">
                                    <div className="pro-label">Flat No</div>
                                    <div className="pro-value">{selectedFlatResident.flat_no}</div>
                                </div>

                                <div className="pro-card">
                                    <div className="pro-label">Furnish Type</div>
                                    <div className="pro-value">{selectedFlatResident.furnish}</div>
                                </div>

                                <div className="pro-card">
                                    <div className="pro-label">Status</div>
                                    <div className={`pro-value pro-badge ${selectedFlatResident.status === "Active"
                                        ? "pro-active"
                                        : "pro-inactive"
                                        }`}>
                                        {selectedFlatResident.status}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>

            </div >
        </div>
    )


}

export default ManageResidents;