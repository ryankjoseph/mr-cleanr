import './LogOut.css';
import { logOut } from '../../utilities/users-service';

export default function UserLogOut({ user, setUser }) {
  function handleLogOut() {
    logOut();
    setUser(null);
  }

  return (
    <div className="LogOut">
      {user ? <div>
        <button className="btn-sm shadow" onClick={handleLogOut}>LOG OUT</button>
        </div>:null}
        </div>
      
  );
}