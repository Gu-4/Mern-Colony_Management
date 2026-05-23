import { useEffect, useState } from "react";
import axios from "axios";

function Payment() {
    const [payments, setPayments] = useState([]);
    const [resident, setResident] = useState(null);
    const [rent, setRent] = useState(null);

    useEffect(() => {
        fetchPayments();
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
            image:
                "https://cdn-icons-png.flaticon.com/512/2942/2942925.png",
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

    async function fetchPayments() {
        try {
            const res = await axios.get(`${url}/user/payments`, {
                withCredentials: true
            });
            setPayments(res.data.payments);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="user-page pb-5">
            <div className="user-container">
                <div className="payment-header-card">
                    <h3 className="user-title text-center"><i className="fa-solid fa-receipt"></i> Transaction History</h3>
                    <p className="user-subtitle text-center">All your rent and deposit payments</p>
                </div>

                {payments?.length === 0 ? (
                    <div className="alert alert-info">
                        No payment history found
                    </div>
                ) : (
                    <div className="payment-list">
                        {payments.map((p) => (
                            <div key={p._id} className="payment-card">

                                <div className="payment-top">
                                    <div>
                                        <h5>₹{p.amount}</h5>
                                        <span className={`badge ${p.payment_status === "Paid" ? "bg-success" : "bg-warning"}`}>
                                            {p.payment_status === "Paid" ? "Paid" : "Pending"}
                                        </span>
                                    </div>

                                    <div className="payment-date">
                                        {p.payment_status === "Paid" && p.createdAt ? (
                                            <div className="payment-date">
                                                {new Date(p.createdAt).toLocaleDateString()}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="payment-details">
                                    <p><b>Rent:</b> ₹{p.rent}</p>
                                    <p><b>Deposit:</b> ₹{p.deposit}</p>
                                    <p><b>Txn ID:</b> {p.payment_id}</p>
                                </div>

                            </div>
                        ))}
                    </div>
                )}

                <div className="payment-header-card mt-2">
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
    );
}

export default Payment;