import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/modals/authContext";

const Login = () => {
    const [formData, setFormData] = useState({
        password: "",
        email: ""
    });

    const navigate = useNavigate()
    const {login} = useAuth()

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await login(formData);

        if (res.success && res.path) {
            localStorage.setItem("session","true")
            navigate(res.path)
        }

    };

    return (
        <form action="" onSubmit={handleSubmit}>
            <div className="login-form">
                <div className="login-form-email">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="login-form-password">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        name="password"
                    />
                </div>
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default Login;
