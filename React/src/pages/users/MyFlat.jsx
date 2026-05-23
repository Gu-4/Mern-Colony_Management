import { useEffect, useState } from "react";
import axios from "axios";

function MyFlat() {
    const [data, setData] = useState(null);

    const url = "http://localhost:3000";

    useEffect(() => {
        fetchFlat();
    }, []);

    async function fetchFlat() {
        try {
            const res = await axios.get(`${url}/user/my-flat`, {
                withCredentials: true
            });

            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="user-page pb-5">
            <div className="user-container">

                <div className="user-card mb-2">
                    <div className="user-card-header text-center">
                        <h3 className="user-title"><i className="fa-solid fa-house"></i> My Flat</h3>
                        <small className="user-subtitle">Your residence overview</small>
                    </div>
                </div>
                <div className="user-card">
                    <div className="user-card-body">

                        <div className="row g-3">

                            <div className="col-md-6">
                                <div className="user-card p-3">
                                    <h4>Resident</h4>
                                    <p><b>Name: </b>{data?.resident?.name}</p>
                                    <p><b>Email: </b>{data?.resident?.email}</p>
                                    <hr />

                                    <p><b>Flat Status: </b>{data?.resident?.flat}</p>
                                    <p><b>Account Status: </b> Active</p>
                                    <p><b>Payment Status: </b><span className="user-badge">
                                        {data?.resident?.payment_status}
                                    </span></p>


                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="user-card p-3">
                                    <h4>Flat Details</h4>
                                    {data?.resident?.flat === "Pending" ? (
                                        <div className="text-center py-4">
                                            <i className="fa-solid fa-house-circle-xmark fs-1 text-muted mb-3"></i>

                                            <h5 className="text-muted">
                                                Flat Not Assigned
                                            </h5>
                                        </div>
                                    ) : (<>
                                        <p><b>Flat No: </b> {data?.flat?.flat_no}</p>
                                        <p><b>Type: </b>{data?.flat?.flat_type}</p>
                                        <p><b>Floor: </b> {data?.flat?.floor_no}</p>
                                        <p><b>Furnish: </b> {data?.flat?.furnish}</p>
                                        <p><b>Rent: </b> ₹{data?.flat?.rent}</p>
                                        <p><b>Deposit: </b> ₹{data?.flat?.deposit}</p>
                                        <p><b>Status: </b> {data?.flat?.status}</p>
                                    </>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>

                </div >
            </div >


        </div >
    );
}

export default MyFlat;