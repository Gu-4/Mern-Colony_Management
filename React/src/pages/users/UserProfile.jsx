import { Button, Drawer } from 'antd';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function UserProfile() {
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const profileFields = [
        user?.name,
        user?.email,
        user?.mobile,
        user?.building_name,
        user?.block_name,
        user?.flat_no,
    ];
    const filledFields = profileFields.filter(
        (field) => field && field.toString().trim() !== ""
    ).length;

    const profileCompletion = Math.round(
        (filledFields / profileFields.length) * 100
    );
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem("userData"));
            const residentId = userData?._id;
            const response = await axios.get(`http://localhost:3000/user/profile/${residentId}`, { withCredentials: true });
            if (response.data.error) {
                toast.error(response.data.message);
            } else {
                setUser(response.data.resident);
                setVehicles(response.data.vehicles);
                reset({
                    name: response.data.resident.name,
                    email: response.data.resident.email,
                    mobile: response.data.resident.mobile,
                    block_name: response.data.resident.block_name,
                    building_name: response.data.resident.building_name,
                    flat_no: response.data.resident.flat_no
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    async function onSubmit(data) {
        try {
            const userData = JSON.parse(localStorage.getItem("userData"));
            const residentId = userData?._id;
            const response = await axios.put(`http://localhost:3000/user/profile/${residentId}`, data, { withCredentials: true });
            if (response.data.error) {
                toast.error(response.data.message);
            } else {
                toast.success("Profile updated successfully");
                setUser(response.data.resident);
                onClose();
                fetchProfile();
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <div className="page-wrapper resident-profile-page">
            <div className="page-content">
                {/* Breadcrumb */}
                <div className="p-2">
                </div>
                <div className="page-breadcrumb user-complaints-header-card d-flex align-items-center justify-content-between m-3">
                    <div>
                        <h3 className="fw-bold mb-1">Resident Profile</h3>
                        <p className="text-muted mb-0">
                            Manage your account and community information
                        </p>
                    </div>

                    <Button className="resident-btn p-4 fw-5 fs-6" onClick={showDrawer}> Edit Profile</Button>
                </div>
                <Drawer
                    className="user-drawer"
                    title="Edit Profile"
                    placement="right"
                    onClose={onClose}
                    open={open}
                    width={700}
                >
                    <div className="user-card mb-4">
                        <div className="user-card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row g-3">
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label text-black">Full Name</label>
                                        <input type="text" className="form-control" defaultValue={user?.name}
                                            {...register("name", { required: true })} />
                                        {errors.name && (<span className="text-danger">Please enter full name </span>)}
                                    </div>

                                    <div className="mb-3 col-md-6">
                                        <label className="form-label text-black">Mobile Number</label>
                                        <input type="text" className="form-control" defaultValue={user?.mobile}
                                            {...register("mobile", { required: true })} />
                                        {errors.mobile && (<span className="text-danger">Please enter mobile number</span>)}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-black">Email Address</label>
                                    <input type="email" className="form-control" defaultValue={user?.email}
                                        {...register("email", { required: true })} />
                                    {errors.email && (<span className="text-danger"> Please enter email </span>)}
                                </div>
                                <div className="row g-3">
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label text-black">Block</label>
                                        <input type="text" className="form-control" defaultValue={user?.block_name}
                                            {...register("block_name")}
                                            readOnly />

                                    </div>

                                    <div className="mb-3 col-md-6">
                                        <label className="form-label text-black"> Apartment Number</label>
                                        <input type="text" className="form-control" defaultValue={user?.flat_no}
                                            {...register("flat_no")}
                                            readOnly />

                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-black">Building</label>
                                    <input type="text" className="form-control" defaultValue={user?.building_name}
                                        {...register("building_name")}
                                        readOnly />
                                </div>
                                <button type="submit" className="resident-btn offset-4" > Save Changes </button>
                            </form>
                        </div>
                    </div>
                </Drawer>

                <div className="container-fluid">
                    <div className="row g-4">
                        {/* Left Profile Card */}
                        <div className="col-lg-4">
                            <div className="card resident-card profile-card">
                                <div className="card-body text-center">
                                    <div className="profile-image-wrapper">
                                        <img src="/assets/images/user_pic.jpg" alt="Resident" className="profile-image" />
                                    </div>
                                    <h4 className="mt-3 mb-1">{user?.name || "Resident"}</h4>
                                    <p className="resident-role text-light">Resident • Block {user?.block_name || "N/A"}</p>
                                    <p className="resident-location text-light">{user?.building_name || "Building Name"}</p>
                                    <div className="d-flex justify-content-center gap-2 mt-4">Verified Resident ✔</div>
                                    <hr className="my-4" />
                                    <div className="resident-info-list">
                                        <div className="resident-info-item">
                                            <span>Email</span><strong>{user?.email}</strong>
                                        </div>

                                        <div className="resident-info-item">
                                            <span>mobile</span><strong>{user?.mobile}</strong>
                                        </div>

                                        <div className="resident-info-item">
                                            <span>Apartment</span> <strong>{user?.flat_no}</strong>
                                        </div>

                                        <div className="resident-info-item">
                                            <span>Status</span> <strong className="pro-active rounded-3 p-1"> {user?.status}</strong>
                                        </div>
                                    </div>

                                    <div className="profile-completion mt-4">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Profile Completion</span>
                                            <span> {profileCompletion}%</span>
                                        </div>

                                        <div className="progress resident-progress">
                                            <div className={`progress-bar ${profileCompletion < 40 ? "bg-danger" : profileCompletion < 80 ? "bg-warning" : "bg-success"}`}
                                                style={{ width: `${profileCompletion}%` }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card resident-card mt-4">
                                <div className="card-body">
                                    <div className="section-title">
                                        Quick Actions
                                    </div>

                                    <div className="d-grid gap-3">
                                        <Link to="/user/flats" className="btn resident-btn">Flat</Link>
                                        <Link to="/user/complaints" className="btn resident-btn"> Raise Complaint</Link>
                                        <Link to="/user/visitors" className="btn resident-btn">Add Visitor</Link>
                                        <Link to="/user/payments" className="btn resident-btn"> Pay</Link>
                                    </div>

                                </div>
                            </div>

                        </div>

                        {/* Right Content */}
                        <div className="col-lg-8">

                            <div className="card resident-card mb-4">
                                <div className="card-body">
                                    <div className="section-title">
                                        Personal Information
                                    </div>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="name">Full Name</label>
                                            <input type="text" className="form-control resident-input" value={user?.name || ""}
                                                readOnly />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label"> Mobile Number </label>
                                            <input type="text" className="form-control resident-input" value={user?.mobile || ""}
                                                readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label"> Email Address </label>
                                            <input type="email" className="form-control resident-input" value={user?.email || ""}
                                                readOnly />
                                        </div>



                                        <div className="col-md-6">
                                            <label className="form-label"> Block </label>
                                            <input type="text" className="form-control resident-input" value={user?.block_name || ""}
                                                readOnly />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label"> Building </label>
                                            <input type="text" className="form-control resident-input" value={user?.building_name || ""}
                                                readOnly />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label"> Apartment Number </label>
                                            <input type="text" className="form-control resident-input" value={user?.flat_no || ""}
                                                readOnly />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card resident-card mb-4">
                                <div className="card-body">
                                    <div className="section-title">Registered Vehicles</div>
                                    <div className="row g-3">
                                        {vehicles?.length === 0 ? (
                                            <div className="text-center text-muted py-4">
                                                <i className="bx bx-car display-5"></i>
                                                <p className="mt-2 mb-0">No registered vehicles found</p>
                                            </div>
                                        ) : (vehicles?.map((vehicle, index) => (
                                            <div className="col-md-6" key={index} >
                                                <div className="vehicle-card">
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="vehicle-icon">
                                                            <i className="bx bxs-car"></i>
                                                        </div>
                                                        <div>
                                                            <h6 className="mb-1">{vehicle.vehicle_no}</h6>
                                                            <p className="mb-1 text-muted">{vehicle.model} </p>
                                                            <small>Parking Slot: {" "}{vehicle.parking_no} </small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )))}
                                    </div>
                                </div>
                            </div>

                            <div className="card resident-card mb-4">
                                <div className="card-body">
                                    <div className="section-title">Account Security</div>

                                    <div className="resident-info-item">
                                        <span>Email Verified</span>
                                        <strong className="text-success">Verified</strong>
                                    </div>

                                    <div className="resident-info-item">
                                        <span>Password</span>
                                        <div className="d-flex align-items-center gap-2">
                                            <strong>{showPassword ? user?.password : "••••••••"}</strong>
                                            <i className={`bx ${showPassword ? "bx-hide" : "bx-show"} fs-5`} style={{ cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)}></i>
                                        </div>
                                    </div>
                                    <Link to="/user/change-password" className="btn resident-btn mt-3">Change Password</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default UserProfile;