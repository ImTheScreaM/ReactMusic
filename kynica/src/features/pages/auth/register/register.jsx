import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import auth_store from '../../../../shared/stores/auth_store.ts';

import '../../../../assets/css/auth.register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email: '',
    });
    const navigate = useNavigate();

    const handleChange = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
      };


    const handleSubmit = async e => {
        e.preventDefault()
        await auth_store.register(formData)
        navigate('/auth/login')
    };

    return (
        <div className="register_container">
            <form action="" onSubmit={handleSubmit} className="register_form">
                <h1 className="register_title">Register</h1>
                <div className="register_form_name">
                    <label htmlFor="name">Name</label>
                    <input
                        onChange={handleChange}
                        value={formData.name}
                        type="text"
                        name="name"
                        id="name"
                    />
                </div>
                <div className="register_form_password">
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handleChange}
                        value={formData.password}
                        type="password"
                        name="password"
                        id="password"
                    />
                </div>
                <div className="register_form_email">
                    <label>Email:</label>
                    <input
                        onChange={handleChange}
                        value={formData.email}
                        type="email"
                        name="email"
                        id="email"
                    />
                </div>
                <div className="buttons_reg_log">
                    <div className="flex gap-10">
                        <div className="register_form_submit">
                            <button type="submit">Send</button>
                        </div>
                        <NavLink className={'nav_to_login'} to={'/auth/login'}>
                            <button>Login</button>
                        </NavLink>
                    </div>
                    <div className="flex justify-center">
                        <NavLink to={"/"} className={'nav_to_home'}>
                            <button>Home</button>
                        </NavLink>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default Register;
