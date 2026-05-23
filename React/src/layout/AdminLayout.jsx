import NavbarAdmin from "../components/NavbarAdmin";
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import FooterAdmin from "../components/FooterAdmin";
import { ToastContainer } from "react-toastify";
import axios from "axios";

function AdminLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        const url = "http://localhost:3000/admin/verify-admin-token";
        axios.get(url, {withCredentials: true}).then((response) => {
            console.log(response.data);

            if (response.data.error) {
                navigate('/login');
            }
        }).catch(() => {
            navigate("/login"); // IMPORTANT fallback
        });
    }, [navigate]);

    return (
        <>
            <NavbarAdmin />
            <Outlet />
            <FooterAdmin />

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}
export default AdminLayout;