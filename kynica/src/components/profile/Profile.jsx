import { useNavigate } from 'react-router-dom';
import { useAuth } from '../shared/modals/authContext';

const Profile = () => {
    const { logout } = useAuth();
    
    const navigate = useNavigate();

    const deleted_session = async (e) => {
        e.preventDefault();

        const res = await logout();

        if (res.path) {
            navigate(res.path);
        }
    };
    return (
        <div>
            <button onClick={deleted_session}>logout</button>
        </div>
    );
};

export default Profile;
