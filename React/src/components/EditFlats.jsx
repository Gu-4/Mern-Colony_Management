import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';


export default function EditFlats({ selectedFlat, fetchFlatsDetails, onClose }) {
    const { reset, register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        reset(selectedFlat);
    }, [selectedFlat])

    async function onSubmit(data) {
        const url = `http://localhost:3000/admin/flats/${selectedFlat._id}`
        const response = await axios.put(url, data, { withCredentials: true });
        if (response.data.error) {
            toast.error(response.data.message)
        } else {
            reset();
            toast.success(response.data.message)
            fetchFlatsDetails();
            onClose();
        }
    }

    return (
        <div className="card helper-form-card shadow-sm border-0">
            <div className="card-body p-4">

                <h4 className="helper-title mb-4 text-center">
                    <i className="fa-solid fa-pen-to-square me-2"></i>
                    Edit Flat
                </h4>

                <form onSubmit={handleSubmit(onSubmit)} className="helper-form-card p-3">

                    <div className="row g-3">
                        <div className="col-md-4 col-12">
                            <label className="form-label text-black" htmlFor="floor_no">Floor No</label>
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
                        </div>

                        <div className="col-md-4 col-12">
                            <label className="form-label text-black" htmlFor="flat_type">Flat Type</label>
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
                        </div>

                        <div className="col-md-4 col-12">
                            <label className="form-label text-black" htmlFor="furnish">Furnish Type</label>
                            <select className="form-select" {...register("furnish", { required: true })}>
                                <option value="">Select Furnish-Type</option>
                                <option value="Unfurnished">Unfurnished</option>
                                <option value="Semi-Furnished">Semi-Furnished</option>
                                <option value="Full Furnished">Full Furnished</option>
                            </select>
                        </div>
                    </div>

                    <div className="row g-3 mt-2">

                        <div className="col-md-6 col-12">
                            <label className="form-label text-black" htmlFor="deposit">Deposit</label>
                            <input className="form-control" type="number" min="10000" {...register("deposit", { required: true })} placeholder="Enter Deposit Amount" />
                        </div>

                        <div className="col-md-6 col-12">
                            <label className="form-label text-black" htmlFor="rent">Rent</label>
                            <input className="form-control" type="number" min="10000" {...register("rent", { required: true })} placeholder="Enter Rent Amount" />
                        </div>

                    </div>

                    <div className="text-center mt-4">
                        <button className="btn custom-btn text-white px-5 py-2">
                            Update Flat
                        </button>
                    </div>

                </form>
            </div >
        </div >
    )
}