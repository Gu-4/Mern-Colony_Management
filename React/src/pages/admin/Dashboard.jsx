import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Dashboard() {
    const [recentComplaints, setRecentComplaints] = useState([]);
    const [activities, setActivities] = useState([]);
    const [stats, setStats] = useState({
        flats: 0,
        users: 0,
        helpers: 0,
        complaints: 0,
        guards: 0,
        openComplaints: 0,
        processComplaints: 0,
        closedComplaints: 0,
        availableHelpers: 0,
        busyHelpers: 0,
    });
    const url = "http://localhost:3000";

    useEffect(() => {
        fetchDashboard();
    }, []);

    async function fetchDashboard() {
        try {
            const res = await axios.get(`${url}/admin/stats`, { withCredentials: true });
            if (res.data.error) {
                toast.error(res.data.message);
                console.log(res.data.message);
                return;
            } else {
                console.log(res.data);
                setStats({
                    flats: res.data.flats,
                    users: res.data.users,
                    helpers: res.data.helpers,
                    complaints: res.data.complaints,
                    guards: res.data.guards,
                    openComplaints: res.data.openComplaints,
                    closedComplaints: res.data.closedComplaints,
                    processComplaints: res.data.processComplaints,
                    availableHelpers: res.data.availableHelpers,
                    busyHelpers: res.data.busyHelpers
                });
                setRecentComplaints(res.data.recentComplaints);
                console.log(activities);
                setActivities(res.data.activities);
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="manage-helper-page page-content">

            <div className="container py-4">

                {/* HEADER */}
                <div className="top-card p-4 mb-4">
                    <h3 className="helper-title mb-1">
                        Admin Dashboard
                    </h3>
                    <p className="text-muted mb-0">
                        Overview of system activity and management modules
                    </p>
                </div>

                {/* GRID CARDS */}
                <div className="row g-4">

                    {/* FLATS */}
                    <div className="col-md-4 col-lg-4">
                        <Link to="/admin/manage_flats" className="text-decoration-none">
                            <div className="top-card p-4 h-100">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="helper-title">Flats</h6>
                                        <p className="text-muted mb-2">Manage residential units</p>
                                        <h2 className="mb-0">{stats.flats}</h2>
                                    </div>
                                    <i className="fa-solid fa-building fs-2 text-primary"></i>
                                </div>

                                <div className="d-flex justify-content-end mt-3">
                                    <i className="fa-solid fa-arrow-right fs-5 text-primary"></i>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* USERS */}
                    <div className="col-md-4 col-lg-4">
                        <Link to="/admin/manage_residents" className="text-decoration-none">
                            <div className="top-card p-4 h-100">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="helper-title">Residents</h6>
                                        <p className="text-muted mb-2">Registered residents</p>
                                        <h2 className="mb-0">{stats.users}</h2>
                                    </div>
                                    <i className="fa-solid fa-users fs-2 text-success"></i>
                                </div>

                                <div className="d-flex justify-content-end mt-3">
                                    <i className="fa-solid fa-arrow-right fs-5 text-success"></i>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* HELPERS */}
                    <div className="col-md-4 col-lg-4">
                        <Link to="/admin/manage_helpers" className="text-decoration-none">
                            <div className="top-card p-4 h-100">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="helper-title">Helpers</h6>
                                        <p className="text-muted mb-2">Maintenance staff</p>
                                        <h2 className="mb-0">{stats.helpers}</h2>
                                    </div>
                                    <i className="fa-solid fa-hands-helping fs-2 text-warning"></i>
                                </div>

                                <div className="d-flex justify-content-end mt-3">
                                    <i className="fa-solid fa-arrow-right fs-5 text-warning"></i>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* COMPLAINTS */}
                    <div className="col-md-6">
                        <Link to="/admin/manage_complaints" className="text-decoration-none">
                            <div className="top-card p-4 h-100">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="helper-title">Complaints</h6>
                                        <p className="text-muted mb-2">Pending & resolved issues</p>
                                        <h2 className="mb-0">{stats.complaints}</h2>
                                    </div>
                                    <i className="fa-solid fa-file-circle-exclamation fs-2 text-danger"></i>
                                </div>

                                <div className="d-flex justify-content-end mt-3">
                                    <i className="fa-solid fa-arrow-right fs-5 text-danger"></i>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* SECURITY GUARDS */}
                    <div className="col-md-6">
                        <Link to="/admin/security_guard" className="text-decoration-none">
                            <div className="top-card p-4 h-100">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="helper-title">Security Guards</h6>
                                        <p className="text-muted mb-2">Active security staff</p>
                                        <h2 className="mb-0">{stats.guards}</h2>
                                    </div>
                                    <i className="fa-solid fa-shield-halved fs-2 text-info"></i>
                                </div>

                                <div className="d-flex justify-content-end mt-3">
                                    <i className="fa-solid fa-arrow-right fs-5 text-info"></i>
                                </div>
                            </div>
                        </Link>
                    </div>

                </div>
                <div className="top-card p-4 my-4">
                    {/* SMALL ANALYTICS CARDS */}
                    <div className="row g-4 mt-1">
                        {/* Complaints Status */}
                        <div className="col-md-3">
                            <div className="top-card p-3 h-100">

                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <small className="text-muted fw-semibold">
                                            Complaints
                                        </small>

                                        <h5 className="helper-title mb-3">
                                            By Status
                                        </h5>
                                    </div>

                                    <div className="fs-3 text-danger">
                                        <i className="fa-solid fa-file-circle-exclamation"></i>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between mb-3">
                                    <span className="status-open">Open</span>
                                    <strong>{stats.openComplaints}</strong>
                                </div>

                                <div className="d-flex justify-content-between mb-3">
                                    <span className="status-process">In Process</span>
                                    <strong>{stats.processComplaints}</strong>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <span className="status-closed">Closed</span>
                                    <strong>{stats.closedComplaints}</strong>
                                </div>

                            </div>
                        </div>
                        {/* Helpers */}
                        <div className="col-md-3">
                            <div className="top-card p-3 h-100">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <small className="text-muted fw-semibold m-2">
                                            Helpers
                                        </small>
                                        <h5 className="helper-title mb-3">
                                            Availability
                                        </h5>
                                    </div>
                                    <div className="fs-3 text-warning">
                                        <i className="fa-solid fa-screwdriver-wrench"></i>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                    <span className="status-closed">Available</span>
                                    <strong>{stats.availableHelpers}</strong>
                                </div>
                                <div className="d-flex justify-content-between ">
                                    <span className="status-process">Busy</span>
                                    <strong>{stats.busyHelpers}</strong>
                                </div>
                            </div>
                        </div>
                        {/* RECENT COMPLAINTS */}
                        <div className="col-lg-6">
                            <div className="top-card p-3 h-100">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h5 className="helper-title mb-0">
                                        Recent Complaints
                                    </h5>
                                    <Link
                                        to="/admin/manage_complaints"
                                        className="btn btn-sm btn-outline-danger"
                                    >
                                        View All
                                    </Link>
                                </div>

                                {recentComplaints.length > 0 ? (

                                    recentComplaints.map((complaint) => (

                                        <div className="border-bottom py-2" key={complaint._id}>
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <h6 className="m-0">{complaint.type}</h6>
                                                    <p className="text-muted small m-0">Flat: {complaint.flat_no}</p>
                                                    <p className="text-muted small m-0">{complaint.description}</p>
                                                </div>
                                                <span
                                                    className={`badge ${complaint.status === "Open"
                                                        ? "bg-danger"
                                                        : complaint.status === "Closed"
                                                            ? "bg-success"
                                                            : "bg-warning text-dark"
                                                        }`}
                                                >
                                                    {complaint.status}
                                                </span>
                                            </div>
                                        </div>

                                    ))

                                ) : (

                                    <p className="text-muted mb-0">
                                        No recent complaints found
                                    </p>

                                )}

                            </div>

                        </div>
                    </div>

                    {/* QUICK ACTIONS PANEL */}
                    <div className="row g-4 mt-1">
                        <div className="top-card p-3 h-100">

                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <h5 className="helper-title mb-1">
                                        Quick Actions
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Frequently used admin actions
                                    </p>
                                </div>
                            </div>

                            <div className="row g-3">

                                {/* ADD USER */}
                                <div className="col-md-6 col-lg-3">

                                    <Link
                                        to="/admin/add_resident"
                                        className="text-decoration-none"
                                    >

                                        <div className="quick-action-card p-4 text-center h-100">

                                            <div className="quick-icon bg-primary-subtle text-primary">
                                                <i className="fa-solid fa-user-plus"></i>
                                            </div>

                                            <h6 className="mt-3 mb-1">
                                                Add User
                                            </h6>

                                            <p className="text-muted small mb-0">
                                                Register new resident
                                            </p>

                                        </div>

                                    </Link>

                                </div>

                                {/* ADD FLAT */}
                                <div className="col-md-6 col-lg-3">

                                    <Link
                                        to="/admin/manage_flats"
                                        className="text-decoration-none"
                                    >

                                        <div className="quick-action-card p-4 text-center h-100">

                                            <div className="quick-icon bg-success-subtle text-success">
                                                <i className="fa-solid fa-building"></i>
                                            </div>

                                            <h6 className="mt-3 mb-1">
                                                Add Flat
                                            </h6>

                                            <p className="text-muted small mb-0">
                                                Create residential unit
                                            </p>

                                        </div>

                                    </Link>

                                </div>

                                {/* ASSIGN HELPER */}
                                <div className="col-md-6 col-lg-3">

                                    <Link
                                        to="/admin/manage_helpers"
                                        className="text-decoration-none"
                                    >

                                        <div className="quick-action-card p-4 text-center h-100">

                                            <div className="quick-icon bg-warning-subtle text-warning">
                                                <i className="fa-solid fa-hands-helping"></i>
                                            </div>

                                            <h6 className="mt-3 mb-1">
                                                Assign Helper
                                            </h6>

                                            <p className="text-muted small mb-0">
                                                Manage maintenance staff
                                            </p>

                                        </div>

                                    </Link>

                                </div>

                                {/* CREATE NOTICE */}
                                <div className="col-md-6 col-lg-3">

                                    <Link
                                        to="/admin/notices"
                                        className="text-decoration-none"
                                    >

                                        <div className="quick-action-card p-4 text-center h-100">

                                            <div className="quick-icon bg-info-subtle text-info">
                                                <i className="fa-solid fa-bullhorn"></i>
                                            </div>

                                            <h6 className="mt-3 mb-1">
                                                Create Notice
                                            </h6>

                                            <p className="text-muted small mb-0">
                                                Publish society notice
                                            </p>

                                        </div>

                                    </Link>

                                </div>

                            </div>
                        </div>
                    </div>

                    {/* RECENT ACTIVITY FEED */}
                    <div className="top-card p-4 mt-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h5 className="helper-title mb-1"> Recent Activity</h5>

                                <p className="text-muted mb-0">Live activity across the society</p>
                            </div>
                        </div>

                        {activities?.length > 0 ? (
                            <div className="activity-feed">
                                {activities.map((activity, index) => (
                                    <div className="activity-item" key={index}>
                                        {/* TIMELINE */}
                                        <div className="timeline-wrapper">
                                            <div className={`timeline-icon bg-${activity.color}-subtle text-${activity.color}`}>
                                                <i className={`fa-solid ${activity.icon}`}></i>
                                            </div>
                                            {index !== activities.length - 1 && (
                                                <div className="timeline-line"></div>
                                            )}
                                        </div>
                                        {/* CONTENT */}
                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-start flex-wrap">
                                                <div>
                                                    <h6 className="mb-1">{activity.title}</h6>
                                                    <p className="text-muted mb-1 small">{activity.description}</p>
                                                </div>
                                                <small className="text-muted">{activity.time}</small>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-4">
                                <i className="fa-solid fa-clock-rotate-left fs-1 text-muted mb-3"></i>
                                <p className="text-muted mb-0">No recent activity found </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// <div className="page-wrapper">
//     <div className="page-content container py-4">

//         {/* STATS CARDS */}
//         <div className="row g-4 mb-4">

//             <div className="col-md-6 col-xl-3">
//                 <div className="card radius-10 bg-gradient-cosmic border-start border-0 border-4 border-info">
//                     <div className="card-body">
//                         <div className="d-flex align-items-center">
//                             <div className="me-auto">
//                                 <p className="text-white">Total Orders</p>
//                                 <h4 className="text-white">4805</h4>
//                             </div>
//                             <div className="widgets-icons-2 rounded-circle bg-gradient-blues text-white ms-auto"><i className="fa-solid fa-users"></i>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>


//             <div className="col-md-6 col-xl-3">
//                 <div className="card radius-10 bg-gradient-ibiza border-start border-0 border-4 border-info">
//                     <div className="card-body">
//                         <div className="d-flex align-items-center">
//                             <div>
//                                 <h6 className="text-white">Total Flats</h6>
//                                 <h3 className="text-white">320</h3>
//                             </div>
//                             <div className="widgets-icons-2 rounded-circle bg-gradient-blues text-white ms-auto"><i className="fa-solid fa-building"></i>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="col-md-6 col-xl-3">
//                 <div className="card radius-10 bg-gradient-ohhappiness border-start border-0 border-4 border-info">
//                     <div className="card-body">
//                         <div className="d-flex align-items-center">
//                             <div>
//                                 <h6 className="text-white">Security Guards</h6>
//                                 <h3 className="text-white">48</h3>
//                             </div>
//                             <div className="widgets-icons-2 rounded-circle bg-gradient-blues text-white ms-auto"><i className="fa-solid fa-user-shield"></i>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="col-md-6 col-xl-3">
//                 <div className="card radius-10 bg-gradient-kyoto border-start border-0 border-4 border-info">
//                     <div className="card-body">
//                         <div className="d-flex align-items-center">
//                             <div>
//                                 <h6>Helpers & Staff</h6>
//                                 <h3>76</h3>
//                             </div>
//                             <div className="widgets-icons-2 rounded-circle bg-gradient-blues ms-auto"><i className="fa-solid fa-briefcase"></i>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </div>


//         {/* SECOND ROW - COMPLAINTS / VISITORS / VEHICLES */}
//         <div className="row g-4 mb-4">

//             <div className="col-md-4 ">
//                 <div className="card shadow-sm h-100">
//                     <div className="card-body">
//                         <h6>Complaints</h6>
//                         <p className="text-muted mb-2">Pending & resolved issues</p>
//                         <h4>34 Open</h4>
//                         <button className="btn btn-sm btn-dark mt-3 w-100">
//                             Manage Complaints
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <div className="col-md-4">
//                 <div className="card shadow-sm h-100">
//                     <div className="card-body">
//                         <h6>Visitors Today</h6>
//                         <p className="text-muted mb-2">Entry log overview</p>
//                         <h4>128 Visits</h4>
//                         <button className="btn btn-sm btn-dark mt-3 w-100">
//                             View Visitors
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <div className="col-md-4">
//                 <div className="card shadow-sm h-100">
//                     <div className="card-body">
//                         <h6>Vehicles</h6>
//                         <p className="text-muted mb-2">Parking & entry status</p>
//                         <h4>210 Active</h4>
//                         <button className="btn btn-sm btn-dark mt-3 w-100">
//                             Vehicle Records
//                         </button>
//                     </div>
//                 </div>
//             </div>

//         </div>


//         {/* LATEST ACTIVITY SECTION */}
//         <div className="row g-4 mb-4">

//             {/* LEFT - 8 COL */}
//             <div className="col-lg-8">
//                 <div className="card shadow-sm h-100">
//                     <div className="card-header bg-success-subtle">
//                         <h6 className="mb-0">Recent Complaints</h6>
//                     </div>

//                     <div className="card-body bg-success-subtle radius-10">
//                         <ul className="list-group list-group-flush">

//                             <li className="list-group-item d-flex bg-success-subtle justify-content-between align-items-center">
//                                 Water leakage - A-302
//                                 <span className="badge bg-danger">Open</span>
//                             </li>

//                             <li className="list-group-item d-flex bg-success-subtle justify-content-between align-items-center">
//                                 Lift issue - B-101
//                                 <span className="badge bg-warning text-dark">Pending</span>
//                             </li>

//                             <li className="list-group-item d-flex bg-success-subtle justify-content-between align-items-center">
//                                 Parking dispute - C-210
//                                 <span className="badge bg-success">Resolved</span>
//                             </li>

//                             <li className="list-group-item d-flex bg-success-subtle justify-content-between align-items-center">
//                                 Electricity issue - A-110
//                                 <span className="badge bg-danger">Open</span>
//                             </li>

//                             <li className="list-group-item d-flex bg-success-subtle justify-content-between align-items-center">
//                                 Garbage collection delay - B-204
//                                 <span className="badge bg-warning text-dark">Pending</span>
//                             </li>

//                             <li className="list-group-item d-flex bg-success-subtle justify-content-between align-items-center">
//                                 Street light not working - Gate 2
//                                 <span className="badge bg-danger">Open</span>
//                             </li>

//                         </ul>

//                         {/* Button */}
//                         <div className="text-end mt-3">
//                             <button className="btn btn-sm btn-dark mt-3 w-100">
//                                 View All Complaints
//                             </button>
//                         </div>
//                     </div>

//                 </div>

//             </div>

//             {/* RIGHT - 4 COL */}
//             <div className="col-lg-4 d-flex flex-column gap-4">

//                 {/* TOP CARD */}
//                 <div className="card shadow-sm bg-danger-subtle">
//                     <div className="card-header bg-danger-subtle">
//                         <h6 className="mb-0">Today's Visitors</h6>
//                     </div>

//                     <div className="card-body">
//                         <p className="mb-2">Amazon - A-203</p>
//                         <p className="mb-2">Guest - B-405</p>
//                         <button className="btn btn-sm btn-dark mt-3 w-100">
//                             View All Visitors
//                         </button>
//                     </div>
//                 </div>

//                 {/* BOTTOM CARD */}
//                 <div className="card shadow-sm bg-info-subtle">
//                     <div className="card-header bg-info-subtle">
//                         <h6 className="mb-0">Guards & Parking</h6>
//                     </div>

//                     <div className="card-body">

//                         <div className="mb-3">
//                             <h6 className="mb-1">Guards on Duty</h6>
//                             <p className="mb-1">Main Gate - 2</p>
//                             <p className="mb-1">Block A - 1</p>
//                             <p className="mb-0">Block B - 1</p>
//                         </div>
//                     </div>
//                 </div>

//             </div>

//         </div>


//         {/* Recent Activities */}
//         <div className="mb-5">
//             <div className="card shadow-sm h-100 bg-warning-subtle">
//                 <div className="card-header bg-warning-subtle">
//                     <h6 className="mb-0">Recent Activities</h6>
//                 </div>
//                 <div className="card-body ">
//                     <ul className="list-group list-group-flush">

//                         <li className="list-group-item d-flex justify-content-between bg-warning-subtle">
//                             New resident added <span className="text-muted">2 min ago</span>
//                         </li>

//                         <li className="list-group-item d-flex justify-content-between bg-warning-subtle">
//                             Complaint resolved (Water issue) <span className="text-muted">10 min ago</span>
//                         </li>

//                         <li className="list-group-item d-flex justify-content-between bg-warning-subtle">
//                             Visitor entry approved <span className="text-muted">25 min ago</span>
//                         </li>

//                         <li className="list-group-item d-flex justify-content-between bg-warning-subtle">
//                             New vehicle registered <span className="text-muted">1 hr ago</span>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//             {/* <table className="table table-striped">
//                             <thead>
//                                 <tr>
//                                     <th>Complaint</th>
//                                     <th>Flat</th>
//                                     <th>Status</th>
//                                     <th>Date</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     <td>Water Leakage</td>
//                                     <td>A-102</td>
//                                     <td className="text-warning">Pending</td>
//                                     <td>03 May</td>
//                                 </tr>
//                                 <tr>
//                                     <td>Lift Not Working</td>
//                                     <td>B-205</td>
//                                     <td className="text-danger">Urgent</td>
//                                     <td>02 May</td>
//                                 </tr>
//                                 <tr>
//                                     <td>Street Light Issue</td>
//                                     <td>Gate Area</td>
//                                     <td className="text-success">Resolved</td>
//                                     <td>01 May</td>
//                                 </tr>
//                             </tbody>
//                         </table> */}
//         </div>




//     </div >
//     <div className="overlay toggle-icon" />
//     <div className="back-to-top-wrapper">
//         <button id="back_to_top" type="button" className="back-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
//             <i className="fa-solid fa-caret-up" />
//         </button>
//     </div>
// </div >