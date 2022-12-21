import './Dashboard.css';
import Session from '../../utils/session/session';
import Search from '../search/Search';
import { useNavigate } from 'react-router-dom';
const session = new Session();


function Dashboard() {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Clear UserSession
        session.clearUserSession();
        // Redirect user to login page
        navigate("/");
    }

    return (
        <div>
            <div className='dashboard-bar'>
                <h1>Hello {session.getUserSession().display}</h1>
                <p><button onClick={handleLogout} className='logout-btn'>Logout</button></p>
            </div>
            <div>
                <div className='dashboard-search'>
                    <Search />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;