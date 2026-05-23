import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EditFlats from "../../components/EditFlats";
import { Button, Drawer } from 'antd'

function ManageFlats() {
    const [open, setOpen] = useState(false);
    const [selectedFlat, setSelectedFlat] = useState(null);
    const [blocks, setBlocks] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [flats, setFlats] = useState([]);

    const navigate = useNavigate();
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const url = "http://localhost:3000";

    useEffect(() => {
        fetchBlocks();
        fetchFlatsDetails();
    }, []);

    async function deleteFlat(_id) {
        if (confirm("Are you sure you want to delete this flat?")) {
            try {
                const endpoint = `${url}/admin/flats/${_id}`;
                const response = await axios.delete(endpoint, { withCredentials: true });
                if (response.data.error) {
                    toast.error(response.data.message);
                    return;
                } else {
                    toast.success(response.data.message)
                    fetchFlatsDetails();
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    }

    async function fetchFlatsDetails() {
        try {
            const endpoint = `${url}/admin/flats`;
            const res = await axios.get(endpoint, { withCredentials: true });
            if (res.data.error) {
                toast.error(res.data.message);
            } else {
                // console.log(res.data);
                // console.log("Flats: ", res.data.flats);
                setFlats(res.data.flats);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchBuildingById(block_id) {
        try {
            const endpoint = `${url}/admin/building/${block_id}`;
            const res = await axios.get(endpoint, { withCredentials: true });
            console.log(res.data);

            setBuildings(res.data.buildings);
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
        try {
            const endpoint = `${url}/admin/flats`;
            const res = await axios.post(endpoint, data, { withCredentials: true });
            if (res.data.error) {
                toast.error(res.data.message);
                return;
            } else {
                toast.success(res.data.message)
                reset();
                fetchFlatsDetails();
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="manage-helper-page pb-5">
            <div className="container " style={{ paddingTop: "170px" }}>
                <div className="card top-card shadow-sm mb-3">
                    <div className="card-body py-2">
                        <h3 className="fw-bold complaint-title mb-0"><i className="fa-solid fa-house me-2"></i> Manage Flats</h3>
                        <small className="text-muted">Add, update and manage colony flats</small>
                    </div>
                </div>

                <div className="card helper-form-card shadow-sm mb-4">
                    <div className="card-body p-3">
                        <h4 className="helper-title text-center mb-3 p-2"> Add New Flat</h4>
                        <form onSubmit={handleSubmit(onSubmit)} className="helper-form-card p-3">
                            <div className="row g-3">
                                <div className="col-6 mb-3">
                                    <label className="form-label text-black" htmlFor="block_id">Block <span className="text-danger">*</span></label>
                                    <select className="form-select" {...register("block_id", { required: true })} onChange={(e) => { setBuildings([]); fetchBuildingById(e.target.value) }}>
                                        <option value="">Select Block</option>
                                        {blocks.map((x) => (<option key={x._id} value={x._id}>{x.name}</option>))}
                                    </select>
                                    {errors.block_id && <span className="text-danger">Please select block</span>}
                                </div>

                                <div className="col-6 mb-3">
                                    <label className="form-label text-black" htmlFor="building_id">Building <span className="text-danger">*</span></label>
                                    <select className="form-select" {...register("building_id", { required: true })}>
                                        <option value="">Select Building</option>
                                        {buildings.map((b) => (<option key={b._id} value={b._id}> {b.building_name} </option>))}
                                    </select>
                                    {errors.building_id && <span className="text-danger">Please select Building</span>}
                                </div>


                                <div className="col-4 mb-3">
                                    <label className="form-label text-black" htmlFor="floor_no">Floor No <span className="text-danger">*</span></label>
                                    <select className="form-select" {...register("floor_no", { required: true })}>
                                        <option value="">Select Floor No</option>
                                        <option value="Ground Floor">Ground Floor</option>
                                        <option value="1st Floor">1st Floor</option>
                                        <option value="2nd Floor">2nd Floor</option>
                                        <option value="3rd Floor">3rd Floor</option>
                                        <option value="4th Floor">4th Floor</option>
                                        <option value="5th Floor">5th Floor</option>
                                        <option value="6th Floor">6th Floor</option>
                                        <option value="7th Floor">7th Floor</option>
                                        <option value="8th Floor">8th Floor</option>
                                        <option value="9th Floor">9th Floor</option>
                                        <option value="10th Floor">10th Floor</option>
                                        <option value="11th Floor">11th Floor</option>
                                        <option value="12th Floor">12th Floor</option>
                                        <option value="13th Floor">13th Floor</option>
                                        <option value="14th Floor">14th Floor</option>
                                    </select>
                                    {errors.floor_no && <span className="text-danger">Please select Floor No.</span>}
                                </div>

                                <div className="col-4 mb-3">
                                    <label className="form-label text-black" htmlFor="flat_no">Flat Number <span className="text-danger">*</span></label>
                                    <input {...register("flat_no", { required: true })} id="flat_no" className="form-control" />
                                    {errors.flat_no && <span className="text-danger">Please enter Flat No.</span>}
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-black" htmlFor="flat_type">Flat Type <span className="text-danger">*</span></label>
                                    <select className="form-select" {...register("flat_type", { required: true })}>
                                        <option value="">Select Flat Type</option>
                                        <option value="1BHK">1BHK</option>
                                        <option value="2BHK">2BHK</option>
                                        <option value="3BHK">3BHK</option>
                                        <option value="4BHK">4BHK</option>
                                        <option value="5BHK">5BHK</option>
                                        <option value="PentHouse">PentHouse</option>
                                        <option value="Duplex">Duplex</option>
                                    </select>
                                    {errors.flat_type && <span className="text-danger">Please select Flat Type</span>}
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-black" htmlFor="furnish" >Furnish <span className="text-danger">*</span></label>
                                    <select className="form-select"{...register("furnish", { required: true })}>
                                        <option value="">Select Furnish Type</option>
                                        <option>Unfurnished</option>
                                        <option>Semi-Furnished</option>
                                        <option>Full Furnished</option>
                                    </select>
                                    {errors.furnish && <span className="text-danger">Please select Furnishing</span>}

                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-black" htmlFor="deposit">Deposit <span className="text-danger">*</span></label>
                                    <input type="number" className="form-control" min="15000" {...register("deposit", { required: true })} />
                                    {errors.deposit && <span className="text-danger">Please enter Deposit amount</span>}
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label text-black" htmlFor="rent">Rent <span className="text-danger">*</span></label>
                                    <input type="number" className="form-control" min="10000" {...register("rent", { required: true })} />
                                    {errors.rent && <span className="text-danger">Please enter Rent amount</span>}
                                </div>

                                <div className="col-12 text-center">
                                    <button className="btn custom-btn text-white px-5 py-2">Add Flat</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="card table-card shadow-sm">
                    <div className="card-body p-2">
                        <h4 className="helper-title mb-2 p-2">Flats Details</h4>
                        <div className="table-responsive">
                            <table className="table table-hover custom-table align-middle shadow-md">
                                <thead>
                                    <tr className="text-center">
                                        <th>Building</th>
                                        <th>Flat No</th>
                                        <th>Type</th>
                                        <th>Floor</th>
                                        <th>Furnish</th>
                                        <th>Deposit</th>
                                        <th>Rent</th>
                                        <th>Status</th>
                                        <th className="col-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {flats.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" className="text-center py-3">
                                                No Flats Found
                                            </td>
                                        </tr>
                                    ) : (flats.map((x) => (
                                        <tr key={x._id}>
                                            <td>{x.building_name}</td>
                                            <td>{x.flat_no}</td>
                                            <td>{x.flat_type}</td>
                                            <td>{x.floor_no}</td>
                                            <td>{x.furnish}</td>
                                            <td>{x.deposit}</td>
                                            <td>{x.rent}</td>
                                            <td>{x.status}</td>
                                            <td className="text-center">
                                                <button className="btn btn-danger btn-sm me-2" onClick={() => deleteFlat(x._id)}><i className="fa-solid fa-trash me-1"></i> Delete</button>
                                                <button className="btn btn-primary btn-sm" onClick={() => { setSelectedFlat(x); showDrawer(); }}><i className="fa-solid fa-pen-to-square"></i> Edit</button>
                                            </td>
                                        </tr>
                                    )))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
            <Drawer
                className="admin-drawer"
                title="Edit Flat"
                placement="right"
                onClose={onClose}
                open={open}
                width={700}
            >
                {selectedFlat && (
                    <EditFlats
                        selectedFlat={selectedFlat}
                        fetchFlatsDetails={fetchFlatsDetails}
                        onClose={onClose}
                    />
                )}
            </Drawer>
        </div >
    )
}
export default ManageFlats;