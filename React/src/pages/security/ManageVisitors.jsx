import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { Button, Drawer } from 'antd';
import dayjs from "dayjs";

function ManageVisitors() {
    const [visitors, setVisitors] = useState([]);
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const url = "http://localhost:3000";

    useEffect(() => {
        fetchVisitors();
    }, []);
    async function changeStatus(_id) {
        try {
            const endpoint = `${url}/guard/visitor/${_id}`;
            const res = await axios.put(endpoint, {}, { withCredentials: true });

            if (res.data.error) {
                toast.error(res.data.message);
                return;


            } else {
                toast.success(res.data.message);
                fetchVisitors();
            }
        } catch (error) {
            toast.error(error.message);
        }

    }
    async function fetchVisitors() {
        try {
            const endpoint = `${url}/guard/visitor`;
            const response = await axios.get(endpoint, { withCredentials: true });
            if (response.data.error) {
                toast.error(response.data.message)
            } else {
                setVisitors(response.data.visitors);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="security-page">
            <div className="security-container">

                <div className="row mb-4">
                    <div className="col">
                        <div className="security-card">
                            <div className="security-card-body">
                                <h3 className="security-title mb-0"><i className="fa-solid fa-file-circle-exclamation me-2"></i>Visitors History</h3>
                                <small className="security-subtitle">View and track all visitors records</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="security-card">
                    <div className="security-card-body">
                        <h4 className="security-title mb-4">Visitors History</h4>
                        <div className="table-responsive">
                            <table className="security-table">
                                <thead>
                                    <tr className="text-center">
                                        <th>Flat No</th>
                                        <th>Name</th>
                                        <th>Mobile</th>
                                        <th>Email</th>
                                        <th>Gender</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {visitors.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="security-empty">
                                                No Visitor Found
                                            </td>
                                        </tr>
                                    ) : (visitors.map((x) => (
                                        <tr key={x._id} className="text-center">
                                            <td>{x.flat_no}</td>
                                            <td>{x.name}</td>
                                            <td>{x.mobile}</td>
                                            <td>{x.email}</td>
                                            <td>{x.gender}</td>
                                            <td>{dayjs(x.date).format("DD-MM-YYYY")}</td>
                                            <td className={
                                                x.status === "Pending"
                                                    ? "security-badge security-badge-warning"
                                                    : x.status === "Visited"
                                                        ? "security-badge security-badge-success"
                                                        : "security-badge security-badge-info"
                                            }>
                                                {x.status}
                                            </td>
                                            <td className="text-center">
                                                {x.status === "Pending" ? (<button className="security-btn" onClick={() => changeStatus(x._id)}>Visited</button>) : null}</td>
                                        </tr>)))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
export default ManageVisitors;