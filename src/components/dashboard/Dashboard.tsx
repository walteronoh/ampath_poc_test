import Session from '../../utils/session/session';
import Search from '../search/Search';
const session = new Session();

function Dashboard() {
    return (
        <>
            <h1>Welcome {session.getUserSession().display}</h1>
            <div>
                <div>
                    <Search />
                </div>
            </div>
        </>
    );
}

export default Dashboard;