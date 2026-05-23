import { useNavigate,Outlet } from "react-router-dom";
import NavbarUser from "../components/NavbarUser";
import FooterUser from "../components/FooterUser";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";

function UserLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        const url = "http://localhost:3000/user/verify-user-token";
        axios.get(url, { withCredentials: true }).then((response) => {
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
            <NavbarUser />
            <Outlet />
            <FooterUser />
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
export default UserLayout;
//  const navigate = useNavigate();
//     useEffect(() => {
//         const checkAuth = async () => {
//             try {
//                 await axios.get("http://localhost:3000/admin/auth/check", {
//                     withCredentials: true,
//                 });
//             } catch (error) {
//                 if (error.response?.status === 401) {
//                     navigate("/login");
//                 }
//             }
//         };

//         checkAuth();
//     }, [navigate]);