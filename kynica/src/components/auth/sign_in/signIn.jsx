import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import auth_store from '../../shared/stores/auth_store.ts';

//import '../../../assets/css/auth.login.css';

const Login = () => {
    const [formData, setFormData] = useState({
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
        e.preventDefault();
        try {
          const res = auth_store.login(formData)
          if(res.path) {
            navigate("/")
          }
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <form className="login_container" action="" onSubmit={handleSubmit}>
            <div className="login_form">
                <h1 className="login_title">LOGIN</h1>
                <div className="login_form_email">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="login_form_password">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        name="password"
                    />
                </div>
                <div className="buttons_reg_log">
                    <button type="submit">Submit</button>
                    <NavLink to={'/auth/register'}>Register</NavLink>
                </div>
            </div>
        </form>
    );
};

export default Login;
