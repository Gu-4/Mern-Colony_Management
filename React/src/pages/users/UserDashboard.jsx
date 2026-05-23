import { useState, useEffect } from "react";
import axios from "axios";

function UserDashboard() {
    const [resident, setResident] = useState(null);
    const [rent, setRent] = useState(null);
    const [stats, setStats] = useState({
        vehicles: 0,
        complaints: 0,
        visitors: 0
    });

    useEffect(() => {
        fetchDashboard();
    }, []);

    const url = "http://localhost:3000";


    const OpenPaymentGateway = () => {
        let amount = Number(rent.rent) + Number(rent.deposit);
        let options = {
            key: "rzp_test_dRWiKHS7zr2Gki",
            amount: amount * 100,
            name: "Residex",
            description: "Payment Gateway",
            image: "https://cdn-icons-png.flaticon.com/512/3135/3135706.png",
            handler: function (response) {
                RazorPayResponse(response);
            },
            prefill: {
                name: resident?.name || "",
                email: resident?.email || "",
            },
            notes: {
                purpose: "Flat Rent + Deposit Payment",
                flat_id: resident?.flat_id,
            },
            theme: {
                color: "#1e3a8a",
            },
        };

        var rzp1 = new Razorpay(options);
        rzp1.open();
    };


    const RazorPayResponse = async (response) => {
        if (response.razorpay_payment_id !== "") {
            console.log(response.razorpay_payment_id);
            const res = await axios.put(`${url}/user/pay_status`, {
                payment_id: response.razorpay_payment_id
            }, { withCredentials: true });
            alert("Payment Successful");
            fetchDashboard();
            setRent(null);
        } else {
            alert("Payment Failed");
        }
    };

    async function fetchDashboard() {
        const res = await axios.get(`${url}/user/dashboard`, { withCredentials: true });
        console.log(res.data);
        setResident(res.data.resident);
        setStats({
            vehicles: res.data.vehicles || 0,
            complaints: res.data.complaints || 0,
            visitors: res.data.visitors || 0
        });
    }

    async function fetchRentDetails(flat_id) {
        const res = await axios.get(`${url}/user/rent/${flat_id}`, { withCredentials: true });

        setRent({
            rent: Number(res.data.rent),
            deposit: Number(res.data.deposit)
        });

        return {
            rent: Number(res.data.rent),
            deposit: Number(res.data.deposit)
        };
    }
    return (
        <div className="page-content pt-3" >
            <div className="container">
                <div className="top-card p-4 mb-4">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div>
                            <h3 className="helper-title mb-1"> Welcome, {resident?.name}</h3>
                            <p className="text-muted mb-0">Resident Dashboard Overview</p>
                        </div>
                        <div className="text-end">
                            <small className="text-muted">Flat Number</small>
                            <h4 className="mb-0 text-primary">
                                {resident?.flat_no || "Not Assigned"}
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="row g-4 mb-4">
                    <div className="col-md-4">
                        <div className="top-card p-4 h-100">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="helper-title">Vehicles</h6>
                                    <p className="text-muted mb-2">Registered Vehicles</p>
                                    <h2 className="mb-0">{stats.vehicles} </h2>
                                </div>
                                <i className="fa-solid fa-car fs-1 text-primary"></i>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="top-card p-4 h-100">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="helper-title">Complaints</h6>
                                    <p className="text-muted mb-2">Registered Complaints</p>
                                    <h2 className="mb-0">{stats.complaints}</h2>
                                </div>
                                <i className="fa-solid fa-file-circle-exclamation fs-1 text-danger"></i>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="top-card p-4 h-100">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="helper-title">Visitors</h6>
                                    <p className="text-muted mb-2">Total Visitors</p>
                                    <h2 className="mb-0">{stats.visitors}</h2>
                                </div>
                                <i className="fa-solid fa-users fs-1 text-success"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="top-card p-4 mb-5">
                    <h4 className="helper-title mb-3">Payment Status</h4>
                    {resident?.payment_status === null && (
                        <div className="alert alert-warning mb-0  text-center">
                            No Flat Assigned
                        </div>
                    )}

                    {resident?.payment_status === "Pending" && (
                        <div>
                            <div className="alert alert-danger text-center">
                                Your payment is pending
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={async () => {
                                    const data = await fetchRentDetails(resident.flat_id);
                                    if (data) {
                                        OpenPaymentGateway();
                                    }
                                }}> Pay Now</button>

                        </div>
                    )}

                    {resident?.payment_status === "Paid" && (
                        <div className="alert alert-success mb-0 text-center">
                            Payment Completed Successfully
                        </div>
                    )}

                    {rent && (
                        <div className="card p-3 mt-4">
                            <h5 className="mb-3">Payment Details</h5>
                            <p><strong>Rent:</strong> ₹{rent.rent}</p>
                            <p><strong>Deposit:</strong> ₹{rent.deposit}</p>
                            <p className="mb-0"><strong>Total:</strong> ₹{rent.rent + rent.deposit} </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
       
    )
}
export default UserDashboard;