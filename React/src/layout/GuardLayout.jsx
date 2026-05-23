import NavbarGuard from "../components/NavbarGuard";
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import FooterGuard from "../components/FooterGuard";
import { ToastContainer } from "react-toastify";
import axios from "axios";

function GuardLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        const url = "http://localhost:3000/guard/verify-guard-token";
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
            <NavbarGuard />
            <Outlet />
            <FooterGuard />

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
export default GuardLayout;