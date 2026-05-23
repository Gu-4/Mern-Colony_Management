import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddVehicle() {
    const [vehicles, setVehicles] = useState([]);
    const [user, setUser] = useState(null);
    const [useMyDetails, setUseMyDetails] = useState(true);
    const { register, setValue, reset, handleSubmit, formState: { errors } } = useForm();

    const url = "http://localhost:3000";

    useEffect(() => {
        fetchVehicles();
        fetchUser();

    }, []);
    useEffect(() => {
        if (useMyDetails && user) {
            setValue("name", user.name || "");
            setValue("mobile", String(user.mobile || ""));
        }
    }, [useMyDetails, user]);

    async function fetchUser() {
        try {
            const endpoint = `${url}/user/profile`;
            const response = await axios.get(endpoint, {
                withCredentials: true
            });
            if (response.data.error) {
                console.log(response.data.message);
                return;
            }
            const loggedInUser = response.data.user;
            if (!loggedInUser) return;
            setUser(loggedInUser);
            setValue("name", loggedInUser.name);
            setValue("mobile", loggedInUser.mobile);

        } catch (error) {
            console.log(error);
        }
    }

    function handleCheckboxChange(e) {
        const checked = e.target.checked;
        setUseMyDetails(checked);
        if (checked && user) {
            setValue("name", user.name);
            setValue("mobile", user.mobile);
        } else {
            reset({
                name: "",
                mobile: ""
            });
        }
    }

    async function fetchVehicles() {
        try {
            const endpoint = `${url}/user/vehicle`;
            const response = await axios.get(endpoint, { withCredentials: true });
            setVehicles(response.data.vehicles);
        } catch (error) {
            console.log(error);
        }
    }

    async function onSubmit(data) {
        try {
            const endpoint = `${url}/user/vehicle`;
            const response = await axios.post(endpoint, data, { withCredentials: true });
            if (response.data.error) {
                toast.error(response.data.message);
            } else {
                toast.success(response.data.message);
                reset();
                fetchVehicles();
                if (useMyDetails && user) {
                    setValue("name", user.name || "");
                    setValue("mobile", String(user.mobile || ""));
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    async function deleteVehicle(_id) {
        if (confirm("Are you sure you want to delete this Vehicle?")) {
            try {
                const endpoint = `${url}/user/vehicle/${_id}`;
                await axios.delete(endpoint, { withCredentials: true });
                toast.success("Vehicle deleted successfully");
                fetchVehicles();
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
                        <h3 className="user-title text-center"> <i className="fa-solid fa-car"></i>  Manage Vehicles</h3>
                        <p className="user-subtitle text-center">Add and manage your Vehicles</p>
                    </div>
                </div>

                {/* FORM CARD */}
                <div className="user-card mb-4">
                    <h4 className="user-title m-4">Add Vehicles</h4>
                    <div className="user-card-body">
                        <form onSubmit={handleSubmit(onSubmit)} className="user-form">
                            <div className="row g-3">
                                <div className="col-12">

                                    <div className="form-check">

                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="useMyDetails"
                                            checked={useMyDetails}
                                            onChange={handleCheckboxChange}
                                        />

                                        <label
                                            className="form-check-label"
                                            htmlFor="useMyDetails"
                                        >
                                            Use my account details
                                        </label>

                                    </div>

                                    <small className="text-muted">
                                        Uncheck if the vehicle belongs to another family member
                                    </small>

                                </div>

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
                                    <label className="form-label fw-semibold text-black" htmlFor="vehile_no">Vehicle Number</label>
                                    <input {...register("vehicle_no", {
                                        required: true, pattern: {
                                            value: /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/,
                                            message: "Enter valid vehicle number (e.g. MH12AB1234)"
                                        }
                                    })} type="text" className="form-control" placeholder="Enter Vehicle Number (e.g. MH12AB1234)" onChange={(e) => {
                                        setValue("vehicle_no", e.target.value.toUpperCase());
                                    }} />
                                    {errors.vehicle_no && (<small className="text-danger">Enter valid Vehicle Number</small>)}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-black" htmlFor="model">Vehicle Model</label>
                                    <input {...register("model", { required: true })} type="text" className="form-control" placeholder="Enter Vehicle Model" />
                                    {errors.model && (<small className="text-danger">This field is required</small>)}
                                </div>

                                {/* <div className="col-md-6">
                                    <label className="form-label fw-semibold text-black" htmlFor="parking_no">Parking Number</label>
                                    <input {...register("parking_no", { required: true })} type="text" className="form-control" placeholder="Enter Parking Number" />
                                    {errors.parking_no && (<small className="text-danger">This field is required</small>)}
                                </div> */}


                                <div className="col-12 text-center mt-3">
                                    <button className="user-btn">Add Vehicle</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>

                {/* TABLE CARD */}
                <div className="user-card">
                    <div className="user-card-body">
                        <h4 className="user-title mb-4">Vehicle List</h4>
                        <table className="user-table">
                            <thead>
                                <tr className="text-center">
                                    <th>Name</th>
                                    <th>Mobile</th>
                                    <th>Vehicle Number</th>
                                    <th>Model</th>
                                    <th>Parking No</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {vehicles.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="user-empty text-center py-4">
                                            No vehicle found
                                        </td>
                                    </tr>
                                ) : (
                                    vehicles.map(x => (
                                        <tr key={x._id} className="text-center">
                                            <td>{x.name}</td>
                                            <td>{x.mobile}</td>
                                            <td>{x.vehicle_no}</td>
                                            <td>{x.model}</td>
                                            <td>{x.parking_no}</td>
                                            <td>
                                                <button className="btn btn-danger btn-sm me-2" onClick={() => deleteVehicle(x._id)}><i className="fa-solid fa-trash me-1"></i> Delete</button>
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
    );
}

export default AddVehicle;