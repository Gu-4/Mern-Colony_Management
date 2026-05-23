import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';


export default function AssignFlats({ selectedResident, fetchResidents, onClose }) {
    const { reset, register, handleSubmit, isSubmitting, formState: { errors } } = useForm();
    const [blocks, setBlocks] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [flats, setFlats] = useState([]);
    useEffect(() => {
        fetchBlocks();
        reset(selectedResident);
    }, [selectedResident])
    const url = "http://localhost:3000";

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
        try {
            const url = `http://localhost:3000/admin/assign-flat/${selectedResident._id}`;
            const response = await axios.put(url, data, { withCredentials: true });

            if (response.data.error) {
                toast.error(response.data.message);

            } else {
                toast.success(response.data.message);
                fetchResidents();
                onClose();
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="card helper-form-card shadow-sm border-0">
            <div className="card-body p-4">
                <h4 className="helper-title mb-4 text-center">
                    <i className="fa-solid fa-house-user me-2"></i>
                    Assign Flat
                </h4>
                <form onSubmit={handleSubmit(onSubmit)} className="helper-form-card p-3">
                    <div className=" mb-3">
                        <label className="form-label text-black" htmlFor="block_id">Block</label>
                        <select className="form-select" id="block_id" {...register("block_id", { required: true })} onChange={(e) => { setBuildings([]); fetchBuildingById(e.target.value) }}>
                            <option value="">Select Block</option>
                            {blocks?.map((x) => (
                                <option key={x._id} value={x._id}>{x.name}</option>))}
                        </select>
                        {errors.block_id && <span className="text-danger">Please select block</span>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-black" htmlFor="building_id">Building</label>
                        <select className="form-select" id="building_id" {...register("building_id", { required: true })} onChange={(e) => { setFlats([]); fetchFlatsById(e.target.value) }}>
                            <option value="">Select Building</option>
                            {buildings?.map((b) => (
                                <option key={b._id} value={b._id}>
                                    {b.building_name}
                                </option>
                            ))}
                        </select>
                        {errors.building_id && <span className="text-danger">Please select Building</span>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-black" htmlFor="flat_id">Flat</label>
                        <select className="form-select" id="flat_id" {...register("flat_id", { required: true })}>
                            <option value="">Select Flat</option>
                            {flats.map((b) => (
                                <option key={b._id} value={b._id}>
                                    Flat: {b.flat_no} | {b.floor_no} | {b.flat_type} | {b.furnish}
                                </option>
                            ))}
                        </select>
                        {errors.flat_id && <span className="text-danger">Please select flat</span>}
                    </div>


                    <div className="col-12 text-center mt-2">
                        <button
                            className="btn custom-btn text-white px-5 py-2"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Assigning..." : "Assign Flat"}
                        </button>
                    </div>
                </form>
            </div >
        </div >
    )
}