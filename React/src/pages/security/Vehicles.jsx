import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Drawer } from 'antd'

function Vehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [selectedArea, setSelectedArea] = useState("");
    const [slot, setSlot] = useState("");
    const { register, setValue, reset, handleSubmit, formState: { errors } } = useForm();

    const url = "http://localhost:3000";

    function handleAreaChange(e) {
        const area = e.target.value;
        setSelectedArea(area);

        if (area) {
            setSlot(area + "-");
        } else {
            setSlot("");
        }
    }

    useEffect(() => {
        fetchVehicles();
    }, []);
    const [open, setOpen] = useState(false);
    const showDrawer = (resident) => {
        setSelectedVehicle(resident);
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
        setSelectedVehicle(null);
    };

    async function fetchVehicles() {
        try {
            const endpoint = `${url}/guard/vehicle`;
            const response = await axios.get(endpoint, { withCredentials: true });
            setVehicles(response.data.vehicles);
        } catch (error) {
            console.log(error);
        }
    }

    async function onSubmit(data) {

        try {
            const parking_no = data.slot_no;
            const payload = {
                vehicle_id: selectedVehicle._id,
                parking_no: parking_no
            };
            const endpoint = `${url}/guard/assign-parking`;
            const response = await axios.put(
                endpoint,
                payload,
                { withCredentials: true }
            );
            toast.success("Parking Assigned Successfully");
            reset();
            fetchVehicles();
            onClose();

        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="security-page">
            <div className="security-container">
                <div className="security-card mb-3">
                    <div className="security-card-header">
                        <h3 className="security-title"> <i className="fa-solid fa-car"></i> Vehicles</h3>
                        <p className="security-subtitle">View Vehicles</p>
                    </div>
                </div>

                <div className="security-card">
                    <div className="security-card-body">
                        <h4 className="security-title mb-4">Vehicle List</h4>
                        <table className="security-table">
                            <thead>
                                <tr className="text-center">
                                    <th>Name</th>
                                    <th>Mobile</th>
                                    <th>Vehicle Number</th>
                                    <th>Model</th>
                                    <th>Parking No</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {vehicles.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="security-empty text-center py-4">
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
                                            <td>{x.parking_no === "Not Assigned" && (<button className="security-btn" style={{ padding: "6px 12px", fontSize: "13px" }} onClick={() => { setSelectedVehicle(x); showDrawer(x); }}>Assign Parking </button>)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>

                        </table>

                    </div>
                </div>
                <Drawer
                    className="security-drawer"
                    title="Assign Parking"
                    size={400}
                    onClose={onClose}
                    open={open}
                    styles={{ body: { paddingBottom: 80 } }}
                >
                    {selectedVehicle && (
                        <div className="seurity-card mb-4">
                            <h4 className="security-title m-4">Add Vehicles</h4>
                            <div className="security-card-body">
                                <form onSubmit={handleSubmit(onSubmit)} className="security-form">
                                    <div>
                                        <label className="form-label fw-semibold text-black" htmlFor="parking_area">Parking Area</label>
                                        <select
                                            className="form-select security-form-control" {...register("parking_area", { required: "Select Parking Area" })}
                                            onChange={(e) => {
                                                const area = e.target.value;
                                                setSelectedArea(area);
                                                if (area) {
                                                    setValue("slot_no", area + "-");
                                                } else {
                                                    setValue("slot_no", "");
                                                }
                                            }}
                                        >
                                            <option value="">Select Area</option>
                                            <option value="A">Basement A</option>
                                            <option value="B">Basement B</option>
                                            <option value="C">Basement C</option>
                                            <option value="G">Ground Floor</option>
                                            <option value="V">Visitor Parking</option>
                                            <option value="EV">EV Charging Zone</option>
                                        </select>
                                        {errors.parking_area && (<small className="text-danger">Select Parking Area</small>)}
                                    </div>

                                    <div>
                                        <label className="form-label fw-semibold text-black" htmlFor="slot_no">  Parking Slot</label>
                                        <input
                                            type="text"
                                            className="form-control security-form-control"
                                            placeholder="e.g. B-101"
                                            {...register("slot_no", {
                                                required: "Parking slot is required",
                                                pattern: {
                                                    value: /^[A-Z]{1,3}-\d{1,4}$/,
                                                    message: "Format should be like B-101"
                                                }
                                            })}
                                            onChange={(e) => {
                                                let value = e.target.value;

                                                const prefix = selectedArea ? selectedArea + "-" : "";

                                                if (!value.startsWith(prefix)) {
                                                    value = prefix;
                                                }

                                                setValue("slot_no", value);
                                            }}
                                        />
                                        {errors.slot_no && (<small className="text-danger">{errors.slot_no.message} </small>)}
                                    </div>


                                    <div className="col-12 text-center mt-3">
                                        <button className="security-btn">Assign Parking</button>
                                    </div>


                                </form>
                            </div>
                        </div>
                    )
                    }
                </Drawer >
            </div >
        </div >
    );
}

export default Vehicles;