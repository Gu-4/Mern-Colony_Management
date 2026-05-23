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

function ManageBuilding() {
    const [blocks, setBlocks] = useState([]);
    const [buildings, setBuildings] = useState([]);

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
        fetchBlocks();
        fetchBuildings();
    }, []);


    async function deleteBuilding(_id) {
        if (confirm("Are you sure you want to delete this Building?")) {
            try {
                const endpoint = `${url}/admin/building/${_id}`;
                await axios.delete(endpoint, { withCredentials: true }).then((response) => {
                    if (response.data.error) {
                        toast.error(res.data.message);
                        return;
                    } else {
                        toast.success(response.data.message)
                        fetchBuildings();
                    }
                });
            } catch (error) {
                toast.error(error.message);
            }
        }
    }

    async function fetchBuildings() {
        try {
            const endpoint = `${url}/admin/building`
            const res = await axios.get(endpoint, { withCredentials: true });
            setBuildings(res.data.buildings);
        } catch (error) {
            console.log(error);
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
            const endpoint = `${url}/admin/building`;
            const response = await axios.post(endpoint, data, { withCredentials: true });
            if (response.data.error) {
                toast.error(response.data.message);
                return;
            } else {
                toast.success(response.data.message)
                fetchBuildings();
                reset();
                onClose();
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="manage-helper-page pb-5">
            <div className="container pb-5" style={{ paddingTop: "170px" }}>
                <div className="card top-card shadow-sm mb-3">
                    <div className="card-body py-2">
                        <h3 className="complaint-title fw-bold mb-0"><i className="fa-solid fa-building me-2"></i> Manage Buildings</h3>
                        <small style={{ color: "#334155" }}>Add, update and manage colony buildings</small>
                    </div>
                </div>

                <div className="d-flex justify-content-end mb-3">
                    <Button
                        className="custom-btn text-white px-3 py-4"
                        icon={<PlusOutlined />}
                        onClick={showDrawer}
                    >
                        Add New Building
                    </Button>

                </div>

                <Drawer
                    className="admin-drawer"
                    title="Add a new Building"
                    width={window.innerWidth < 400 ? "100%" : 500}
                    onClose={onClose}
                    open={open}
                    zIndex={1200}
                    getContainer={document.body}
                    extra={
                        <Space>
                            <Button onClick={onClose}>Cancel</Button>
                        </Space>
                    }
                >

                    <form onSubmit={handleSubmit(onSubmit)} className="helper-form-card p-4">
                        <h4 className="text-center helper-title mb-3">Add Building</h4>

                        <div className="mb-3">
                            <label className="form-label text-black" htmlFor="block_id">Block <span className="text-danger">*</span></label>
                            <select className="form-select" {...register("block_id", { required: true })}>
                                <option value="">Select Block</option>
                                {blocks?.map((x) => (<option key={x._id} value={x._id}>{x.name}</option>))}
                            </select>
                            {errors.block_id && <span className="text-danger">Please select block</span>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-black" htmlFor="building_name">Building Name <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" {...register("building_name", { required: true })} />
                            {errors.building_name && <span className="text-danger">Please enter Building name</span>}
                        </div>

                        {/* Submit */}
                        <button className="btn custom-btn text-white w-100"> Submit </button>
                    </form>
                </Drawer>

                <div className="card table-card shadow-sm">
                    <div className="card-body p-2">
                        <h4 className="helper-title mb-2 p-2">Buildings List</h4>
                        <div className="table-responsive">
                            <table className="table table-hover custom-table align-middle">
                                <thead>
                                    <tr className="text-center">
                                        <th>Block</th>
                                        <th>Building Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {buildings.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" className="text-center py-3">
                                                <div className="py-4 text-secondary">
                                                    <i className="fa-regular fa-building fa-2x mb-2 d-block"></i> No Buildings Found
                                                </div>
                                            </td>
                                        </tr>) : (buildings.map((x) => (
                                            <tr key={x._id} className="text-center py-3">
                                                <td>{x.block_name}</td>
                                                <td>{x.building_name}</td>
                                                <td className="text-center">
                                                    <button className="btn btn-danger btn-sm" onClick={() => deleteBuilding(x._id)}><i className="fa-solid fa-trash me-1"></i> Delete </button></td>
                                            </tr>
                                        )))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ManageBuilding;