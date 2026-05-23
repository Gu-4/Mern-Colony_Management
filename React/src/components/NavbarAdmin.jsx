import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function NavbarAdmin() {
    const navigate = useNavigate();
    
    const closeOffcanvas = () => {
        const offcanvasEl = document.getElementById("offcanvasNavbar");
        if (offcanvasEl) {
            const bsOffcanvas =
                bootstrap.Offcanvas.getInstance(offcanvasEl);

            bsOffcanvas?.hide();
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:3000/admin/logout", {}, { withCredentials: true, });
            navigate("/login");
        } catch (error) {
            console.log("Logout error:", error);
        }
    };

    return (
        <>
            <header className="header-bg shadow-sm">
                <div className="navbar navbar-expand-lg navbar-light px-3">
                    {/* LEFT */}
                    <div className="d-flex align-items-center w-100 justify-content-between">

                        {/* Logo */}
                        <Link to="/admin" className="navbar-brand d-flex align-items-center gap-2">
                            <img src="/assets/images/admin/logo.png" alt="logo" style={{ height: "60px" }} />
                        </Link>

                        {/* Mobile toggle */}
                        <button
                            className="btn d-lg-none ms-auto text-white"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar"
                        >
                            <i className="bx bx-menu fs-3 text-white"></i>
                        </button>
                    </div>

                    {/* RIGHT */}
                    <div className="d-flex align-items-center gap-3 ms-auto">

                        {/* Notifications */}
                        <div className="dropdown">
                            <button
                                className="btn position-relative"
                                data-bs-toggle="dropdown"
                            >
                                <i className="fa-solid fa-bell text-white" />
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    7
                                </span>
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end p-2" style={{ width: "300px" }}>
                                <li className="fw-bold px-2 mb-2">Notifications</li>
                                <li><Link className="dropdown-item">New user registered</Link></li>
                                <li><Link className="dropdown-item">Order placed</Link></li>
                                <li><Link className="dropdown-item">Server updated</Link></li>
                            </ul>
                        </div>

                        {/* Admin*/}
                        <div className="dropdown d-none d-lg-block">
                            <button
                                className="btn d-flex align-items-center gap-2 admin-btn"
                                data-bs-toggle="dropdown"
                            ><i className="fa-solid fa-user-tie" />Admin
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><Link className="dropdown-item" to="/admin/change-password">Change Password</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div className="primary-menu border-top">
                    <nav className="navbar navbar-expand-lg align-items-center">
                        <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-header border-bottom">
                                <div className="d-flex align-items-center">
                                    <div className="d-flex align-items-center gap-5">
                                        <img src="/assets/images/admin/logo.png" className="logo-icon me-5" alt="logo icon" style={{ height: "45px" }} />
                                        <div className="dropdown ms-auto">
                                            <button
                                                className="btn d-flex align-items-center gap-2 admin-btn ms-2"
                                                data-bs-toggle="dropdown"
                                            ><i className="fa-solid fa-user-tie" />Admin
                                            </button>

                                            <ul className="dropdown-menu dropdown-menu-end">
                                                <li><Link className="dropdown-item" to="/admin/change-password" onClick={closeOffcanvas}>Change Password</Link></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li>
                                                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="">

                                    </div>
                                </div>
                                {/* <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" /> */}
                            </div>
                            <div className="offcanvas-body">
                                <ul className="navbar-nav justify-content-center mx-auto gap-4 ">
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link admin-btn d-flex align-items-center" to="/admin/dashboard" onClick={closeOffcanvas}>
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle dropdown-toggle-nocaret admin-btn" to="#" data-bs-toggle="dropdown">
                                            <div className="menu-title d-flex align-items-center">Manage<i className="bx bx-chevron-down" /></div>
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to="/admin/manage_building" onClick={closeOffcanvas}><i className="fa-regular fa-building" /> Buildings</Link></li>
                                            <li><Link className="dropdown-item" to="/admin/manage_flats" onClick={closeOffcanvas}><i className="fa-solid fa-house-chimney" /> Flats</Link></li>
                                            <li><Link className="dropdown-item" to="/admin/manage_residents" onClick={closeOffcanvas}><i className="fa-solid fa-users" /> Residents</Link></li>
                                            <li><Link className="dropdown-item" to="/admin/manage_helpers" onClick={closeOffcanvas}><i className="fa-solid fa-person-circle-plus"></i> Helpers</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link admin-btn d-flex align-items-center" to="/admin/manage_complaints" onClick={closeOffcanvas}>
                                            Complaints
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link admin-btn d-flex align-items-center" to="/admin/security_guard" onClick={closeOffcanvas}>
                                            Security Guards
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    )
}
export default NavbarAdmin;