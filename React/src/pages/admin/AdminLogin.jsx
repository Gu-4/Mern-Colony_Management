import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";
import { toast} from 'react-toastify';

export default function AdminLogin() {
    const { reset, register, handleSubmit, setFocus, formState: { errors } } = useForm();
    useEffect(() => { setFocus("email"); }, []);

    const navigate = useNavigate();

    async function onSubmit(data) {
        try {
            const url = "http://localhost:3000/admin/login";
            const response = await axios.post(url, data, { withCredentials: true });
            if (response.data.error) {
                console.log(response.data.message)
                toast.error(response.data.message)
            } else {
                reset();
                toast.success(response.data.message)
                setTimeout(() => {
                    navigate('/admin/dashboard');
                }, 2000)
            }
        } catch (error) {
            toast.error(error.message);

        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input {...register("email", {
                        required: "This field is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter valid email address"
                        }
                    })} placeholder="Admin email" type="email" id="email" name="email" className='form-control' />
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input {...register("password", { required: true })} placeholder="Admin password" type="password" id="password" name="password" className='form-control' />
                    {errors.password && <span className="text-danger">Password is required</span>}
                </div>
                <div className="mb-3">
                    <button className="btn login-btn w-100">Login</button>
                </div>
            </form >
        </>

    )
}