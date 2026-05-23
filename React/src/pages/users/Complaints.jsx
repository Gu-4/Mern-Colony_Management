import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
const UrlInput = props => {
    return (
        <Space.Compact>
            <Space.Addon>http://</Space.Addon>
            <Input style={{ width: '100%' }} {...props} />
            <Space.Addon>.com</Space.Addon>
        </Space.Compact>
    );
};
function Complaints() {
    const [complaints, setComplaints] = useState([]);
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const url = "http://localhost:3000";

    useEffect(() => {
        fetchComplaints();
    }, [])
    async function fetchComplaints() {
        try {
            const endpoint = `${url}/user/complaint`;
            const response = await axios.get(endpoint, { withCredentials: true });
            setComplaints(response.data.complaint)
        } catch (error) {
            console.log(error);
        }
    }
    async function onSubmit(data) {
        try {
            const endpoint = `${url}/user/complaint`;
            const response = await axios.post(endpoint, data, { withCredentials: true });
            if (response.data.error) {
                toast.error(response.data.message);
            } else {
                toast.success(response.data.message);
                reset();
                onClose();
                fetchComplaints();
            }

        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <div className="user-page pb-5">
            <div className="user-container">
                <div className="user-complaints-header-card">
                    <div className="user-complaints-left">
                        <h3 className="user-title"><i className="fa-solid fa-circle-exclamation"></i> Complaints</h3>
                        <small className="user-subtitle">Track and manage all your complaints</small>
                    </div>
                    <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                        Add New Complaint
                    </Button>
                </div>
                <Drawer
                    className="user-drawer"
                    title="Register Complaints"
                    size={500}
                    onClose={onClose}
                    open={open}
                    zIndex={1200}
                    getContainer={document.body}
                    styles={{
                        body: {
                            paddingBottom: 80,
                        },
                    }}
                    extra={
                        <Space>
                            <Button onClick={onClose}>Cancel</Button>
                        </Space>
                    }
                >
                    <div className="user-card mb-4">
                        <div className="user-card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <label className="form-label text-black" htmlFor="type">Type of Complaint</label>
                                    <select className="form-select" {...register("type", { required: true })}>
                                        <option value="">Select Type of Complaint</option>
                                        <option value="Electrical Issue">Electrical Issuey</option>
                                        <option value="Plumbing-Water Issue">Plumbing-Water Issue</option>
                                        <option value="Cleaning & Hygiene">Cleaning & Hygiene</option>
                                        <option value="Maintenance">Maintenance</option>
                                        <option value="Security">Security</option>
                                        <option value="Parking Issue">Parking Issue</option>
                                        <option value="Noise Complaint">Noise Complaint</option>
                                        <option value="Appliances">Appliances</option>
                                        <option value="Others">Others</option>
                                    </select>
                                    {errors.type && <span className="text-danger">Please select type</span>}
                                </div>

                                {/* Building Name */}
                                <div className="mb-3">
                                    <label className="form-label text-black" htmlFor="title">Title</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        {...register("title", { required: true })}
                                    />
                                    {errors.title && <span className="text-danger">Please fill this field</span>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label text-black" htmlFor="description">Description</label>

                                    <textarea
                                        type="text"
                                        className="form-control"
                                        {...register("description", { required: true })}
                                    />
                                    {errors.description && <span className="text-danger">Please fill this field</span>}
                                </div>



                                {/* Submit */}
                                <button type="submit" className="user-btn offset-4" >
                                    Submit Complaint
                                </button>
                            </form>
                        </div>
                    </div>
                </Drawer>

                <div className="row justify-content-center mb-5">
                    <div className="col">
                        <h4 className="user-title m-3">Complaints History</h4>
                        <div className="user-complaints-list">
                            {complaints.length === 0 ? (
                                <div className="user-complaints-empty">
                                    No Complaints found
                                </div>
                            ) : (
                                complaints.map((x) => (
                                    <div key={x._id} className="user-complaints-card">
                                        <div className="user-complaints-top">
                                            <span className="user-complaints-type">{x.type}</span>
                                            <span className={`user-complaints-status ${x.status === "Open" ? "user-status-open" : x.status === "In Process" ? "user-status-process" : "user-status-closed"}`} >{x.status} </span>
                                        </div>
                                        <h5 className="user-complaints-title">{x.title}</h5>
                                        <p className="user-complaints-desc"> {x.description}</p>
                                    </div>
                                ))
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default Complaints;